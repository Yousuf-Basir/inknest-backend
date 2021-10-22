const fs = require("fs/promises");
const pool = require("../../tools/mysql.tool");

const deleteAllFiles = (booksRow) => {
    return new Promise(async (resolve, reject) => {
        if(!booksRow.length){reject()}
        // delete each book
        try {
            for (var i = 0; i < booksRow.length; i++) {
                // check if book has thumbnail or not
                if(booksRow[i].Thumbnail_Path){
                    await fs.unlink(booksRow[i].Thumbnail_Path)
                }
                // delete the book from disk
                fs.unlink(booksRow[i].Path).then(()=>{
                    if (booksRow.length == i) { resolve() }
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}


const deleteShelf = async (req, res, next) => {
    // get user uid from authenticate middleware
    const { userUid } = req.user;
    // get shelf uid from DELETE request query parameter
    const { shelfUid } = req.query;

    
    const books = await pool.promise().query(`select * from File where Shelf_UID="${shelfUid}"`);
    const booksRow = books[0];

    // delete all files of this shelf from disk
    // delte all books of this shelf
    await pool.promise().query(`DELETE FROM File WHERE Shelf_UID="${shelfUid}";`);
    
    // delete this shelf from shared shelf table
    await pool.promise().query(`DELETE FROM Shared_Shelf WHERE Shelf_UID="${shelfUid}";`);
    // delete the shelf
    const deletedShelf = await pool.promise().query(`DELETE FROM Shelf WHERE Shelf_Owner_UID="${userUid}"  AND Shelf_UID="${shelfUid}";`);
    // deletedShelf[0] has object with affectedRows value
    if (deletedShelf[0].affectedRows > 0) {
        deleteAllFiles(booksRow).then(()=>{
            next();
        }).catch(err=>{
            console.log(err);
            return res.sendStatus(500);
        })
        
    } else {
        return res.sendStatus(500);
    }




}

module.exports = deleteShelf;