const {Router} = require("express");
const authenticateToken = require("../middlewares/authenticateToken.middleware");
const createShare = require("../middlewares/HandleShare/createShare.middleware");
const deleteShare = require("../middlewares/HandleShare/deleteShare.middleware");
const deleteSharedWithMe = require("../middlewares/HandleShare/deleteSharedWithMe.middleware");
const listSharedWithMe = require("../middlewares/HandleShare/lisitSharedWithMe.middleware");
const listSharedByMe = require("../middlewares/HandleShare/listSharedByMe.middleware");
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

// delete shelf shared by current user
router.delete("/share", authenticateToken, deleteShare, (req, res) => {
    res.json({
        "msg": "Removed from shared"
    })
});

// list shelfs shared by current user
router.get("/shared-by-me", authenticateToken, listSharedByMe, (req, res) => {
    res.json({
        "sharedByMeList": req.sharedByMeList
    })
});


// list all shelf shared with current user
router.get("/shared-with-me", authenticateToken, listSharedWithMe, (req, res) => {
    res.json({
        "sharedWithMeList": req.sharedWithMeList
    })
})

router.delete("/shared-with-me", authenticateToken, deleteSharedWithMe, (req, res) => {
    res.json({
        "msg": "Deleted shared shelf"
    })
})

module.exports = router;