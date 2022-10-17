const elements = {
    main: document.getElementById("body"),
    title: document.getElementById("pageTitle"),
    manuscript: document.getElementById("manuscript"),
    mainarea: document.getElementById("mainAreaRow"),
    panel: document.getElementById("panel"),
    generatebutton: document.getElementById("generateButton"),
    settinsmenu: document.getElementById("settingsMenu"),
    themelist: document.getElementById("themeList"),
    linenumbers: document.getElementById("lineNumbers"),
    editor: document.getElementById("textEditor")
}

const classes = {
    settingsspan: document.getElementsByClassName("settingsSpan"),
}

const images = {
    settingsbutton: document.getElementById("settingsButton"),
    exportbutton: document.getElementById("exportButton"),
}

const blueBerry = {
    main_background: "#0F0F19",
    editor_background: "#10101C",
    panel_background: "#10101C",
    settinsmenu_background: "#10101C",
    themelist_background: "#10101C",
    mainarea_background: "#10101C",
    title_accent: "#CCCCFF",
    manuscript_accent: "#CCCCFF",
    generatebutton_accent: "#A0A0E5",
    settingsspan_accent: "#9191F2",
    themelist_accent: "#E5E5FF",
    linenumbers_accent: "#9191F2",
    editor_accent: "#E5E5FF"
}

const justBlack = {
    main_background: "#000000",
    editor_background: "#000000",
    panel_background: "#000000",
    settinsmenu_background: "#000000",
    themelist_background: "#000000",
    mainarea_background: "#000000",
    title_accent: "#E5E5E5",
    manuscript_accent: "#E5E5E5",
    generatebutton_accent: "#E5E5E5",    
    settingsspan_accent: "#B2B2B2",
    themelist_accent: "#E5E5E5",    
    linenumbers_accent: "#B2B2B2",
    editor_accent: "#E5E5E5"
}

const justWhite = {
    main_background: "#E5E5E5",
    editor_background: "#E5E5E5",
    panel_background: "#E5E5E5",
    settinsmenu_background: "#E5E5E5",
    themelist_background: "#E5E5E5",
    mainarea_background: "#E5E5E5",
    title_accent: "#0C0C0C",
    manuscript_accent: "#0C0C0C",
    generatebutton_accent: "#0C0C0C",  
    settingsspan_accent: "#262626",
    themelist_accent: "#0C0C0C",
    linenumbers_accent: "#262626",
    editor_accent: "#0C0C0C"
}

const greenOcean = {
    main_background: "#002D33",
    editor_background: "#003840",
    panel_background: "#003840",
    settinsmenu_background: "#003840",
    themelist_background: "#003840",
    mainarea_background: "#003840",
    title_accent: "#ADD8CB",
    manuscript_accent: "#ADD8CB",
    generatebutton_accent: "#ADD8CB",    
    settingsspan_accent: "#008C72",
    themelist_accent: "#ADD8CB",
    linenumbers_accent: "#008C72",
    editor_accent: "#ADD8CB"
}

const themes = {
    "blueberry": blueBerry,
    "justblack": justBlack,
    "justwhite": justWhite,
    "greenocean": greenOcean,
}

function executeTheme(){
    let theme = themes[localStorage.getItem("settings_theme")]
    
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