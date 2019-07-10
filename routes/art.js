const express = require("express");
const router = express.Router();

const { create, artById, read } = require('../controllers/art');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');


router.get('/art/:artId', read)
router.post("/art/create/:userId", requireSignin, isAuth, isAdmin, create);
router.param('userId', userById)
router.param('artId', artById)

module.exports= router;