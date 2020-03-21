const multer = require('multer');

const fileFilter = function(req, file, cb) {
    console.log("FILE FILTER")
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)){
        const err = new Error("Wrong type");
        err.code = "LIMIT_FILE_TYPES";
        return cb(err, false)
    } 
    cb(null, true);
}

const MAX_SIZE = 20000000;


module.exports = multer({
    dest: './uploads',
    fileFilter,
    limits: {
        fileSize: MAX_SIZE
    }
    // dest: './uploads',
    // // storage: multer.diskStorage({}),
    // fileFilter: (req, file, cb) => {
    //     if(!file.mimetype.match(/jpe|jpeg|png/)){
    //         cb(new Error(`File is not supported`), false);
    //         return; 
    //     }
    //     cb(null, true);
    // }
});