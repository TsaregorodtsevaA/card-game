function createNumbersArray(count) {
  const numbersArray = [];
  for (i = 1; i <= count; i++) {
    numbersArray.push(i, i);
  }
  return numbersArray;
}

function shuffle (numbersArray) {
  for (let i = numbersArray.length - 1; i > 0; i--) {
    let randIndex = Math.floor(Math.random() * (i + 1));
    let tempNumber = numbersArray[randIndex];
    numbersArray[randIndex] = numbersArray[i];
    numbersArray[i] = tempNumber;
  }
  return numbersArray;
}

function numberOfCards() {
  const container = document.createElement('div');
  const h1 = document.createElement('h1');
  const chooseForm = document.createElement('form');
  const select = document.createElement('select');
  const startBtn = document.createElement('button');
  const chooseDescr = document.createElement('label');
  const opt1 = document.createElement('option');
  const opt2 = document.createElement('option');
  const opt3 = document.createElement('option');
  const opt4 = document.createElement('option');
  const opt5 = document.createElement('option');

  select.type = 'select';

  opt1.value = '2';
  opt2.value = '4';
  opt3.value = '6';
  opt4.value = '8';
  opt5.value = '10';

  h1.textContent = 'Пары';
  opt1.textContent = '4';
  opt2.textContent = '8';
  opt3.textContent = '12';
  opt4.textContent = '16';
  opt5.textContent = '20';


  document.body.append(container);
  container.append(h1);
  container.append(chooseForm);
  chooseForm.append(chooseDescr);
  chooseForm.append(select);
  chooseForm.append(startBtn);
  select.append(opt1);
  select.append(opt2);
  select.append(opt3);
  select.append(opt4);
  select.append(opt5);

  container.classList.add('container');
  h1.classList.add('h1');
  chooseForm.classList.add('form');
  chooseDescr.classList.add('form__descr');
  select.classList.add('form__select');
  startBtn.classList.add('btn');

  startBtn.textContent = 'Выбрать';
  chooseDescr.textContent = 'Выберите количество карточек';

  startBtn.addEventListener('click', () => {
    startGame(select.value);
    container.remove();
  }
)};

function startGame(count) {
  const h1 = document.createElement('h1');
  const cardsList = document.createElement('ul');
  const container = document.createElement('div');
  let timer = document.createElement('span');

  h1.textContent = 'Пары';
  let timerCount = 60;
  timer.textContent = `Осталось ${timerCount} секунд`;

  document.body.append(container);
  container.append(h1);
  container.append(cardsList);
  container.append(timer);


  container.classList.add('container');
  h1.classList.add('h1');
  cardsList.classList.add('cards-list');
  timer.classList.add('timer');

  let timerFunction = setInterval(() => {
    timer.textContent = `Осталось ${timerCount} секунд`;
    --timerCount;
    if(timerCount === 0) {
      clearInterval(timerFunction);
      container.remove();
      numberOfCards();
    }
  }, 1000)



  for (const number of shuffle( createNumbersArray(count))) {
    const card = document.createElement('li');
    cardsList.append(card);
    card.textContent = number;
    card.classList.add('cards-list__item');
    card.classList.add('animate__animated');

  }
  const chosenCards = [];
  let isActive = false;
  cardsList.addEventListener('click', function(event) {
    if (isActive) {
      return
    };
    const currentEl = event.target;
    currentEl.classList.add('animate__flipInY');
    if (currentEl !== cardsList) {
      currentEl.classList.add('opened');
      if (!chosenCards.includes(currentEl)) {
        chosenCards.push(currentEl);
      if (chosenCards.length % 2 === 0 && currentEl === chosenCards[chosenCards.length - 2]) {
        chosenCards.pop();
      }
       if (chosenCards.length % 2 === 0 && currentEl.textContent !== chosenCards[chosenCards.length - 2].textContent) {
        chosenCards.pop();
        isActive = true;
        setTimeout(() => {
        currentEl.classList.remove('opened');
        currentEl.classList.remove('animate__flipInY');
        chosenCards[chosenCards.length - 1].classList.remove('opened');
        chosenCards[chosenCards.length - 1].classList.remove('animate__flipInY');
        chosenCards.pop();
        isActive = false;
        }, 1000)
        };
      }
    }
    if (chosenCards.length === count * 2) {
      clearInterval(timerFunction);
      cardsList.remove();
      const congradulation = document.createElement('div');
      const congrText = document.createElement('h2');
      const img = document.createElement('img');
      const playAgain = document.createElement('button');

      img.src = 'img/trophy-svgrepo-com.svg';
      img.style = 'width: 150px';

      congradulation.classList.add('container');
      congradulation.classList.add('congradulation');
      playAgain.classList.add('btn');
      img.classList.add('congr-img');

      congrText.textContent = 'Поздравляем с победой!'
      playAgain.textContent = 'Играть снова';

      document.body.append(congradulation);
      congradulation.append(congrText);
      congradulation.append(img);
      congradulation.append(playAgain);

      playAgain.addEventListener('click', () => {
        container.remove();
        congradulation.remove();
        numberOfCards();
        });
    }
  })
}

numberOfCards();
