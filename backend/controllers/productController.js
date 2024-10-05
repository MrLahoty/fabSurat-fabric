const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    // Parse sizes if present
    if (req.body.sizes) {
        try {
            req.body.sizes = JSON.parse(req.body.sizes); // Ensure sizes is an object
        } catch (error) {
            return next(new ErrorHander("Invalid sizes format", 400));
        }
    } else {
        req.body.sizes = {}; // Default to an empty object if sizes are not provided
    }

            // Ensure prices are present and formatted
        if (!req.body.price || !req.body.mrp) {
            return next(new ErrorHander("Please enter both Sale Price and MRP", 400));
        }
        
        req.body.price = parseFloat(req.body.price).toFixed(2);
        req.body.mrp = parseFloat(req.body.mrp).toFixed(2);

    // Calculate discount percentage
    const discount = ((req.body.mrp - req.body.price) / req.body.mrp) * 100;
    req.body.discountPercentage = `-${discount.toFixed(2)}%`;

  // Handle fabric-specific fields and sub-categories
    if (req.body.category === "Fabric") {
    const validSubCategories = ["Position Prints", "Embroidered", "Prints", "Plain"];
    
    // Check if sub-category is valid for Fabric
    if (!validSubCategories.includes(req.body.subCategory)) {
        return next(new ErrorHander("Invalid sub-category for Fabric", 400));
    }
    
    // Sub-subcategories based on specific Fabric sub-categories
    const subSubCategories = {
        "Embroidered": [
            "Chinon Embroidery", 
            "Faux Georgette Embroidery", 
            "Viscose Georgette Embroidery", 
            "Silk Embroidery", 
            "Rayon Embroidery", 
            "Velvet Embroidery", 
            "Organza Embroidery", 
            "Cotton Embroidery", 
            "Shimmer Embroidery"
        ],
        "Position Prints": [
            "Muslin Position Prints", 
            "Chinon Position Prints", 
            "Georgette Position Prints", 
            "Opada Position Prints", 
            "Dola Silk Jacquard Position Prints", 
            "Organza Position Prints", 
            "Tissue Zari Position Prints", 
            "Crepe Position Prints"
        ],
        "Prints": [
            "Hakoba Prints", 
            "Satin Prints", 
            "Georgette Prints", 
            "Muslin Prints", 
            "Rayon Prints", 
            "Velvet Prints", 
            "Sugarcane Prints", 
            "Chinon Prints"
        ],
        "Plain": [
            "Hakoba", 
            "Dyeable", 
            "Pure/Viscose", 
            "Semi Pure"
        ]
    };
    
    // Validate sub-subcategory
    if (subSubCategories[req.body.subCategory] && !subSubCategories[req.body.subCategory].includes(req.body.subSubCategory)) {
        return next(new ErrorHander(`Invalid sub-subcategory for ${req.body.subCategory}`, 400));
    }
    
    // Set optional fabric fields to null if not provided
    req.body.fabricType = req.body.fabricType || null;
    req.body.work = req.body.work || null;
    req.body.width = req.body.width || null;
    req.body.careInstructions = req.body.careInstructions || null;
    req.body.disclaimer = req.body.disclaimer || null;
} else if (req.body.category === "Readymade") {
    const validSubCategories = ["Kurti Set", "Co-Ord Set"];
    if (!validSubCategories.includes(req.body.subCategory)) {
        return next(new ErrorHander("Invalid sub-category for Readymade", 400));
    }
    // Handle readymade-specific fields if needed
}

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

//Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await apiFeature.query.clone();

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});

//Get All Products (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
        success: true,
        products,
    });
});

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    // Images Start Here
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
    }

   // Ensure prices are present and formatted
     if (req.body.price || req.body.mrp) {
     if (!req.body.price || !req.body.mrp) {
        return next(new ErrorHander("Please enter both Sale Price and MRP", 400));
    }
    req.body.price = parseFloat(req.body.price).toFixed(2);
    req.body.mrp = parseFloat(req.body.mrp).toFixed(2);
    // Calculate discount percentage
    const discount = ((req.body.mrp - req.body.price) / req.body.mrp) * 100;
    req.body.discountPercentage = `-${discount.toFixed(2)}%`;
   }

    // Parse sizes if present
    if (req.body.sizes) {
        try {
            req.body.sizes = JSON.parse(req.body.sizes); // Ensure sizes is an object
        } catch (error) {
            return next(new ErrorHander("Invalid sizes format", 400));
        }
    }

   // Handle fabric-specific fields and sub-categories
    if (req.body.category === "Fabric") {
    const validSubCategories = ["Position Prints", "Embroidered", "Prints", "Plain"];
    
    // Check if sub-category is valid for Fabric
    if (!validSubCategories.includes(req.body.subCategory)) {
        return next(new ErrorHander("Invalid sub-category for Fabric", 400));
    }
    
    // Sub-subcategories based on specific Fabric sub-categories
    const subSubCategories = {
        "Embroidered": [
            "Chinon Embroidery", 
            "Faux Georgette Embroidery", 
            "Viscose Georgette Embroidery", 
            "Silk Embroidery", 
            "Rayon Embroidery", 
            "Velvet Embroidery", 
            "Organza Embroidery", 
            "Cotton Embroidery", 
            "Shimmer Embroidery"
        ],
        "Position Prints": [
            "Muslin Position Prints", 
            "Chinon Position Prints", 
            "Georgette Position Prints", 
            "Opada Position Prints", 
            "Dola Silk Jacquard Position Prints", 
            "Organza Position Prints", 
            "Tissue Zari Position Prints", 
            "Crepe Position Prints"
        ],
        "Prints": [
            "Hakoba Prints", 
            "Satin Prints", 
            "Georgette Prints", 
            "Muslin Prints", 
            "Rayon Prints", 
            "Velvet Prints", 
            "Sugarcane Prints", 
            "Chinon Prints"
        ],
        "Plain": [
            "Hakoba", 
            "Dyeable", 
            "Pure/Viscose", 
            "Semi Pure"
        ]
    };
    
    // Validate sub-subcategory
    if (subSubCategories[req.body.subCategory] && !subSubCategories[req.body.subCategory].includes(req.body.subSubCategory)) {
        return next(new ErrorHander(`Invalid sub-subcategory for ${req.body.subCategory}`, 400));
    }
        req.body.fabricType = req.body.fabricType || product.fabricType;
        req.body.work = req.body.work || product.work;
        req.body.width = req.body.width || product.width;
        req.body.careInstructions = req.body.careInstructions || product.careInstructions;
        req.body.disclaimer = req.body.disclaimer || product.disclaimer;
    } else if (req.body.category === "Readymade") {
        const validSubCategories = ["Kurti Set", "Co-Ord Set"];
        if (!validSubCategories.includes(req.body.subCategory)) {
            return next(new ErrorHander("Invalid sub-category for Readymade", 400));
        }
        // Handle readymade-specific fields if needed
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
    });
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
    });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString());

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                (rev.rating = rating), (rev.comment = comment);
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});
