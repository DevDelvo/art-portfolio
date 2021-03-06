const express = require('express');
const router = express.Router();

const {
  create,
  artById,
  read,
  update,
  remove,
  list,
  listSearch,
  artRelated,
  listCategories,
  listBySearch,
  photo
} = require('../controllers/art');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/art/:artId', read);
router.put('/art/:artId/:userId', requireSignin, isAuth, isAdmin, update);
router.post('/art/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/art/:artId/:userId', requireSignin, isAuth, isAdmin, remove);

router.get('/arts', list);
router.get('/arts/search', listSearch); // for art searched with regex 
router.get('/arts/related/:artId', artRelated);
router.get('/arts/categories', listCategories);
router.post('/arts/by/search', listBySearch); // for filtered art
router.get('/arts/photo/:artId', photo);

router.param('userId', userById);
router.param('artId', artById);

module.exports = router;
