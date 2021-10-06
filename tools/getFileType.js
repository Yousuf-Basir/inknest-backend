const getFileType = (file) => {
    if(file.mimetype){
        switch(file.mimetype){
            case "application/pdf":
                return "pdf"
            case "application/x-mobipocket-ebook":
                return "mobi"
            case "application/octet-stream":
                return "kindle"
            case "application/epub+zip":
                return "epub"
            default:
                return ""
        }
    }else{
        const ext = file.filename ? file.filename.split(".").pop(): "";
        
        switch(ext){
            case "pdf":
                return "pdf"
            case "mobi":
                return "mobi"
            case "azw3":
                return "kindle"
            case "epub":
                return "epub"
            default:
                return ""
        }
    }
}

module.exports = getFileType;