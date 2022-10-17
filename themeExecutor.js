const elements = {
    main: document.getElementById("body"),
    title: document.getElementById("pageTitle"),
    manuscript: document.getElementById("manuscript"),
    mainarea: document.getElementById("mainAreaRow"),
    panel: document.getElementById("panel"),
    generatebutton: document.getElementById("generateButton"),
    settinsmenu: document.getElementById("settingsMenu"),
    themelist: document.getElementById("themeList"),
    clownmodechbx: document.getElementById("clownModeChBx"),
    linenumbers: document.getElementById("lineNumbers"),
    editor: document.getElementById("textEditor")
}

const classes = {
    settingsfield: document.getElementsByClassName("settingsField"),
    settingsspan: document.getElementsByClassName("settingsSpan"),
}

const images = {
    settingsbutton: document.getElementById("settingsButton"),
    exportbutton: document.getElementById("exportButton"),
}

const themeTemplate = {
    main_background: 1,
    editor_background: 2,
    panel_background: 3,
    settinsmenu_background: 4,
    settinsfield_background: 5,
    themelist_background: 6,
    mainarea_background: 7,
    title_accent: 8,
    manuscript_accent: 9,
    generatebutton_accent: 10,
    settingsspan_accent: 11,
    themelist_accent: 12,
    clownmodechbx_accent: 13,
    linenumbers_accent: 14,
    editor_accent: 15
}

const blueBerry = {
    1: "#0F0F19",
    2: "#10101C",
    3: "#10101C",
    4: "#10101C",
    5: "#10101C",
    6: "#10101C",
    7: "#10101C",
    8: "#CCCCFF",
    9: "#CCCCFF",
    10: "#A0A0E5",
    11: "#9191F2",
    12: "#E5E5FF",
    13: "#E5E5FF",
    14: "#9191F2",
    15: "#E5E5FF"
}

const justBlack = {
    1: "#000000",
    2: "#000000",
    3: "#000000",
    4: "#000000",
    5: "#000000",
    6: "#000000",
    7: "#000000",
    8: "#E5E5E5",
    9: "#E5E5E5",
    10: "#E5E5E5",    
    11: "#B2B2B2",
    12: "#E5E5E5",    
    13: "#E5E5E5",  
    14: "#B2B2B2",
    15: "#E5E5E5"
}

const justWhite = {
    1: "#E5E5E5",
    2: "#E5E5E5",
    3: "#E5E5E5",
    4: "#E5E5E5",
    5: "#E5E5E5",
    6: "#E5E5E5",
    7: "#E5E5E5",
    8: "#0C0C0C",
    9: "#0C0C0C",
    10: "#0C0C0C",  
    11: "#262626",
    12: "#0C0C0C",
    13: "#0C0C0C",
    14: "#262626",
    15: "#0C0C0C"
}

const greenOcean = {
    1: "#002D33",
    2: "#003840",
    3: "#003840",
    4: "#003840",
    5: "#003840",
    6: "#003840",
    7: "#003840",
    8: "#ADD8CB",
    9: "#ADD8CB",
    10: "#ADD8CB",    
    11: "#008C72",
    12: "#ADD8CB",
    13: "#ADD8CB",
    14: "#008C72",
    15: "#ADD8CB"
}

const themes = {
    "blueberry": blueBerry,
    "justblack": justBlack,
    "justwhite": justWhite,
    "greenocean": greenOcean,
}

function executeTheme(){
    let theme = themes[localStorage.getItem("settings_theme")]
    for(const [key, value] of Object.entries(theme)){
        theme.key = themeTemplate[value]
    }

    console.log(theme)

    for(const [key, value] of Object.entries(elements)){
        if(theme[`${key}_background`]){
            value.style.backgroundColor = theme[`${key}_background`]
        }
        if(theme[`${key}_accent`]){
            value.style.color = theme[`${key}_accent`]
        }
    }
    for(const [key, value] of Object.entries(classes)){
        for(let i = 0; i < value.length; i++){
            if(theme[`${key}_background`]){
                value[i].style.backgroundColor = theme[`${key}_background`]
            }
            if(theme[`${key}_accent`]){
                value[i].style.color = theme[`${key}_accent`]
            }
        }
    }
    for(const [key, value] of Object.entries(images)){
        value.setAttribute("src", "resources/" + key + "-" + localStorage.getItem("settings_theme") + ".png")
    }
}