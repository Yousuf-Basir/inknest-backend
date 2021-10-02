const {Router} = require("express");
const authenticateToken = require("../middlewares/authenticateToken.middleware");
const deleteUserFile = require("../middlewares/HandleFile/deleteUserFile.middleware");
const listUserFiles = require("../middlewares/HandleFile/listUserFiles.middleware");
const multerUpload = require("../middlewares/HandleFile/multer.middeware");
const saveFile = require("../middlewares/HandleFile/saveFile.middleware");

const router = Router();
// file upload
router.post("/file", authenticateToken, multerUpload, saveFile, (req, res) => {
    res.json(req.file);
});

// list all user files
router.get("/file", authenticateToken, listUserFiles, (req, res) => {
    res.json(req.fileList);
});

// Delete user file
router.delete("/file", authenticateToken, deleteUserFile, (req, res) => {
    res.json({
        "msg": "file deleted"
    });
});

module.exports = router;
