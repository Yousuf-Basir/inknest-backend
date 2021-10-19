const { default: axios } = require("axios");
const cheerio = require("cheerio");

// test play ground
//https://codesandbox.io/s/node-js-forked-b3pmv?file=/src/index.js

const searchBook = (bookName) => {
    return new Promise(async(resolve, reject) => {
        const url =`https://www.pdfdrive.com/search?q=${bookName}&pagecount=&pubyear=&searchin=`;
        const { data } = await axios.get(url);
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data);        

        const listItems = $(".files-new > ul > li");

        const results = [];
        // get innerHtml of each list li element
        for(var i=0; i<listItems.length; i++){
            let html = $(listItems[i]).html();
            results.push(html);
        }
        resolve(results);
    })
}


const searchPdfdrive = async (req, res, next) => {
    const bookName = encodeURI(req.query.bookName);
    console.log("bookname: ", bookName);
    searchBook(bookName).then((listInnerHtml) => {
        req.body.listInnerHtml = listInnerHtml;
        next();
    }).catch(err =>{
        console.log(err);
        return res.send("Error occured while searching for book");
    });
}

module.exports = searchPdfdrive;