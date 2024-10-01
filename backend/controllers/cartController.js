const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Add a product to the cart
exports.addItemToCart = catchAsyncErrors(async (req, res, next) => {
  const { productId, quantity, size } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHander('Product not found', 404));
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    let itemIndex = cart.items.findIndex((item) => item.product == productId);

    if (itemIndex !== -1) {
      let productItem = cart.items[itemIndex];
      productItem.quantity += quantity;
      if (product.category === "Readymade") {
        productItem.size = size;
      }
      cart.items[itemIndex] = productItem;
    } else {
      cart.items.push({ product: productId, quantity, size: product.category === "Readymade" ? size : null });
    }
    cart = await cart.save();
    return res.status(200).json({ success: true, cart });
  } else {
    const newCart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity, size: product.category === "Readymade" ? size : null }],
    });

    return res.status(200).json({ success: true, cart: newCart });
  }
});

// Get the user's cart
exports.getCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate({
    path: 'items.product',
    select: 'name price image',
  });

  if (!cart) {
    return next(new ErrorHander('Cart not found', 404));
  }

   // Format prices to always show two decimal places
   cart.items.forEach(item => {
    item.product.price = parseFloat(item.product.price).toFixed(2);
  });

  res.status(200).json({ success: true, cart });
});

// Update the quantity of an item in the cart
exports.updateCartQuantity = catchAsyncErrors(async (req, res, next) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ErrorHander('Cart not found', 404));
  }

  const itemIndex = cart.items.findIndex((item) => item.product == productId);

  if (itemIndex !== -1) {
    let productItem = cart.items[itemIndex];
    productItem.quantity = quantity;
    cart.items[itemIndex] = productItem;
    await cart.save();
    return res.status(200).json({ success: true, cart });
  } else {
    return next(new ErrorHander('Item not found in cart', 404));
  }
});

// Remove an item from the cart
exports.removeItemFromCart = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ErrorHander('Cart not found', 404));
  }

  const itemIndex = cart.items.findIndex((item) => item.product == productId);

  if (itemIndex !== -1) {
    cart.items.splice(itemIndex, 1);
    await cart.save();
    return res.status(200).json({ success: true, cart });
  } else {
    return next(new ErrorHander('Item not found in cart', 404));
  }
});