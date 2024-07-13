// 去除空行正则
const blankLineReg = /^(?:\s*\r?\n)+/gm;
const endSpaceRegex = /\s*$/g;

// 去除注释正则
const commentReg = /^\s*;.*\n?$/gm;
const commentReg2 = /^\s*#.*\n?$/gm;

// 设置规则标志位
const rulesetsStr = `
;去广告：支持
;自动测速：支持
;微软分流：支持
;苹果分流：支持
;增强中国IP段：支持
;增强国外GFW：支持

;设置规则标志位
ruleset=🎯 全球直连,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/LocalAreaNetwork.list
ruleset=🎯 全球直连,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/UnBan.list
ruleset=🛑 广告拦截,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/BanAD.list
ruleset=🍃 应用净化,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/BanProgramAD.list
ruleset=📢 谷歌FCM,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Ruleset/GoogleFCM.list
ruleset=🎯 全球直连,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/GoogleCN.list
ruleset=🎯 全球直连,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Ruleset/SteamCN.list
ruleset=🔗 Ipv6,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Ruleset/Ipv6.list
ruleset=Ⓜ️ 微软Bing,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Bing.list
ruleset=Ⓜ️ 微软云盘,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/OneDrive.list
ruleset=Ⓜ️ 微软服务,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Microsoft.list
ruleset=🍎 苹果服务,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Apple.list
ruleset=📲 电报消息,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Telegram.list
ruleset=💬 OpenAi,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Ruleset/OpenAi.list
ruleset=🎮 游戏平台,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Ruleset/Epic.list
ruleset=🎮 游戏平台,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Ruleset/Origin.list
ruleset=🎮 游戏平台,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Ruleset/Sony.list
ruleset=🎮 游戏平台,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Ruleset/Steam.list
ruleset=🎮 游戏平台,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Ruleset/Nintendo.list
ruleset=📹 油管视频,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Ruleset/YouTube.list
ruleset=🎥 奈飞视频,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Ruleset/Netflix.list
ruleset=📺 哔哩哔哩,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Ruleset/BilibiliHMT.list
ruleset=📺 哔哩哔哩,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Ruleset/Bilibili.list
ruleset=🌏 国内媒体,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/ChinaMedia.list
ruleset=🌍 国外媒体,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/ProxyMedia.list
ruleset=🚀 节点选择,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/ProxyGFWlist.list
ruleset=🎯 全球直连,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/ChinaIp.list
ruleset=🎯 全球直连,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Ruleset/CNCustom.list
ruleset=🎯 全球直连,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/ChinaDomain.list
ruleset=🎯 全球直连,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/ChinaCompanyIp.list
ruleset=🎯 全球直连,https://raw.githubusercontent.com/SuNianjing/ACL4SSR/master/Clash/Download.list
`;

// 设置规则分组
/* 
title: 展示的分组名称
name: 规则分组名称 -> 正则处理过滤会依赖这个
type: 规则类型 -> select/url-test
isSelectGroup: 是否是分组
regex: 正则表达式 -> 正则处理过滤会依赖这个
proxies: 节点分组 -> allNode 全部节点 | selectGroup 选择分组 | myNode 选择当前匹配的节点 | 数组会直接使用
*/
const groupsConfig = [
    {
        title: "🚀 节点选择",
        name: "Node",
        type: "select",
        isNegationReg: true,
        isSelectGroup: true,
        proxies: "selectGroup",
    },
    {
        title: "🚀 手动切换",
        name: "all",
        type: "select",
        regex: /自动|故障|流量|官网|套餐|机场|订阅/,
        isNegationReg: true,
        proxies: 'allNode',
    },
    {
        title: "♻️ 自动选择",
        name: "Auto",
        type: "url-test",
        proxies: 'allNode',
    },
    {
        title: "🔗 Ipv6",
        name: "Ipv6",
        type: "select",
        proxies: "selectGroup",
    },
    {
        title: "📲 电报消息",
        name: "telegram",
        type: "select",
        proxies: "selectGroup",
    },
    {
        title: "💬 OpenAi",
        name: "openAi",
        type: "select",
        proxies: "selectGroup",
    },
    {
        title: "📹 油管视频",
        name: "youtube",
        type: "select",
        proxies: "selectGroup",
    },
    {
        title: "🌍 国外媒体",
        name: "ForeignMedia",
        type: "select",
        proxies: "selectGroup",
    },
    {
        title: "🌏 国内媒体",
        name: "DomesticMedia",
        type: "select",
        proxies: ["🎯 全球直连", "🇨🇳 台湾节点", "🇭🇰 香港节点"],
    },
    {
        title: "📺 哔哩哔哩",
        name: "Bilibili",
        type: "select",
        proxies: ["🎯 全球直连", "🇨🇳 台湾节点", "🇭🇰 香港节点"],
    },
    {
        title: "📢 谷歌FCM",
        name: "GoogleFCM",
        type: "select",
        proxies: "selectGroup",
    },
    {
        title: "Ⓜ️ 微软Bing",
        name: "MicrosoftBing",
        type: "select",
        proxies: "selectGroup",
    },
    {
        title: "Ⓜ️ 微软云盘",
        name: "MicrosoftCloud",
        type: "select",
        proxies: "selectGroup",
    },
    {
        title: "Ⓜ️ 微软服务",
        name: "MicrosoftServices",
        type: "select",
        proxies: "selectGroup",
    },
    {
        title: "🍎 苹果服务",
        name: "appleServices",
        type: "select",
        proxies: "selectGroup",
    },
    {
        title: "🎮 游戏平台",
        name: "GamePlatform",
        type: "select",
        proxies: "selectGroup",
    },
    {
        title: "🎥 奈飞视频",
        name: "NetflixVideo",
        type: "select",
        proxies: "selectGroup",
    },
    {
        title: "🐟 漏网之鱼",
        name: "other",
        type: "select",
        proxies: "selectGroup",
    },
    {
        title: "🇸🇬 狮城节点",
        name: "Singapore",
        type: "url-test",
        regex: /新加坡|sg|SG|Singapore|🇸🇬|Singapore|坡/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇯🇵 日本节点",
        name: "Japan",
        type: "url-test",
        regex: /日本|JP|Japan|🇯🇵|Tokyo|Osaka|霓虹|jp/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇰🇷 韩国节点",
        name: "Korea",
        type: "url-test",
        regex: /韩国|KR|kr|Kr|Korea|棒子|Korea|朝鲜/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇬🇧 英国节点",
        name: "UK",
        type: "url-test",
        regex: /英国|UK|uk|🇬🇧|Britain|britain|England|england|英格兰|不列颠/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇺🇲 美国节点",
        name: "America",
        type: "url-test",
        regex: /美国|US|United States|America|🇺🇸|Los Angeles|San Jose|Phoenix|洛杉矶|🇺🇸|凤凰城|us|UnitedStates/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇫🇷 法国节点",
        name: "France",
        type: "url-test",
        regex: /迪拜|FR|fr|Fr|France/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇩🇪 德国节点",
        name: "Germany",
        type: "url-test",
        regex: /德国|DE|de|De|Germany/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇨🇦 加拿大节点",
        name: "Canada",
        type: "url-test",
        regex: /加拿大|CA|ca|Ca|Canada/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇦🇺 澳大利亚节点",
        name: "Australia",
        type: "url-test",
        regex: /澳大利亚|AU|au|Au|袋鼠|Australia/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇲🇾 马来西亚节点",
        name: "Malaysia",
        type: "url-test",
        regex: /马来西亚|Malaysia|MY|my|My|Malaysia|马来/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇻🇳 越南节点",
        name: "Vietnam",
        type: "url-test",
        regex: /越南|VN|vn|Vn|Vietnam/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇵🇭 菲律宾节点",
        name: "Philippines",
        type: "url-test",
        regex: /菲律宾|PH|ph|hj|Philippines|菲佣/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇮🇩 印尼节点",
        name: "Indonesia",
        type: "url-test",
        regex: /印尼|ID|id|Id|Indonesia/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇹🇭 泰国节点",
        name: "Thailand",
        type: "url-test",
        regex: /泰国|TH|th|Th|大象|Thailand/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇮🇳 印度节点",
        name: "India",
        type: "url-test",
        regex: /印度|IN|in|In|阿三|India/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇵🇰 巴基斯坦节点",
        name: "Pakistan",
        type: "url-test",
        regex: /巴基斯坦|PK|pk|Pk|巴铁|Pakistan/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇦🇷 阿根廷节点",
        name: "Argentina",
        type: "url-test",
        regex: /阿根廷|AR|ar|Ar|Argentina/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇧🇷 巴西节点",
        name: "Brazil",
        type: "url-test",
        regex: /巴西|BR|br|Br|Brazil/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇳🇱 荷兰节点",
        name: "Netherlands",
        type: "url-test",
        regex: /荷兰|NL|nl|Nl|风车|Netherlands/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇷🇺 俄罗斯节点",
        name: "Russia",
        type: "url-test",
        regex: /俄罗斯|RU|ru|Ru|毛熊|Russia/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇹🇷 土耳其节点",
        name: "Turkey",
        type: "url-test",
        regex: /土耳其|TR|tr|Tr|Turkey/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇦🇪 迪拜节点",
        name: "Dubai",
        type: "url-test",
        regex: /迪拜|AE|Ae|ae|Dubai/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇨🇳 台湾节点",
        name: "Taiwan",
        type: "url-test",
        regex: /台湾|TW|Taiwan|🇹🇼|Taipei|台北/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🇭🇰 香港节点",
        name: "HongKong",
        type: "url-test",
        regex: /香港|HK|Hong Kong|🇭🇰/u,
        isSelectGroup: true,
        proxies: 'myNode',
    },
    {
        title: "🎯 全球直连",
        name: "GlobalDirect",
        type: "select",
        proxies: ["DIRECT", "🚀 节点选择", "♻️ 自动选择"],
    },
    {
        title: "🛑 广告拦截",
        name: "ADBlocking",
        type: "select",
        proxies: ["DIRECT", "REJECT"],
    },
    {
        title: "🍃 应用净化",
        name: "ApplicationPurification",
        type: "select",
        proxies: ["DIRECT", "REJECT"],
    }
] 

console.log(groupsConfig.map(i => i.title));

module.exports = {
    rulesetsStr,
    blankLineReg,
    endSpaceRegex,
    commentReg,
    commentReg2,
    groupsConfig,
}