/* 创建规则 */
const axios = require("axios");
const { commentReg, blankLineReg, rulesetsStr, commentReg2, endSpaceRegex } = require("../config");

const $axios = axios.create({
    timeout: 8000,
});

function createRulesetList() {
    const rulesetList = [];
    rulesetsStr
        .replace(commentReg, "")
        .replace(blankLineReg, "")
        .replace(/^ruleset=/gm, "")
        .split("\n")
        .forEach((line) => {
            const [name, src] = line.split(",");
            if (!name || !src) return;
            rulesetList.push({
                name,
                src,
            })
        })

    return rulesetList;
}

async function createRules() {
    const rulesetList = createRulesetList();
    const ruleLineList = await Promise.all(
        rulesetList.map((ruleset) =>
            $axios.get(ruleset.src).then((res) => {
                return res.data
                    .replace(commentReg2, "")
                    .replace(/^USER-AGENT.*|URL-REGEX.*$/gm, "")
                    .replace(blankLineReg, "")
                    .replace(endSpaceRegex, "")
                    .replace(/^(.*?)(,no-resolve)?$/gm, `$1,${ruleset.name}$2`);
            }).catch(() => {
                console.log("请求错误 ==> ", ruleset.src);
            })
        )
    );
    const rules = ruleLineList.map((ruleLine) => ruleLine.split("\n")).flat();
    rules.push(...["GEOIP,CN,🎯 全球直连", "MATCH,🐟 漏网之鱼"]);
    return JSON.stringify(rules, null, 2);
}

module.exports = {
    createRules
}