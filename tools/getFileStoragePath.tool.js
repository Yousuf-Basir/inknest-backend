const os = require ("os");
const path = require("path");

const getFileStoragePath = () => {
    const homeDir = os.homedir();
    const fileStoragePath = path.join(homeDir, "inknest", "usersFiles");
    return fileStoragePath;
}

const getThumbnailStoragePath = () => {
    const homeDir = os.homedir();
    const thumbnailPath = path.join(homeDir, "inknest", "usersFiles", "thumbnails");
    return thumbnailPath;
}

module.exports = {
    getFileStoragePath: getFileStoragePath,
    getThumbnailStoragePath: getThumbnailStoragePath
};