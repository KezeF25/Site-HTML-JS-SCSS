const square = document.querySelectorAll('#square');
const startGameBtn = document.querySelector('.btn__startGame');
const inputWinSquare = document.querySelector('.input__winSquare');
const inputTime = document.querySelector('.input__time');
const table = document.querySelector('.main__table');
const winLose = document.querySelector('.win__lose');
let lock = true;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let timer;

function clock(){
    timer = setInterval(function(){
        inputTime.value = Number(inputTime.value) - 1;
        if (Number(inputTime.value) == 0){
            clearGame();
            inputWinSquare.value = squareWin;
            inputTime.value = time;
            winLose.classList.add('win__lose__activate');
            winLose.textContent = 'Поражение';
        }
    }, 1000);
}


function startGame(win, time){

    if (lock){

        clock();

        winLose.classList.remove('win__lose__activate');
        winLose.textContent = '';

        square.forEach(elem => {
            elem.className = '';
            elem.classList.add('main__square');
        });
    
        inputWinSquare.setAttribute('readonly', true);
        inputWinSquare.classList.add('input__lock');
        inputTime.setAttribute('readonly', true);
        inputTime.classList.add('input__lock');
        let arrWin = [];
        lock = false;
    
        while (Array.from(new Set(arrWin)).length < win){ 
            let randomNumber = getRandomInt(0, 99);
            arrWin.push(randomNumber);
        }
    
        for (item of arrWin){
            square[item].classList.add('square__win');
        }
    }
    else{
        clearGame();
        inputWinSquare.value = win;
        inputTime.value = time;
    }
}

function clearGame(){
    square.forEach(elem => {
        elem.className = 'close';
    });
    lock = true;
    inputWinSquare.removeAttribute('readonly');
    inputWinSquare.classList.remove('input__lock');
    inputTime.removeAttribute('readonly');
    inputTime.classList.remove('input__lock');
    clearInterval(timer);    
}

square.forEach(elem => {
    elem.addEventListener('click', function(){
        if (!lock){
            if (this.classList.contains('square__win')){
                this.classList.add('square__green');
                inputWinSquare.value = Number(inputWinSquare.value) - 1;
                if (Number(inputWinSquare.value) == 0){
                    clearGame();
                    inputWinSquare.value = squareWin;
                    inputTime.value = time;
                    winLose.classList.add('win__lose__activate');
                    winLose.textContent = 'Победа';
                }
            }
            else{
                this.classList.add('square__red');
            }
        }
    });
});

let squareWin;
let time;

startGameBtn.addEventListener('click', function(){
    if (lock){
        squareWin = inputWinSquare.value;
        time = inputTime.value;
    }
    startGame(squareWin, time);
})