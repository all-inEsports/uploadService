require("dotenv").config();
const express = require("express");
const expressAuth = require('express-basic-auth');
const fileCtrl = require('./fileController');
const multer = require("multer");
const crypto = require('crypto');
const formData = require("express-form-data");
const path = require('path');
const app = express();
const port = 3000;
const os = require('os');
app.listen(port, () => {
    console.log('Server listening on port %s.', port);
});
const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};
// parse data with connect-multiparty. 
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

/*var storage = multer.diskStorage({
    destination: './files',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err)
                return cb(err);
            cb(null, file.originalname);
        });
    }
});
app.use(multer({ storage: storage }).single('filename'));*/
app.post('/api/upload', asyncHandler(fileCtrl.upload));
function asyncHandler(handler) {
    return function (req, res, next) {
        if (!handler) {
            next(new Error(`Invalid handler ${handler}, it must be a function.`));
        }
        else {
            handler(req, res, next).catch(next);
        }
    };
}
