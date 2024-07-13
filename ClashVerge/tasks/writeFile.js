const fs = require("fs-extra");

function writeFileSync(filePath, content, fileName = "ACL4SSR_Online_Full.js") {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
    }
    fs.writeFileSync(filePath + "/" + fileName, content);
}

module.exports = {
    writeFileSync,
}