const { tap, omit, compose } = require('ramda')
const { if_exists, if_already_exists } = require('../../utilities/errors_code')
const Cart = require('../cart')

module.exports = {
  get: (id) => {
    return Cart.query()
      .where({ id })
      .first()
  },
  get_by_user: (id) => {
    return Cart.query()
      .where({ id_user: id })
  },
  create: (body) => {
    return Cart.query().insert(body)
      .then((cart) => Cart.query().where({ id: cart.id }).first())
  },
  create_many: (body) => {
    return Cart.query().insertWithRelated(body)
      .then((cart) => Cart.query().where({ id: cart.id }).first())
  },
}
