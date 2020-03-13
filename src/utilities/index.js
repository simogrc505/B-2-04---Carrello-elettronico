const { curry, assoc, reduce, keys, ifElse, isNil, identity, bind } = require('ramda')

const if_not_null_convert = curry(ifElse(isNil, identity))

const renameKeys = curry((keysMap, obj) => reduce((acc, key) => assoc(keysMap[key] || key, obj[key], acc), {}, keys(obj)))

const check_quantity = (quantity_product, quantity_body) => {
  if (quantity_body > quantity_product)
  // eslint-disable-next-line prefer-promise-reject-errors,brace-style
  { return Promise.reject({ status: 409, message: 'Conflict' }) } else { return quantity_body }
}

const check_users_conditions = (user, params_user) => {
  // eslint-disable-next-line prefer-promise-reject-errors,brace-style
  if (user.role !== 'USER') { return Promise.reject({ status: 403, message: 'Forbidden' }) }
  // eslint-disable-next-line prefer-promise-reject-errors
  else if (params_user.role !== 'VISITOR') { return Promise.reject({ status: 405, message: 'Method Not Allowed' }) }
  else { return Promise.resolve(user) }
}

/*const check_products = (cart_a, cart_b) => {
  const result = Object.values([...cart_a, ...cart_b].reduce((acc, { id_product, quantity, id_user }) => {
    acc[id_product] = { id_user, id_product, quantity: (acc[id_product] ? acc[id_product].quantity : 0) + quantity  }
    return acc
  }, {}))
  return result
}*/

const check_products = (cart_a, cart_b) => {
  let result = cart_a.slice()
  for(itemB of cart_b) {
    let itemA = cart_a.find(function(i){
      return itemB.id_product === i.id_product
    })
    if(itemA){
      itemA.quantity += itemB.quantity
    } else {
      let newItem = { ...itemB }
      newItem.id_user = cart_a.id_user
      result.push(newItem)
    }
  }
  return result
}

const stringify = bind(JSON.stringify, JSON)
module.exports = {
  if_not_null_convert,
  renameKeys,
  stringify,
  check_quantity,
  check_users_conditions,
  check_products,
}
