const puppeteer = require("puppeteer");
// search and get book list from pdfdrive
const searchBook = (bookName) => {
    return new Promise(async(resolve, reject) => {
        // starts browser
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });

        let numberofPages = await browser.pages();
        let tab = numberofPages[0];        

        await tab.goto("https://www.pdfdrive.com/", {
            waitUntil: "networkidle2"
        });

        await tab.waitForSelector("input#q");
        await tab.type("input#q", bookName, { delay: 5 });

        await tab.waitForSelector("#search-form > button > i");
        await tab.click("#search-form > button > i");

        await tab.waitForSelector(".files-new > ul > li:nth-child(1) > div > div > div.file-right > a");
        let listSelector = ".files-new > ul > li";

        var getList = await tab.$$eval(listSelector, list => {
            var results = [];
            for (let i = 0; i < list.length; i++) {
                results.push(list[i].innerHTML);
            }
            return results;
        });

        await browser.close();

        // response with search list innerHtml
        resolve(getList);
    });
}


const searchPdfdrive = async (req, res, next) => {
    const bookName = req.query.bookName;
    console.log(bookName);
    searchBook(bookName).then((listInnerHtml) => {
        console.log(listInnerHtml)
        req.body.listInnerHtml = listInnerHtml;
        next();
    }).catch(err =>{
        console.log(err);
        return res.send("Error occured while searching for book");
    });
}

module.exports = searchPdfdrive;