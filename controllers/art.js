const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Art = require('../models/art');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.artById = (req, res, next, id) => {
  Art.findById(id)
    .populate('category')
    .exec((err, art) => {
      if (err || !art) {
        return res.status(400).json({
          error: 'Art not found'
        });
      }
      req.art = art;
      next();
    });
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm(); // form data is available here
  form.keepExtensions = true; // whatever images we are receiving, the extensions will be there
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded.'
      });
    }
    // check for all fields
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: 'All fields are required.'
      });
    }

    let art = new Art(fields);
    if (files.photo) {
      // console.log("size", files.photo.size / 1000)
      if (files.photo.size > 1000000) {
        // stops if file is more than 1MB (1000000KB) in size
        return res.status(400).json({
          error: 'Image should be less than 1MB in size.'
        });
      }
      art.photo.data = fs.readFileSync(files.photo.path);
      art.photo.contentType = files.photo.type;
    }

    art.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result);
    });
  });
};

exports.read = (req, res) => {
  req.art.photo = undefined;
  return res.json(req.art);
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm(); // form data is available here
  form.keepExtensions = true; // whatever images we are receiving, the extensions will be there
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded.'
      });
    }
    // check for all fields
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      // !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: 'All fields are required.'
      });
    }

    let art = req.art;
    art = _.extend(art, fields);

    if (files.photo) {
      // console.log("size", files.photo.size / 1000)
      if (files.photo.size > 1000000) {
        // stops if file is more than 1MB (1000000B) in size
        return res.status(400).json({
          error: 'Image should be less than 1MB in size.'
        });
      }
      art.photo.data = fs.readFileSync(files.photo.path);
      art.photo.contentType = files.photo.type;
    }

    art.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let art = req.art;
  console.log(art)
  art.remove((err, deletedArt) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: 'Art has been deleted successfully!'
    });
  });
};

/**
 * sell / arrival
 * by sell = /arts?sortBy=sold&order=desc&limit=4
 * by arrival = /arts?sortBy=createdAt&order=desc&limit=4
 * if no params = then all products are returned
 */

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Art.find()
    .select('-photo')
    .populate('category') // because we've associated the art model with the category model
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          message: 'Art not found.'
        });
      }
      res.json(data);
    });
};

exports.listSearch = (req, res) => {
  // create query object to hold search value and category
  const query = {};
  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' }; // regex allows for regex matchin in mongod. 'i' is for capslock insensitivity
    // assign category value to query.category
    if (req.query.category && req.query.category !== 'All') {
      query.category = req.query.category;
    }
    // find art based on query object with 2 properties search and categories
    Art.find(query, (err, arts) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(arts);
    }).select('-photo');
  }
};

exports.artRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  //$ne means not equal to
  Art.find({ _id: { $ne: req.art }, category: req.art.category })
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          message: 'Art not found.'
        });
      }
      res.json(data);
    });
};

exports.listCategories = (req, res) => {
  Art.distinct('category', {}, (err, Categories) => {
    //distinct - Finds the distinct values for a specified field across a single collection or view and returns the results in an array.
    if (err) {
      return res.status(400).json({
        message: 'Categories not found.'
      });
    }
    res.json(Categories);
  });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0], // $gte - greater than or equal
          $lte: req.body.filters[key][1] // $lte - less than or equal
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Art.find(findArgs)
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Art not found'
        });
      }
      res.json({
        size: data.length,
        data
      });
    });
};

exports.photo = (req, res, next) => {
  //   console.log(req.art);
  if (req.art.photo.data) {
    res.set('Content-Type', req.art.photo.contentType); //set content type i.e: .jpg, .png, .pdf.
    return res.send(req.art.photo.data);
  }
  next();
};

exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map(item => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } } // decrement with -
      }
    };
  });
  Art.bulkWrite(bulkOps, {}, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: `Could not update product.`
      });
    }
    next();
  });
};
