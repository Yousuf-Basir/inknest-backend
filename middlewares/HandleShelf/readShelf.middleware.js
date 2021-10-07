const pool = require("../../tools/mysql.tool");

const readShelf = async(req, res, next) => {
    // get user uid from authenticate middleware
    const {userUid} = req.user;

    const userShelfs = await pool.promise().query(`
        select * from shelf where Shelf_Owner_UID="${userUid}";
    `);

    // userShelf[0] contains array of all rows and userShelfs[1] contains field object
    if(userShelfs[0].length > 0){
        req.shelf = {userShelfs: userShelfs[0]};
    }else{
        req.shelf = {userShelfs: []};
    }
    

    next();
}

module.exports = readShelf;