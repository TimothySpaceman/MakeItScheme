const mainArea = document.querySelector("#mainArea")
const lineNumbers = document.querySelector("#lineNumbers")
const textEditor = document.querySelector("#textEditor")

const defaultText = `Вітаємо у Make It Scheme!

Даний сервіс генеруватиме блок-схему з опису алгоритму, який ти писатимеш в дане поле. Сюди ти можеш писати все, що завгодно, але генератор сприйматиме лише цікаві йому об'єкти. 

Більш-детальну інструкцію і синтаксис ти можеш знайти у Вікі.
Щоб потрапити у Вікі, натисни книжечку в лівому верхньому кутку.

Створені тут блок-схеми ти можеш експортувати за допомогою кнопки справа зверху.

Наразі тримай приклад блок-схеми. Приємного користування!

Початок

Вводимо age

Умова age > 18
Так:
    Виводимо "Ви повнолітній!"
...
Ні:
    Виводимо "Ви не повнолітній!"
...

Кінець
`

const statuses = {
    DEFAULT: 0,
    FIND_YES: 1,
    FIND_NO: 2,
    PACK_YES: 3,
    PACK_NO: 4
}

const keyCodes = {
    ctrl: 17,
    z: 90,
    y: 89
}

const directions = {
    UP: 1,
    DOWN: -1
}

const types = {
    "Початок": "start",
    "Кінець": "finish",
    "Вводимо": "input",
    "Виводимо": "output",
    "Виконуємо": "action",
    "Умова": "condition",
    "Так:": "yes",
    "Ні:": "no",
    "...": "end",

    includes: function() {
        Array.from(arguments).forEach(prop => {
            if (Object.getOwnPropertyNames(this).includes(prop)) {
                return true
            }
        })
    }
}

const defaults = {
    theme: "blueberry",
    clownmode: -1
}

let isCtrlPressed = 0

class Settings {
    constructor() {
        this.data = defaults
        this.load()

        this.button = document.getElementById("settingsButton")
        this.menu = document.getElementById("settingsMenu")

        this.controls = {
            themeList: document.getElementById("themeList")
        }

        this.button.setAttribute("onclick", `settings.toggleMenu()`)
    }

    update(){
        if(this.data.theme != this.controls.themeList.value){
            this.set("theme", this.controls.themeList.value)
        }
        this.save()
        executeTheme()
    }

    set(parameter, value){
        this.data[parameter] = value
    }

    reset(){
        this.data = defaults
        this.save()
    }

    save(){
        for(const [key, value] of Object.entries(this.data)){
            localStorage.setItem(`settings_${key}`, value)
        }   
    }

    load(){
        for(const [key, value] of Object.entries(this.data)){
            if(localStorage.getItem(`settings_${key}`)){
                this.data[key] = localStorage.getItem(`settings_${key}`)
            } else {
                this.reset()
                break
            }
        } 
    }

    toggleMenu(){
        if(this.menu.getAttribute("class") == "menuHide"){
            this.menu.setAttribute("class", "settingsMenuShow")
        } else {
            this.menu.setAttribute("class", "menuHide")
        }
    }
}

class Tree {
    constructor() {
        this.snapshot = []
        this.snapshotIndex = -1
        this.lines = []
    }

    grow() {
        this.elements = []
        this.initStats()
        this.createSnapshot()
        this.parseText()

        this.lines.forEach((line, index) => {
            if (line && types[line.type]) {
                if ((this.stats.start == 1 || types[line.type] == "start") && this.stats.finish == 0) {
                    this.elements.push(new Node({
                        type: types[line.type],
                        id: this.elements.length,
                        line: index + 1,
                        text: line.text,
                        child: []
                    }))

                    this.stats[types[line.type]] += 1
                }
            }
        })
    }

    initStats() {
        this.stats = {}

        Object.values(types).filter(el => typeof(el) === "string").forEach(stat => {
            this.stats[stat] = 0
        })
    }

    parseText() {
        this.lines = []
        this.snapshot[this.snapshotIndex].split(/\r?\n/).forEach((line) => {
            this.lines.push(new Line(line.trim()))
        })
        textEditor.innerHTML = this.snapshot[this.snapshotIndex]
    }

    createSnapshot() {
        this.snapshot.push(textEditor.value)
        this.snapshotIndex = this.snapshot.length - 1
        localStorage.setItem("editor_text", textEditor.value)
    }

    changeSnapshot(direction) {
        if (direction === directions.UP && this.snapshotIndex < this.snapshot.length - 2) {
            this.snapshotIndex += 1
        } else if (direction === directions.DOWN && this.snapshotIndex > 0) {
            this.snapshotIndex -= 1
        } else {
            throw 'Wrong snapshot direction'
        }

        this.grow()
    }

    clearChild() {
        this.elements.forEach(el => el.clearChild())
    }

    processChild() {
        let condition = []
        let yesEnd = []
        let dots = 0
        let status = []

        for (let i = 0; i < this.elements.length; i += 1) {
            if (this.elements[i].type == types["Умова"]) {
                condition.push(i)
                status.push(statuses["FIND_YES"])
            } else if (this.elements[i].type == types["Так:"] && status[status.length - 1] == statuses["FIND_YES"]) {
                dots += 1

                this.elements[condition[condition.length - 1]].child[0] = i

                status[status.length - 1] = statuses["PACK_YES"]
                this.elements[i].child[0] = i + 1
            } else if (this.elements[i].type == types["Ні:"] && status[status.length - 1] == statuses["FIND_NO"]) {
                dots += 1

                this.elements[condition[condition.length - 1]].child[1] = i

                status[status.length - 1] = statuses["PACK_NO"]
                this.elements[i].child[0] = i + 1
            } else if (this.elements[i].type == types["..."]) {
                dots -= 1

                if (status[status.length - 1] == statuses["PACK_YES"]) {
                    status[status.length - 1] = statuses["FIND_NO"]
                    yesEnd.push(i)
                } else if (status[status.length - 1] == statuses["PACK_NO"]) {
                    status.splice(status.length - 1, 1)

                    this.elements[i].child[0] = i + 1
                    this.elements[yesEnd[yesEnd.length - 1]].child[0] = i + 1

                    yesEnd.splice(yesEnd.length - 1, 1)
                    condition.splice(condition.length - 1, 1)
                }
            } else {
                this.elements[i].child[0] = i + 1
            }
        }

        for (let i = 0; i < this.stats.end; i += 1) {
            this.clearService()
        }
    }

    clearService() {
        for (let i = 0; i < this.elements.length - 1; i += 1) {
            for (let childInd = 0; childInd < this.elements[i].child.length; childInd += 1) {
                if (["yes", "no", "end"].includes(tree.elements[tree.elements[i].child[childInd]].type)) {
                //if(tree.elements[tree.elements[i].child[childInd]].type == types["Так:"] || tree.elements[tree.elements[i].child[childInd]].type == types["Ні:"] || tree.elements[tree.elements[i].child[childInd]].type == types["..."]){
                //    console.log("ID: " + this.elements[i].id + " Child " + childInd)
                    this.elements[i].child[childInd] = this.elements[this.elements[i].child[childInd]].child[0]
                    break
                }
            }
        }
    }

    checkChild() {
        this.elements.forEach((object) => {
            console.log("ID: " + object.id + " Child: " + object.child)
        })
    }
}


class Node {
    constructor({ type, line, id, text }) {
        this.type = type
        this.line = line
        this.id = id
        this.text = text

        this.child = []
    }

    clearChild() {
        this.child.splice(0, this.child.length)
    }
}

class Line {
    constructor(line) {
        this.type = line.split(" ")[0]      

        if (["Вводимо", "Виводимо"].includes(this.type)) {
            this.text = line
        } else {
            this.text = line.split(" ").slice(1).join(" ")
        }
    }
}


let tree = new Tree()
let settings = new Settings("settingsButton", "settingsMenu")


function updateEditor() {
    lineNumbers.innerHTML =""

    let mainAreaHeight = ((textEditor.clientHeight - 5) / 23.75).toFixed(0)

    for (let i = 1; i <= mainAreaHeight; i += 1) {
        lineNumbers.innerHTML += `${i}<br>`
    }

    textEditor.style.height = "1px"
    textEditor.style.height = `${textEditor.scrollHeight}px`
}

["keyup", "keydown", "mousemove"].forEach((el) => {
    window.addEventListener(el, () => {
        updateEditor()
        settings.update()
    })
})

window.addEventListener("keydown", (event) => {
    if (event.keyCode == keyCodes.ctrl) {    
        isCtrlPressed = 1
    }

    if (isCtrlPressed && event.keyCode == keyCodes.z) {    
        if (isCtrlPressed == 1) {
            try {
                tree.changeSnapshot(directions.DOWN)
            } catch {}
        }
    }

    if (isCtrlPressed && event.keyCode == keyCodes.y) {    
        if (isCtrlPressed == 1) {
            tree.changeSnapshot(directions.UP)
        }
    }

    if (isCtrlPressed == 0) {
        tree.createSnapshot()
    }
}) 

window.addEventListener("keyup", (event) => {
    if (event.keyCode == keyCodes.ctrl) {    
        isCtrlPressed = 0
    }
}) 

function mainLoop() {
    updateEditor()
    requestAnimationFrame(mainLoop)
}

if (localStorage.getItem("editor_text")) {
    textEditor.value = localStorage.getItem("editor_text")
} else {
    localStorage.setItem("editor_text", defaultText)
    textEditor.value = defaultText
}
tree.grow()
tree.clearChild()
tree.processChild()


function goo() {
    tree.grow()
    tree.clearChild()
    tree.processChild()
}
