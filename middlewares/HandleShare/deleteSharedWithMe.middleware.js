const pool = require("../../tools/mysql.tool");

const deleteSharedWithMe = async(req, res, next) => {
    // get shelfOwner UID from authenticateToken middleware
    const {userUid} = req.user;

    const {sharedShelfUid} = req.query;
    // delete the shelf
    const deletedSharedShelf = await pool.promise().query(`
        DELETE FROM Shared_Shelf WHERE Shared_With_UID="${userUid}" AND Shared_Shelf_UID="${sharedShelfUid}";
    `);

    // deletedSharedShelf[0] has object with affectedRows value
    if( deletedSharedShelf[0].affectedRows >0 ){
        next();
    }else{
        return res.status(500);
    }
}

module.exports = deleteSharedWithMe;