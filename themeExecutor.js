const elements = {
    main: document.getElementById("body"),
    title: document.getElementById("pageTitle"),
    manuscript: document.getElementById("manuscript"),
    mainarea: document.getElementById("mainAreaRow"),
    panel: document.getElementById("panel"),
    generatebutton: document.getElementById("generateButton"),
    linenumbers: document.getElementById("lineNumbers"),
    editor: document.getElementById("textEditor")
}

const blueBerry = {
    main_background: "#0F0F19",
    editor_background: "#10101C",
    panel_background: "#10101C",
    mainarea_background: "#10101C",
    title_accent: "#CCCCFF",
    manuscript_accent: "#CCCCFF",
    generatebutton_accent: "#A0A0E5",    
    linenumbers_accent: "#9191F2",
    editor_accent: "#E5E5FF"
}

const justBlack = {
    main_background: "#000000",
    editor_background: "#000000",
    panel_background: "#000000",
    mainarea_background: "#000000",
    title_accent: "#E5E5E5",
    manuscript_accent: "#E5E5E5",
    generatebutton_accent: "#E5E5E5",    
    linenumbers_accent: "#B2B2B2",
    editor_accent: "#E5E5E5"
}

const justWhite = {
    main_background: "#E5E5E5",
    editor_background: "#E5E5E5",
    panel_background: "#E5E5E5",
    mainarea_background: "#E5E5E5",
    title_accent: "#0C0C0C",
    manuscript_accent: "#0C0C0C",
    generatebutton_accent: "#0C0C0C",    
    linenumbers_accent: "#262626",
    editor_accent: "#0C0C0C"
}

const greenOcean = {
    main_background: "#002D33",
    editor_background: "#003840",
    panel_background: "#003840",
    mainarea_background: "#003840",
    title_accent: "#ADD8CB",
    manuscript_accent: "#ADD8CB",
    generatebutton_accent: "#ADD8CB",    
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
}

document.addEventListener("DOMContentLoaded", () => {
    executeTheme()
})