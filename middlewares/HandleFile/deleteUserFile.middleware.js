const fs = require("fs/promises");
const pool = require("../../tools/mysql.tool");

const deleteUserFile = async (req, res, next) => {
    // Get file uid and file path from request body, sent from client
    const { fileUid } = req.query;
    console.log(req.query)

    const book = await pool.promise().query(`select * from File where File_UID="${fileUid}"`);
    if (book[0].length > 0) {
        const row = book[0];
        console.log(row[0]);
        // Delete the file
        fs.unlink(row[0].Path).then(async () => {
            const deletedFile = await pool.promise().query(`DELETE FROM File WHERE File_UID='${fileUid}'`);
            if (deletedFile[0].affectedRows > 0) {
                next();
            } else {
                return  next();
            }
        }).catch((err) => {
            console.log(err);
            return next();
        });
    } else {
        res.send("File not found");
    }



}


module.exports = deleteUserFile;