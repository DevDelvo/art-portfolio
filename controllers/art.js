const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Art = require("../models/art");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
    let form = new formidable.IncomingForm() // form data is available here
    form.keepExtensions = true; // whatever images we are receiving, the extensions will be there
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: 'Image could not be uploaded.'
            });
        }
        let art = new Art(fields)
        if (files.photo) {
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
}