const { default: axios } = require("axios");
const cheerio = require("cheerio");

// const getFileInfo = (fileLink) => {
//     return new Promise(async (resolve, reject) => {
//         // starts browser
//         let browser = await puppeteer.launch({
//             headless: true,
//             defaultViewport: null,
//             args: ["--start-maximized"]
//         });
//         let numberofPages = await browser.pages();
//         let tab = numberofPages[0];

//         await tab.goto("https://www.pdfdrive.com/" + fileLink, {
//             waitUntil: "networkidle2"
//         });
//         try {
//             await tab.waitForSelector("#download-button");
//             await tab.click("#download-button");
//             await tab.waitForSelector(".btn.btn-primary.btn-user", { visible: true });
//             // get download link of file
//             var hrefLinks = await tab.$$eval(".btn.btn-primary.btn-user", anchors => [].map.call(anchors, a => a.href));

//             await browser.close();

//             resolve(hrefLinks[0]);
//         } catch (err) {
//             await browser.close();
//             reject();
//         }
//     })
// }

const getFileInfo = (fileLink) => {
    return new Promise(async (resolve, reject) => {
        // pdfdrive url for the book requested by user
        const url = `https://www.pdfdrive.com/${fileLink}/`;
        const { data } = await axios.get(url);
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data);

        // at pdfdrive the detals page of each books has a preview button
        // preview button has an attribute called data-preview with a url value which contains book id and session number
        const previewButtonMain = $("#previewButtonMain").attr("data-preview");

        // seperate the id and session from main url
        var params = previewButtonMain.split("?")[1];
        
        // this is the url that needs book id and session and the page contains download link button
        var downloadSite = "https://www.pdfdrive.com/ebook/broken?" + params;
        const downloadSiteData = await axios.get(downloadSite);

        const $$ = cheerio.load(downloadSiteData.data);
        // get the href value from download button
        const downloadLink = $$("a.btn-primary").attr("href");

        if(downloadLink){
            // returning actual download url
            const actualDownloadLink = `https://pdfdrive.com${downloadLink}`
            resolve(actualDownloadLink);
        }else{
            reject();
        }

        
    })
}

const grabDownloadLink = (req, res, next) => {
    const { fileLink, bookTitle } = req.body
    getFileInfo(fileLink).then(fileUrl => {
        req.body.fileInfo = {
            bookTitle: bookTitle,
            fileUrl: fileUrl,
        };
        next();
    }).catch(err => {
        console.log(err);
        return res.send("Error occured while getting download button innerHtml for book");
    })
}

module.exports = grabDownloadLink;