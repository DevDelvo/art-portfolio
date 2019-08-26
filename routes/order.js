const express = require('express');
const router = express.Router();
const { requireSignin, isAuth } = require('../controllers/auth');
const { create, read, write } = require('../controllers/order');
const { userById, addOrderToUserHistory } = require('../controllers/user');

router.post(
  '/order/create/:userId',
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  create
);

router.param('userId', userById);

module.exports = router;
