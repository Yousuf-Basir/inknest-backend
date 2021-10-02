const {Router} = require("express");
const pool = require("../tools/mysql.tool");

const router = Router();

// Get all users
router.get("/admin/getallusers", async (req, res) => {
    const [rows] = await pool.promise().query(`
        SELECT * FROM app_users
    `);
    res.json(rows);
});

// Reset Database
// router.get("/admin/deleteall", async (req, res) => {
//     const [rows] = await pool.promise().query(`
//         delete from ink_user;
//         delete from ink_user;
//         delete from ink_user;
//         delete from ink_user;
//         delete from ink_user;
//     `);
//     res.json(rows);
// });

// Get all files
router.get("/admin/getallfiles", async (req, res) => {
    const [rows] = await pool.promise().query(`
        SELECT * FROM user_files
    `);
    res.json(rows);
});

module.exports = router;