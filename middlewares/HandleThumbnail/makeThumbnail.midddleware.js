const pdfConverter = require('pdf-poppler');
const path = require("path")
const {getThumbnailStoragePath} = require('../../tools/getFileStoragePath.tool');


const makeThumbnail = (req, res, next) => {
    // get the file path as filePath passed by multer middleware
    const {file}= req;

    let option = {
        format : 'jpeg',
        out_dir : getThumbnailStoragePath(),
        out_prefix : path.basename(file.path),
        page : 1,
        scale: 512 //default is 1024
    }
    console.log(option)
    // option.out_dir value is the path where the image will be saved

    pdfConverter.convert(file.path, option)
    .then(() => {
        // add thumbnailPath value to file object for saving it into File table in sql database
        file.thumbnailPath = path.join(
                            option.out_dir,
                            option.out_prefix + "-01.jpg"); //for some reason pdf-poppler adds -01 at the end of file name

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