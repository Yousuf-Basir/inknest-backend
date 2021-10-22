const pool = require("../../tools/mysql.tool");
const {v4: uuidv4} = require("uuid");

const createShelf = async (req, res, next) => {
    // get shelfOwner UID from authenticateToken middleware
    const {userUid} = req.user;
    
    if(!req.body.shelfName || !req.body.isOpen || !req.body.shelfDescription){
        return next();
    }

    // get shelf properties from req.body using POST
    const {shelfName, isOpen,  shelfDescription} = req.body;


    const shelfUid = uuidv4();

    await pool.promise().query(`
        INSERT INTO Shelf(
            Shelf_UID,
            Shelf_Name,
            Shelf_Owner_UID,
            Is_Open,
            Shelf_Created_Date,
            Shelf_Description)
        VALUES (
            "${shelfUid}",
            "${shelfName}",
            "${userUid}",
            "${isOpen}",
            "${Date.now()}",
            "${shelfDescription}")

    `);
    
    req.shelf = { shelfUid: shelfUid }
    next();
}

module.exports = createShelf;
