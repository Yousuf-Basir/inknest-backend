const isArrayEmpty = require("../../tools/isArrayEmtpy.tool");
const pool = require("../../tools/mysql.tool");

const listUserFiles = async (req, res, next) => {
    // Get shelf UID from req.body using POST
    const {shelfUid} = req.query;

    // Get all files mathed by user UID
    const [rows] = await pool.promise().query(`
            SELECT * FROM File WHERE Shelf_UID='${shelfUid}'
    `);

    if(isArrayEmpty(rows)){
        return res.sendStatus(404);
    }

    // Pass file list array as req.fileList through next()
    req.fileList = rows;
    next();

}

module.exports = listUserFiles;