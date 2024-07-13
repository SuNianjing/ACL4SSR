const { groupsConfig } = require('../config')


const allSelectProxies = groupsConfig
    .filter(group => ['myNode'].includes(group.proxies))
    .map(group => {
        return `{
            title: '${group.title}',
            proxies: ${group.name}Proxies,
        }`
    })
function createGroups() {
    if (groupsConfig.length === 0) return ""
    let groupsStr = ``
    groupsConfig.forEach(group => {
        if (group.regex) {
            groupsStr += `
            // ${group.title}
            const ${group.name}Regex = ${group.regex};
            const ${group.name}Proxies = config.proxies
                .filter((e) => ${group.isNegationReg ? '!' : ''}${group.name}Regex.test(e.name))
                .map((e) => e.name);
        `
        }
    });

    groupsStr += `groups.unshift(`
    groupsConfig.forEach(group => {
        let urlTest = `
        url: "https://www.gstatic.com/generate_204",
            interval: 120,
            tolerance: 30,
            timeout: 1000,
            lazy: true,
            hidden: ${group.proxies === 'allNode' ? 'all' : group.name}Proxies?.length === 0,`
        groupsStr += `
        {
            name: '${group.title}',
            type: '${group.type}',${group.regex ? `${urlTest}` : ''}
            proxies: ${group.proxies === 'allNode'
                ? 'allProxies'
                : group.proxies === 'myNode'
                    ? `${group.name + 'Proxies'}?.length ? ${group.name + 'Proxies'} : ['DIRECT']`
                    : group.proxies === 'selectGroup'
                        ? `['🚀 手动切换', '♻️ 自动选择'${group.name !== 'Node' ? `, '🎯 全球直连'` : ``}].concat([${allSelectProxies}].map(e => e.proxies?.length > 0 ? e.title : '').filter(e => !!e))`
                        : Array.isArray(group.proxies)
                            ? `[${group.proxies.map(e => `'${e}'`)}]`
                            : "['DIRECT']"}
        },
        `
    });
    groupsStr += `)`

    return groupsStr
}

module.exports = { createGroups }