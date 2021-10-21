const { getThumbnailStoragePath } = require("../../tools/getFileStoragePath.tool");
const path = require("path");
const fs = require("fs/promises");
const pool = require("../../tools/mysql.tool");


const deleteThumbnail = async (req, res, next) => {
    const {fileUid} = req.query;

    const book = await pool.promise().query(`select * from File where File_UID="${fileUid}"`);
    if (book[0].length > 0) {
        const row = book[0];
        if(row[0].Thumbnail_Path){
            fs.unlink(row[0].Thumbnail_Path).then(async () => {
                next();
            }).catch((err) => {
                console.log(err);
                return next();
            });
        }
    } else {
        return next();
    }

}

module.exports = deleteThumbnail;