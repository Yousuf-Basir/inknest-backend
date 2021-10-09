const pool = require("../../tools/mysql.tool");

const listSharedByMe = async(req, res, next) => {
    // get shelfOwner UID from authenticateToken middleware
    const {userUid} = req.user;

    const sharedByMeList = await pool.promise().query(`
        SELECT * FROM Shared_Shelf WHERE Shared_By_UID="${userUid}";
    `);

    if(sharedByMeList[0].length > 0){
        req.sharedByMeList = sharedByMeList[0]
    }else{
        req.sharedByMeList = []
    }

    next();
}

module.exports = listSharedByMe;