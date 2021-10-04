const fs = require("fs/promises");
const pool = require("../../tools/mysql.tool");

const deleteUserFile = async (req, res, next) => {
    // Get file uid and file path from request body, sent from client
    const {fileUid, filePath} = req.body;

    // Delete the file
    fs.unlink(filePath).then(async ()=>{
        const deletedFile = await pool.promise().query(`
            DELETE FROM File WHERE File_UID='${fileUid}'
        `);
        if( deletedFile[0].affectedRows >0 ){
            next();
        }else{
            return res.sendStatus(500);
        }
    }).catch((err)=>{
        console.log(err);
        return res.sendStatus(500)
    });
}


module.exports = deleteUserFile;