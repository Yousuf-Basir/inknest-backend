const { getThumbnailStoragePath } = require("../../tools/getFileStoragePath.tool");
const path = require("path");
const fs = require("fs/promises");


const deleteThumbnail = (req, res, next) => {
    // Get thumbnailPath from request body, sent from client
    const {thumbnailPath} = req.body;

    
    fs.unlink(thumbnailPath).then(()=>{
        next();
    }).catch((err) => {
        res.json({
            msg: "Error deleting file thumbnail",
            err: err
        })
    })

}

module.exports = deleteThumbnail;