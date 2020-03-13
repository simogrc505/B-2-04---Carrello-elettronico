// add routes
module.exports = [
  ['/v1/cart', require('./cart')],
  ['/v1/cart/merge', require('./cart-merge')],
]
