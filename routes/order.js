const express = require('express');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { create, listOrders } = require('../controllers/order');
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

router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders);

router.param('userId', userById);

module.exports = router;
