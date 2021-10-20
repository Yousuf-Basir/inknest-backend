const {Router} = require("express");
const authenticateToken = require("../middlewares/authenticateToken.middleware");
const deleteUserFile = require("../middlewares/HandleFile/deleteUserFile.middleware");
const listUserFiles = require("../middlewares/HandleFile/listUserFiles.middleware");
const multerUpload = require("../middlewares/HandleFile/multer.middeware");
const saveFile = require("../middlewares/HandleFile/saveFile.middleware");
const deleteThumbnail = require("../middlewares/HandleThumbnail/deleteThumbnail.middleware");
const makeThumbnail = require("../middlewares/HandleThumbnail/makeThumbnail.midddleware");
const { getThumbnailStoragePath, getFileStoragePath } = require("../tools/getFileStoragePath.tool");
const path = require("path");
const authenticateGetUrlToken = require("../middlewares/authenticateGetUrlToken.middleware");

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
router.delete("/file", authenticateToken,  deleteThumbnail, deleteUserFile, (req, res) => {
    res.json({
        "msg": "file deleted"
    });
});

// Send download link of a file
router.get("/file/get-thumbnail-url", authenticateGetUrlToken, (req, res) => {
    // get fileName from GET resuest query 
    const fileName = req.query.fileName;

    // since file name and thumbnail image file name is same, 
        // get thumbnail file path by joining thumbnail storage path and fileName
    const filePath =  path.join(getThumbnailStoragePath(), (fileName + ".webp"));

    // Send download link of the file
    res.sendFile(filePath, (err)=>{
        if(err){
            res.sendStatus(404)
        }else{
            console.log("File url sent");
        }
    })
});


// Send download link of a file
router.get("/file/get-file-url", authenticateGetUrlToken, (req, res) => {
    // get fileName from GET resuest query 
    const fileName = req.query.fileName;

    const filePath =  path.join(getFileStoragePath(), fileName);
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
