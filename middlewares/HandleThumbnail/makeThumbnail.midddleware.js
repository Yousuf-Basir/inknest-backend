const pdfConverter = require('pdf-poppler');
const path = require("path")
const {getThumbnailStoragePath} = require('../../tools/getFileStoragePath.tool');
const fs = require("fs");


const makeThumbnail = (req, res, next) => {
    // get the file path as filePath passed by multer middleware
    const {file}= req;

    if(file.mimetype !== "application/pdf"){
        return next();
    }

    let option = {
        format : 'jpeg',
        out_dir : getThumbnailStoragePath(),
        out_prefix : path.basename(file.path),
        page : 1,
        scale: 512 //default is 1024
    }
    // option.out_dir value is the path where the image will be saved

    pdfConverter.convert(file.path, option)

    //for some reason pdf-poppler adds -01 or -001 etc at the end of file name
    // So I am renaming the file to remove extra -01 or -001 from the end of the conveted file name
    .then(() => {
        // Get the thumbnail file name that starts with the pdf file name
        var convertedFile = fs.readdirSync(option.out_dir).filter(fn => fn.startsWith(option.out_prefix))[0];

        const oldPath = path.join(option.out_dir, convertedFile);
        // Create new file name without extra -01 or -001 by using the actuale pdf file name
        const newPath = path.join(option.out_dir, option.out_prefix) + ".jpg";
        // Rename the file
        fs.renameSync(oldPath,  newPath);

        // add thumbnailPath value to file object for saving it into File table in sql database
        file.thumbnailPath = newPath; 

        next();
    })
    .catch(err => {
        console.log('an error has occurred in the pdf converter ' + err);
        return res.json({
            msg: "Failed to generate thumbnail",
            err: err
        })
    })

}

module.exports = makeThumbnail;