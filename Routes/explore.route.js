const {Router} = require("express");
const authenticateToken = require("../middlewares/authenticateToken.middleware");
const grabDownloadLink = require("../middlewares/HandleExplore/grabDownloadLink.middleware");
const pdfdriveToShelf = require("../middlewares/HandleExplore/pdfdriveToShelf.middleware");
const searchPdfdrive = require("../middlewares/HandleExplore/searchPdfdrive.middleware");
const saveFile = require("../middlewares/HandleFile/saveFile.middleware");

const router = Router();

router.get("/search", searchPdfdrive, (req, res) => {
    // get listInnerHtml passed by searchPdfdrive middleware
    const searchResult = req.body.listInnerHtml;
    res.json({
        "searchResult": searchResult
    });
    
});

router.post("/getDwonloadLink", grabDownloadLink, (req, res) => {
    // get fileInfo from grapDownloadLink middleware
    const fileInfo = req.body.fileInfo;
    res.json({
        "fileInfo": fileInfo
    });
});

router.post("/saveToShelf", authenticateToken, pdfdriveToShelf, saveFile, (req, res) => {
    res.json(req.file);
})


module.exports = router;