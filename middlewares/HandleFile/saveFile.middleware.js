const pool = require("../../tools/mysql.tool");
const { v4: uuidv4 } = require('uuid');
const getFileType = require("../../tools/getFileType");

const saveFile = async (req, res, next) => {
    // Get user UID from req object passed by authenticateToken middleware
    const {userUid, inkShelfUid} = req.user;
    // Get file properties from req object passed by multer middleware
    // Also get thumbnailPath the passed by makeThumbnail middleware
    const {originalname, destination, filename, path, size, thumbnailPath} = req.file;

    // if no shelf uid provided save to default inkShelf
    const shelfUId = req.body.shelfUid || inkShelfUid;

    const fileUid = uuidv4();
    // replace backslash with double backslash as mysql doesnt support single backslash in value
    const formatedDestination = destination.replace(/\\/g, "\\\\");
    const formatedPath = path.replace(/\\/g, "\\\\");
    const formatedThumbnailPath = thumbnailPath?thumbnailPath.replace(/\\/g, "\\\\"):"";
    const formatedFileType = getFileType(req.file);
    console.log(formatedFileType);

    // Save file properties in database
    await pool.promise().query(`
            INSERT INTO File(
                File_UID, 
                Shelf_UID, 
                File_Name,
                Original_Name,
                Destination,
                Path,
                File_Size,
                Mimetype,
                Thumbnail_Path,
                File_Created_Date)
            VALUES (
                "${fileUid}", 
                "${shelfUId}",
                "${filename}", 
                "${originalname}", 
                "${formatedDestination}", 
                "${formatedPath}", 
                "${size}", 
                "${formatedFileType}",
                "${formatedThumbnailPath}",
                "${Date.now()}")
    `);

    next();
}

module.exports = saveFile;
