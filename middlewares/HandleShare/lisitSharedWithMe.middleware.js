const pool = require("../../tools/mysql.tool");

const listSharedWithMe = async(req, res, next) => {
     // get shelfOwner UID from authenticateToken middleware
     const {userUid} = req.user;

    const sharedWithMeList = await pool.promise().query(`
        SELECT * FROM Shared_Shelf WHERE Shared_With_UID="${userUid}";
    `);

    if(sharedWithMeList[0].length > 0){
        req.sharedWithMeList = sharedWithMeList[0]
    }else{
        req.sharedWithMeList = []
    }

    next();
}

module.exports = listSharedWithMe;