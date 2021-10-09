const pool = require("../../tools/mysql.tool");
const listUsers = async(req, res, next) => {
    const users = await pool.promise().query(`
        select User_UID, First_Name, Last_Name, Email from Ink_User;
    `);

    if(users[0].length > 0){
        req.users = {userList: users[0]}
    }else{
        req.users = {userList: []}
    }

    next();
}

module.exports = listUsers;