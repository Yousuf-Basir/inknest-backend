const multer = require("multer");
const {getFileStoragePath} = require("../../tools/getFileStoragePath.tool");

// Multer configurations
const multerUpload = multer({
    dest: getFileStoragePath(),
    limits: {
        fileSize: 1024*1024 * 50,  // 50 mb
    },
    fileFilter: (req, file, cb) => {
        // if(file.mimetype == "application/pdf"){
        //     cb(null, true);
        // }else{
        //     cb(null, false);
        //     return cb(new Error("File type not supported"));
        // }
        cb(null, true);
    }
}).single("inknestFiles");
// inknestFiles is the name of html file input


module.exports = multerUpload;