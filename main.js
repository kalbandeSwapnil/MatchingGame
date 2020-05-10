var cardsArray = [
    {'name': 'CSS', 'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true',},
    {'name': 'HTML', 'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true',},
    {'name': 'jQuery', 'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true',},
    {'name': 'JS', 'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true',},
    {'name': 'Node', 'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true',},
    {'name': 'Photo Shop', 'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true',},
    {'name': 'PHP', 'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true',},
    {'name': 'Python', 'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true',},
    {'name': 'Ruby', 'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true',},
    {'name': 'Sass', 'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true',},
    {'name': 'Sublime', 'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true',},
    {'name': 'Wordpress', 'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true',},
];

var gameGrid = cardsArray.concat(cardsArray);

gameGrid.sort(() => 0.5 - Math.random());

var game = document.getElementById('game-board');

var grid = document.createElement('section');

grid.setAttribute('class', 'grid');

game.appendChild(grid);

for (var i = 0; i < gameGrid.length; i++) {
    createCard(i);
}


var firstGuess = '';
var secondGuess = '';
var previousClicked;
const delay = 500;

function match() {

    var selected = document.querySelectorAll('.selected');
    for (var i = 0; i < selected.length; i++) {
        selected[i].classList.add('matched')
    }

}

function createCard(i) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = gameGrid[i].name;


    var front = document.createElement('div');
    front.classList.add('front');

    var back = document.createElement('div');
    back.classList.add('back');

    back.style.backgroundImage = `url(${gameGrid[i].img})`;

    card.appendChild(front);
    card.appendChild(back);
    grid.appendChild(card);

}

function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    previousClicked = null;
    var selected = document.querySelectorAll('.selected');
    for (var i = 0; i < selected.length; i++) {
        console.log("selected" + selected[i]);
        selected[i].classList.remove('selected')
    }
    count = 0;
}

var count = 0;

grid.addEventListener('click', (event) => {
    var clicked = event.target;
    if (clicked.nodeName.toLowerCase() === 'section' || count >= 2 || clicked === previousClicked ||
        clicked.parentNode.classList.contains('matched') ||
        clicked.parentNode.classList.contains('selected')
    ) {
        return;
    }

    count++;
    if (count === 1) firstGuess = clicked.parentNode.dataset.name;
    else secondGuess = clicked.parentNode.dataset.name;
    clicked.parentNode.classList.add('selected');

    console.log("firstGuess " + firstGuess);
    console.log("secondGuess " + secondGuess);

    if (firstGuess !== '' && secondGuess !== '') {
        if (firstGuess === secondGuess) {
            setTimeout(match, delay);
            setTimeout(resetGuesses, delay);
        } else {
            setTimeout(resetGuesses, delay);
        }
    }

    previousClicked = clicked
});