const { compose, bind, assoc } = require('ramda')

const repo = require('../models/repo/carts')
const repo_product = require('../models/repo/products')
const input = require('../input-filters/cart')
const error = require('../views/error')
const view = require('../views/cart')

const auth = require('@wdalmut/mini-auth')
const token = require('@wdalmut/token-auth')
const me = require('../microservices/auth')

const {check_quantity} = require('../utilities/index')

const create = (req, res) => {
  req.user = {
    id: 2,
    role: 'VISITATOR',
  }
  const body = assoc('id_user', req.user.id, req.body)
  repo_product.get(req.body.id_product)
    .then(product => check_quantity(product.quantity, req.body.quantity))
    .then(() => repo.create(body))
    .then(compose(bind(res.status(201).json, res), view.one))
    .catch(error.generic(res))
}

let carts = require('express').Router()
carts.post('/',
  //auth(token(me)),
  input.validate_create_cart_input,
  create
)

module.exports = carts
