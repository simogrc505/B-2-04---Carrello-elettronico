const Joi = require('@hapi/joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
})

exports.validate_create_cart_input = validator.body(Joi.object({
  id_product: Joi.string(),
  quantity: Joi.number(),
}))
