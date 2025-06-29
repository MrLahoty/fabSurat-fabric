const mongoose = require("mongoose");

const productScheme = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description"],
    },
    price: { // This will represent the sale price
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    mrp: { // This will represent the MRP
        type: Number,
        required: [true, "Please Enter product MRP"],
        maxLength: [8, "MRP cannot exceed 8 characters"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Please Enter Product Category"],
        enum: ["Fabric", "Readymade"], // Ensure only Fabric or Readymade can be selected
    },
    subCategory: {
        type: String,
        required: [true, "Please Enter Product Sub-Category"],
        enum: ["Position Prints", "Embroidered", "Prints", "Plain", "Hakoba Fabric", "Cotton Fabric", "Kurti Set", "Co-Ord Set"], // Enum for valid sub-categories
    },
    subSubCategory: {
        type: String,
        required: [true, "Please Enter Product Sub-Sub-Category"],
        enum: ["Chinon Embroidery", "Faux Georgette Embroidery", "Viscose Georgette Embroidery", "Silk Embroidery", "Rayon Embroidery", "Velvet Embroidery", "Organza Embroidery", "Cotton Embroidery", "Shimmer Embroidery", "Net Embroidery","Satin Embroidery","Space Silk Embroidery","Crepe Embroidery", "Muslin Position Prints", "Chinon Position Prints", "Georgette Position Prints", "Opada Position Prints", "Jacquard Position Prints", "Organza Position Prints", "Tissue Zari Position Prints", "Crepe Position Prints", "Silk Position Prints","Chanderi Position Prints", "Hakoba Prints", "Satin Prints" ,"Georgette Prints", "Muslin Prints", "Rayon Prints", "Velvet Prints", "Sugarcane Prints", "Chinon Prints","Silk Prints","Cotton Prints", "Hakoba", "Velvet", "Dyeable", "Pure/Viscose", "Others", "Dyeable Hakoba Fabric", "Printed Hakoba Fabric", "Unstitched Combo", "Dyeable Cotton Embroidery", "Allover Cotton Embroidery" ], // Enum for valid sub-categories
    },
    Stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        max: [9999.99, "Stock cannot exceed 4 digits"], // Adjust max for decimals
        default: 1,
    },    
    fabricType: {
        type: String,
        default: null,
    },
    work: {
        type: String,
        default: null,
    },
    width: {
        type: String,
        default: null,
    },
    careInstructions: {
        type: String,
        default: null,
    },
    disclaimer: {
        type: String,
        default: null,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    sizes: {
        type: Map,
        of: Boolean,
        default: {}, // An object where keys are sizes (e.g., 'M', 'L') and values are booleans indicating availability
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Virtual property to format the sale price
productScheme.virtual("formattedPrice").get(function () {
    return parseFloat(this.price).toFixed(2); // Format the price to 2 decimal places
});

// Virtual property to format the MRP
productScheme.virtual("formattedMRP").get(function () {
    return parseFloat(this.mrp).toFixed(2); // Format the MRP to 2 decimal places
});

// Virtual property to calculate and display discount percentage
productScheme.virtual("discountPercentage").get(function () {
    if (this.mrp > this.price) {
        const discount = ((this.mrp - this.price) / this.mrp) * 100;
        return `-${discount.toFixed(2)}%`; // Display discount as -XX.XX%
    }
    return null; // If no discount, return null
});

module.exports = mongoose.model("Product", productScheme);