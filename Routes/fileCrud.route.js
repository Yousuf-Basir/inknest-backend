const {Router} = require("express");
const authenticateToken = require("../middlewares/authenticateToken.middleware");
const deleteUserFile = require("../middlewares/HandleFile/deleteUserFile.middleware");
const listUserFiles = require("../middlewares/HandleFile/listUserFiles.middleware");
const multerUpload = require("../middlewares/HandleFile/multer.middeware");
const saveFile = require("../middlewares/HandleFile/saveFile.middleware");
const deleteThumbnail = require("../middlewares/HandleThumbnail/deleteThumbnail.middleware");
const makeThumbnail = require("../middlewares/HandleThumbnail/makeThumbnail.midddleware");

const router = Router();
// file upload
router.post("/file", authenticateToken, multerUpload, makeThumbnail, saveFile, (req, res) => {
    res.json(req.file);
});

// list all user files
router.get("/file", authenticateToken, listUserFiles, (req, res) => {
    res.json(req.fileList);
});

// Delete user file
router.delete("/file", authenticateToken, deleteUserFile, deleteThumbnail, (req, res) => {
    res.json({
        "msg": "file deleted"
    });
});

// Send download link of a file
router.get("/file/geturl", authenticateToken, (req, res) => {
    // get filePath from POST resuest body
    const filePath = req.query.filePath;
    // Send download link of the file
    res.sendFile(filePath, (err)=>{
        if(err){
            res.sendStatus(404)
        }else{
            console.log("File url sent");
        }
    })
})

module.exports = router;
