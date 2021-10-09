const pool = require("../../tools/mysql.tool");
const {v4: uuidv4} = require("uuid");

const createShare = async(req, res, next) => {
    // get shelfOwner UID from authenticateToken middleware
    const {userUid} = req.user;
    // get shared shelf properties from req.body using POST
    const {shelfUid, sharedByUid, sharedWithUid, shelfName, sharedBy, sharedWith} = req.body;

    const sharedShelfUid = uuidv4();

    await pool.promise().query(`
        INSERT INTO Shared_Shelf(
            Shared_Shelf_UID,
            Shelf_UID,
            Shared_By_UID,
            Shared_With_UID,
            Shared_Date,
            Shelf_Name,
            Shared_By,
            Shared_With)
        VALUES (
            "${sharedShelfUid}",
            "${shelfUid}",
            "${sharedByUid}",
            "${sharedWithUid}",
            "${Date.now()}",
            "${shelfName}",
            "${sharedBy}",
            "${sharedWith}")
    `);

    req.sharedShelf = {sharedShelfUid: sharedShelfUid};
    next();
}

module.exports = createShare;