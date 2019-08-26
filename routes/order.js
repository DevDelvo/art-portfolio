const express = require('express');
const router = express.Router();
const { requireSignin, isAuth } = require('../controllers/auth');
const { create, read, write } = require('../controllers/order');
const { decreaseQuantity } = require('../controllers/art');
const { userById, addOrderToUserHistory } = require('../controllers/user');

router.post(
  '/order/create/:userId',
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);

router.param('userId', userById);

module.exports = router;
