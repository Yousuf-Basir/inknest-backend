const pool = require("../../tools/mysql.tool");

const moveFile = async (req, res, next) => {
    // UPDATE Customers
    // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
    // WHERE CustomerID = 1;
    const {fileUid, moveToShelfUid} = req.body;
    console.log(fileUid, moveToShelfUid)
    await pool.promise().query(`
        UPDATE File 
        SET Shelf_UID = "${moveToShelfUid}" 
        WHERE File_UID = "${fileUid}";
    `);

    next();

}

module.exports = moveFile;