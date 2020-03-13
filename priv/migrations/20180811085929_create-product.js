
exports.up = function (knex, Promise) {
  return knex.schema.createTable('products', function (t) {
    t.charset('utf8')
    t.collate('utf8_general_ci')
    t.increments('id').unsigned().primary()
    t.string('name')
    t.integer('price')
    t.integer('quantity')
  })
}

exports.down = function (knex, Promise) {
}
