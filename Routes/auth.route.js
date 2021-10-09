require("dotenv").config();
const { Router } = require("express");
const generateAccessToken = require("../tools/generateAccessToken.tool");
const { v4: uuidv4 } = require('uuid');
const pool = require("../tools/mysql.tool");
const isArrayEmpty = require("../tools/isArrayEmtpy.tool");

const router = Router();


router.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    // Check if email allready exists in database
    const [rows, fields] = await pool.promise().query(`
            SELECT * FROM Ink_User WHERE Email = "${email}"
    `);
    if (rows.length) return res.json({ msg: "User already exists" });

    // Generate UUID
    const userUid = uuidv4();
    // Generate a default shelf (Inkshelf) UID for this user
    const shelfUid = uuidv4();
    // Save user data is databse
    await pool.promise().query(`
        INSERT INTO Ink_User(
            User_UID, 
            Email, 
            Password, 
            First_Name, 
            Last_Name, 
            Account_Type, 
            Validated, 
            Inkshelf_UID,
            Totoal_files) 
        values (
            "${userUid}",
            "${email}",
            "${password}",
            "${firstName}",
            "${lastName}",
            "${"Basic"}",
            "${0}",
            "${shelfUid}",
            "${0}"
        );
    `);

    // Save data of default shelf (Inkshelf)
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
        "${"inkshelf"}",
        "${userUid}",
        "${1}",
        "${Date.now()}",
        "${"Default shelf"}"
    )`);


    // Generate JWT toekn
    const accessToken = generateAccessToken({ email: email, firstName: firstName, lastName: lastName, userUid: userUid, inkShelfUid: shelfUid });

    // Send response with JWT token 
    res.json({
        accessToken: accessToken,
        msg: "Sign up successfull"
    })

});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;


    // Retrive user email and UID from database
    const [rows] = await pool.promise().query(`
            SELECT * FROM Ink_User WHERE Email = "${email}"
    `);
    if (isArrayEmpty(rows)) { return res.json({ msg: "Invalid user credentials y" }) }

    // Validate email and password
    const userPassword = rows[0].Password;
    if (userPassword !== password) { return res.json({ msg: "Invalid user credentials x" }); }

    // Generate JWT using email and UID
    const accessToken = generateAccessToken({ email: email, firstName: rows[0].First_Name, lastName: rows[0].Last_Name, userUid: rows[0].User_UID, inkShelfUid: rows[0].Inkshelf_UID })
    // Send JWT to client
    return res.json({
        accessToken: accessToken,
        msg: "Login successfull"
    })
})



module.exports = router;