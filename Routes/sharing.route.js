const {Router} = require("express");
const authenticateToken = require("../middlewares/authenticateToken.middleware");
const createShare = require("../middlewares/HandleShare/createShare.middleware");
const deleteShare = require("../middlewares/HandleShare/deleteShare.middleware");
const listUsers = require("../middlewares/HandleShare/listUsers.middleware");

const router = Router();

// List all users
router.get("/listusers", authenticateToken, listUsers, (req, res) => {
    // get userList object passed by listUser middleware
    const {userList} = req.users;
    res.json({
        "userList": userList
    });
});

router.post("/share", authenticateToken, createShare, (req, res) => {
    // get sharedShelfUid passed by createShare middleware
    const {sharedShelfUid} = req.sharedShelf;
    res.json({
        "sharedShelfUid": sharedShelfUid
    });
})

router.delete("/share", authenticateToken, deleteShare, (req, res) => {
    RTCRtpSender.json({
        "msg": "Removed from shared"
    })
});

module.exports = router;