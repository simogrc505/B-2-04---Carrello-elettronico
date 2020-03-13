const { compose, bind, tap } = require('ramda')

const repo = require('../models/repo/carts')
const input = require('../input-filters/cart')
const error = require('../views/error')
const view = require('../views/cart')

const auth = require('@wdalmut/mini-auth')
const token = require('@wdalmut/token-auth')
const me = require('../microservices/auth')

const { check_users_conditions, check_products } = require('../utilities/index')

const create = (req, res) => {
  req.user = {
    id: 1,
    role: 'USER',
  }
  const user = {
    id: 2,
    role: 'VISITOR',
  }
  return check_users_conditions(req.user, user)
    .then(() => repo.get_by_user(req.user.id) || [])
    .then(cart_a => {
      return repo
        .get_by_user(req.params.id_user)
        .then(cart_b => {
          return {
            cart_a,
            cart_b,
          }
        })
})
    .then(({ cart_a, cart_b }) => check_products(cart_a, cart_b))
    .then((result) => repo.create_many(result))
    .then(compose(bind(res.status(201).json, res), view.many))
    .catch(error.generic(res))
}

let carts = require('express').Router()
carts.post('/:id_user',
  //auth(token(me)),
  input.validate_create_cart_input,
  create
)

module.exports = carts
