const fs = require("fs-extra");
const { createRules } = require("./tasks/createRules")
const { createGroups } = require("./tasks/createGroups")
const { writeFileSync } = require("./tasks/writeFile")


async function createConfigScript() {
    const rules = await createRules();
    const groups = await createGroups();

    let mainTemp = fs.readFileSync("./mainTemp.js", "utf8");
    mainTemp = mainTemp.replace("$groupsConfig", groups);
    mainTemp = mainTemp.replace("$rules", rules);

    writeFileSync("./dist", mainTemp)
} 

createConfigScript()