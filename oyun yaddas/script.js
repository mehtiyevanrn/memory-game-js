let timerCount = document.querySelector(".time");
let moverCount = document.querySelector(".move");
let gameTable = document.querySelector("#tbl");
let second = 0;
let minutes = 0;
let moveCount = 0;
let winCount = 0;
let first = []
let last = [];
let img = [];
let memory = [0, 0, 0];
let memory2 = []

tableQur()
ekran()
setTimeout(() => {
    def()
}, 2000);
let timeGenerator = () => {
    second += 1;
    if (second >= 60) {
        minutes += 1;
        second = 0
    }
    let secondValue = second < 10 ? `0${second}` : second;
    let minuteValue = minutes < 10 ? `0${minutes}` : minutes;
    timerCount.innerHTML = `<span>Time:</span> ${minuteValue} : ${secondValue}`
}
let set = setInterval(() => {
    timeGenerator()
}, 1000);
let movesCount = () => {
    moveCount += 1;
    moverCount.innerHTML = `<span>Moves:</span> ${moveCount}`
}
function tableQur() {
    let k = 1;
    for (i = 0; i < 16; i++) {
        k = k > 8 ? 1 : k
        first[i] = k++
    }

    for (let i = 0; i < 4; i++) {
        last[i] = []
        img[i] = []
        memory2[i] = []
        for (let j = 0; j < 4; j++) {
            let rdm = Math.floor(Math.random() * first.length);
            last[i][j] = first[rdm];
            img[i][j] = first[rdm];
            first.splice(rdm, 1);
        }
    }
}
function ekran() {
    let tr = ''
    for (let i = 0; i < 4; i++) {
        tr += `<tr>`

        for (let j = 0; j < 4; j++) {
            tr += `<td><img onclick="Click(${i},${j})" id="a${i}${j}" src="img/${last[i][j]}.jpg"></td>`

        }
        tr += `</tr>`
    }
    gameTable.innerHTML = tr;
}
function def() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            last[i][j] = 0
        }
    }
    ekran()
}
function Click(i, j) {
    movesCount()
    last[i][j] = img[i][j];
    ekran();
    if (memory[2] == 0) {
        memory[0] = i;
        memory[1] = j;
        memory[2] = img[i][j];
    } else {
        if (memory[2] !== last[i][j]) {
            last[i][j] = 0;
            last[memory[0]][memory[1]] = 0;
            setTimeout(() => {
                ekran()
            }, 500);
        } else {
            memory2[i][j] = 1;
            memory2[memory[0]][memory[1]] = 1
        }
        memory[2] = 0;
    }
    setTimeout(() => {
        win()
    }, 200);
    deletee()
}

function win() {
    let count = 0
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (memory2[i][j] == 1) {
                count++
            }
        }
    }
    if (count == 16) {
        alert("uddun")
        clearInterval(set);
        tableQur()
        ekran()
        setTimeout(() => {
            def()
        }, 2000);
        second = 0;
        minutes = 0
        setInterval(() => {
            timeGenerator()
        }, 1000);
        moveCount = 0;
        movesCount()
    }
}
function deletee() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (memory2[i][j] == 1) {
                let id = document.getElementById(`a${i}${j}`)
                console.log(id);
                id.removeAttribute("onclick")
            }
        }
    }
}
