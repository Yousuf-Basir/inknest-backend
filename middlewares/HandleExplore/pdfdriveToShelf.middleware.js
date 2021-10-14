const pdfdriveToShelf = (req, res, next) => {
    // Get these file properties and thumbnailPath from req body
    // {originalname, destination, filename, path, size, thumbnailPath}
    const {fileName, filePath, thumbnailPath} = req.body;
    req.file ={
        originalname: fileName, 
        destination: "pdfdrive", 
        filename: fileName, 
        path: filePath, 
        size: 0, 
        thumbnailPath: thumbnailPath
    }

    next();
}

module.exports = pdfdriveToShelf;