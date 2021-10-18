let puppeteer = require("puppeteer");
var http = require("http");

const getFileInfo = (fileLink) => {
    return new Promise(async (resolve, reject) => {
        // starts browser
        let browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let numberofPages = await browser.pages();
        let tab = numberofPages[0];

        await tab.goto("https://www.pdfdrive.com/" + fileLink, {
            waitUntil: "networkidle2"
        });
        try {
            await tab.waitForSelector("#download-button");
            await tab.click("#download-button");
            await tab.waitForSelector(".btn.btn-primary.btn-user", { visible: true });
            // get download link of file
            var hrefLinks = await tab.$$eval(".btn.btn-primary.btn-user", anchors => [].map.call(anchors, a => a.href));

            await browser.close();

            resolve(hrefLinks[0]);
        } catch (err) {
            await browser.close();
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