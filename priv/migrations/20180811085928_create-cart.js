
exports.up = function (knex, Promise) {
  return knex.schema.createTable('carts', function (t) {
    t.charset('utf8')
    t.collate('utf8_general_ci')
    t.increments('id').unsigned().primary()
    t.string('id_user')
    t.string('id_product')
    t.integer('quantity')
  })
}

exports.down = function (knex, Promise) {
}
