const {Router} = require("express");
const authenticateToken = require("../middlewares/authenticateToken.middleware");
const createShelf= require("../middlewares/HandleShelf/createShelf.middleware");
const deleteShelf = require("../middlewares/HandleShelf/deleteShelf.middleware");
const readShelf= require("../middlewares/HandleShelf/readShelf.middleware");

const router = Router();

// Create new shelf for the authenticated user
router.put("/shelf", authenticateToken, createShelf, (req, res) => {
    // get newly created shelf UID from createShelf middleware
    const {shelfUid} = req.shelf;
    res.json({
        "shelfUid": shelfUid,
        "msg": "shelf created"
    })
});


// Get all shelfs of the authenticated user
router.get("/shelf", authenticateToken, readShelf, (req, res) => {
    // get shelfs object that contains users shelfs rows from readShelf middleware
    const {userShelfs} = req.shelf;

    res.status(200).json({
        userShelfs: userShelfs
    });
});

router.delete("/shelf", authenticateToken, deleteShelf, (req, res) => {
    res.status(200).json({
        "msg": "Shelf deleted"
    });
});


module.exports = router