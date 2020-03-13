const { assoc, omit, compose } = require('ramda')
const { if_exists, if_already_exists } = require('../../utilities/errors_code')
const Product = require('../Product')

module.exports = {
  get: (id) => {
    const query = Product.query()

    query
      .where({ id })
      .first()

    return query.then(if_exists)
  },
  create: (body) => {
    return Product.query().insert(body)
      .then((Product) => Product.query().where({ id: Product.id }).first())
  },
}
