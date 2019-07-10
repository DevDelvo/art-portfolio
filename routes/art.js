const express = require("express");
const router = express.Router();

const { create, artById, read, remove } = require('../controllers/art');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');


router.get('/art/:artId', read)
// router.put('/art/:artId/:userId', update);
router.post('/art/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/art/:artId/:userId', requireSignin, isAuth, isAdmin, remove);
router.param('userId', userById)
router.param('artId', artById)

module.exports= router;