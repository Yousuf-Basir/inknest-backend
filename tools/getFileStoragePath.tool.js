const os = require ("os");
const path = require("path");

const getFileStoragePath = () => {
    const homeDir = os.homedir();
    const fileStoragePath = path.join(homeDir, "inknest", "usersFiles");
    return fileStoragePath;
}

module.exports = getFileStoragePath;