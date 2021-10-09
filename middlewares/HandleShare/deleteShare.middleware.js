const pool = require("../../tools/mysql.tool");

const deleteShare = async(req, res, next) => {
    // get shared shelf uid from DELETE request query parameter
    const {sharedWith, sharedShelfUid} = req.query;

    // delete the shelf
    const deletedSharedShelf = await pool.promise().query(`
        DELETE FROM Shared_Shelf WHERE Shared_With_UID="${sharedWith}"  AND Shared_Shelf_UID="${sharedShelfUid}";
    `);

    // deletedSharedShelf[0] has object with affectedRows value
    if( deletedSharedShelf[0].affectedRows >0 ){
        next();
    }else{
        return res.send(500);
    }

}

module.exports = deleteShare;