const input = document.querySelector('.game__input');
const message = document.querySelector('.game__message__robot');
const previous = document.querySelector('.game__message');
const btn = document.querySelector('.btn');

let city = [];
let cityRobot = ['амулет', 'анчоус', 'азбука', 'аптека', 'артист',
                'брат', 'брусника', 'белка', 'бегемот', 'булка'];

function hasDuplicates(array, city) {
    let temp = [...array];
    temp.push(city);
    return array.length !== new Set(temp).size;
}

function russianWord(word){
    let wordCheck = word.replace(/[^а-яёА-ЯЁ]/g, '')
    return word == wordCheck;
}

function checkingTheLetter(word){
    if (city.length >= 1){
        let elem = city[city.length - 1];
        if (elem[elem.length - 1] == 'ь' || elem[elem.length - 1] == 'ъ' || elem[elem.length - 1] == 'ы'){
            return elem[elem.length - 2] == word[0];
        } else {
            return elem[elem.length - 1] == word[0];
        }
    } else {
        return true;
    }
}

function robot(){
    message.textContent = 'Робот думает';

    setTimeout(function(){
        let letter = city[city.length - 1];
        if (letter[letter.length - 1] == 'ь' || letter[letter.length - 1] == 'ъ' || letter[letter.length - 1] == 'ы'){
            letter = letter[letter.length - 2];
        } else {
            letter = letter[letter.length - 1];
        }

        for (let el of cityRobot){
            if (el[0] == letter){
                if (!city.find(item => item == el)){
                    input.removeAttribute('readonly');
                    city.push(el.toLowerCase());
                    message.textContent = `Робот отвечает ${el}`;
                    previous.textContent = `Предыдущий ответ: ${el}`;
                    input.style.opacity = 1;
                    btn.style.opacity = 1;
                    return true;
                }
            } else {
                // проигрыш
                message.textContent = 'Ты победил!';
                document.querySelector('.player__input').style.display = 'none';
                message.style.fontSize = "2.5rem";
                setTimeout(function(){
                    window.location.href = "index.html";
                }, 2000);
            }
        }
    }, 2000);
}

function player(){
    if (hasDuplicates(city, input.value.toLowerCase())){
        if (russianWord(String(input.value.toLowerCase()))){
            if (checkingTheLetter(input.value.toLowerCase())){
                city.push(input.value.toLowerCase());
                previous.textContent = `Предыдущий ответ: ${input.value.toLowerCase()}`;
                input.value = '';
                input.style.opacity = 0;
                btn.style.opacity = 0;
                input.setAttribute('readonly', 'true');
                robot();
            } else {
                input.value = '';
                message.textContent = 'Первая буква неправильная';
            }
        } else {
            input.value = '';
            message.textContent = 'Напиши на русском языке';
        }
    } else {
        input.value = '';
        message.textContent = 'Это слово уже было';
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        player();
    }
});

btn.addEventListener('click', function(e){
    player();
});