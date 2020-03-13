const { Model } = require('objection')

const config = require('config')
const knex = require('knex')(config.db)

Model.knex(knex)

class Cart extends Model {
  static get tableName () {
    return 'carts'
  }

  static get idColumn () {
    return 'id'
  }
}

module.exports = Cart
