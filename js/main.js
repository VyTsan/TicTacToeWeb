const resBtnEle = document.querySelector('button');
const resultEle = document.querySelector('#result');

let tieEnd = [
  'Nhận lì xì tết Techcombank 1903 6569 1630 19 TSAN NGOC VUONG VY',
  'Có thể thấy được khát khao chiến thắng của bạn',
  'Đánh với máy cũng giống như yêu đơn phương vậy.. Bạn không thể thắng',
  'Sự nỗ lực của bạn đã được ghi nhận',
  'Đánh với máy cũng giống như yêu đơn phương vậy.. Bạn không thể thắng',
  'Có nút giảm độ khó không nhỉ?',
  'Đánh với máy cũng giống như yêu đơn phương vậy.. Bạn không thể thắng',
  'Có nút giảm độ khó không nhỉ?',
  'Kiện tướng cờ tíc tắc tô',
  'Sự nỗ lực của bạn đã được ghi nhận'
];
let lostEnd = [
  'Nhục nhã... Bạn đã thua bot...',
  'Thờ ua',
  'Không cần nhìn cũng biết ai thua',
  'Nhục nhã... Bạn đã thua bot...',
  'Thất bại là bà ngoại thành công',
  'Nhục nhã... Bạn đã thua bot...',
  'Nghe nói con người là loài thông minh nhất hành tinh',
  'Thất bại là bà ngoại thành công',
  'Thất bại là bà ngoại thành công',
  'Nhục nhã... Bạn đã thua bot...'
];

function humiliateHuman() {
  let random = Math.floor(Math.random() * 10);
  if (winner == 'tie') {
    resultEle.innerText = '(HÒA) ' + tieEnd[random];
  } else if (winner == human) {
    resultEle.innerText = '(THẮNG) Ơ... Hack đúng không??';
  } else { 
    resultEle.innerText = lostEnd[random];
  }
}

resBtnEle.addEventListener('click', () => {
  resBtnEle.classList.remove('sexy');
  isGameEnded = false;
  isBotThinking = false;
  clearTimeout(thinkTimeOut);
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  drawBoard();
  if (isHumanX) {
    isHumanX = false;
    ai = players[0];
    human = players[1];
    currentPlayer = ai;
  } else {
    isHumanX = true;
    ai = players[1];
    human = players[0];
    currentPlayer = human;
  }
  if (isHumanX) {
    scores.X = -100;
    scores.O = 100;
  } else {
    scores.X = 100;
    scores.O = -100;
  }
  if (currentPlayer == human) {
    resultEle.innerText = `Đến lượt bạn (${human})`;
  } else {
    resultEle.innerText = `Đến lượt AI (${ai})`;
    bestMove();
  }
  loop();
})