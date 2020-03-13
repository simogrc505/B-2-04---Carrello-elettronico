const { pick, map } = require('ramda')

const fields = ['id', 'id_user', 'id_product', 'quantity']

module.exports = {
  one: pick(fields),
  many: map(pick(fields)),
}
