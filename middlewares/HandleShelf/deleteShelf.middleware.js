const pool = require("../../tools/mysql.tool");

const deleteShelf = async(req, res, next) => {
    // get user uid from authenticate middleware
    const {userUid} = req.user;
    // get shelf uid from DELETE request query parameter
    const {shelfUid} = req.query;

    // delte all books of this shelf
    await pool.promise().query(`
        DELETE FROM file WHERE Shelf_UID="${shelfUid}";
    `);
    // delete the shelf
    const deletedShelf = await pool.promise().query(`
        DELETE FROM Shelf WHERE Shelf_Owner_UID="${userUid}"  AND Shelf_UID="${shelfUid}";
    `);

    
    // deletedShelf[0] has object with affectedRows value
    if( deletedShelf[0].affectedRows >0 ){
        next();
    }else{
        return res.send(500);
    }

}

module.exports = deleteShelf;