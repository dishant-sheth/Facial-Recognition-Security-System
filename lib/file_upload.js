const multer = require('multer');
const Promise = require('bluebird');

exports.storage = multer.diskStorage({
    destination: '../user_images',
    filename: ((req, file, callback) => {
        callback(null, file.originalname);
    })
});