const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Art = require("../models/art");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.artById = (req, res, next, id) => {
    Art.findById(id).exec((err, art) => {
        if (err || !art) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.art = art;
        next();
    });
};

exports.read = (req, res) => {
    req.art.photo = undefined;
    return res.json(req.art);
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm() // form data is available here
    form.keepExtensions = true; // whatever images we are receiving, the extensions will be there
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: 'Image could not be uploaded.'
            });
        }
        // check for all fields
        const { name, description, price, category, quantity, shipping } = fields
        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are required."
            })
        }

        let art = new Art(fields)
        if (files.photo) {
            console.log("size", files.photo.size / 1000)
            if (files.photo.size > 1000000) { // stops if file is more than 1MB (1000000KB) in size
                return res.status(400).json({
                    error: "Image should be less than 1MB in size."
                });
            }
            art.photo.data = fs.readFileSync(files.photo.path)
            art.photo.contentType = files.photo.type
        }

        art.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        });
    });
};

exports.remove = (req, res) => {
    let art = req.art;
    art.remove((err, deletedArt) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            "message": 'Art has been deleted successfully!'
        })
    });
}
