const img_1 = document.querySelectorAll('img')[0];
const img_2 = document.querySelectorAll('img')[1];

const table = document.querySelector('table');
const canvas = document.querySelector('canvas');
const scoreElem = document.querySelector('.score');

const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';

let gameOver = true;
let score = 0;

const player = {
  sprite: null,
  x: 100,
  y: 100,
  width: 80,
  height: 80,
  gravity: 0.15,
  ySpeed: 0,
  fall() {
    this.ySpeed += this.gravity;
    this.y += this.ySpeed;
  },
  setYSpeed(value) {
    this.ySpeed = value;
  },
  back() {
    this.sprite = null;
    this.x = 100;
    this.y = 100;
    this.ySpeed = 0;
  },
};

const barrier = {
  x: canvas.width,
  y: 0,
  width: 100,
  height: canvas.height,
  topSpace: null,
  botSpace: null,
  xSpeed: 5,
  setBar() {
    scoreElem.textContent = `Ваши очки: ${++score}`;
    this.x = canvas.width;
    this.topSpace = Math.random() * (canvas.height - 400) + 50;
    this.botSpace = this.topSpace + 200;
  },
  setSpace() {
    this.topSpace = Math.random() * (canvas.height - 400) + 50;
    this.botSpace = this.topSpace + 200;
  },
  moveBar() {
    if (this.x + this.width > 0) {
      this.x -= this.xSpeed;
    } else {
      this.setBar();
    }
  },
  back() {
    this.x = canvas.width;
    this.y = 0;
    this.topSpace = null;
    this.botSpace = null;
  },
};

const barrier_2 = {
  x: canvas.width * 1.5 + 50,
  y: 0,
  width: 100,
  height: canvas.height,
  topSpace: null,
  botSpace: null,
  xSpeed: 5,
  setBar() {
    scoreElem.textContent = `Ваши очки: ${++score}`;
    this.x = canvas.width;
    this.topSpace = Math.random() * (canvas.height - 400) + 50;
    this.botSpace = this.topSpace + 200;
  },
  setSpace() {
    this.topSpace = Math.random() * (canvas.height - 400) + 50;
    this.botSpace = this.topSpace + 200;
  },
  moveBar() {
    if (this.x + this.width > 0) {
      this.x -= this.xSpeed;
    } else {
      this.setBar();
    }
  },
  back() {
    this.x = canvas.width * 1.5 + 50;
    this.y = 0;
    this.topSpace = null;
    this.botSpace = null;
  },
};

const collision = () => {
  if (player.y >= 0 && player.y <= canvas.width) {
    if (
      player.x + player.width > barrier.x &&
      player.x < barrier.x + barrier.width
    ) {
      if (
        player.y >= barrier.topSpace &&
        player.y + player.height <= barrier.botSpace
      ) {
        return true;
      }
      return false;
    }

    if (
      player.x + player.width > barrier_2.x &&
      player.x < barrier_2.x + barrier_2.width
    ) {
      if (
        player.y >= barrier_2.topSpace &&
        player.y + player.height <= barrier_2.botSpace
      ) {
        return true;
      }
      return false;
    }

    return true;
  }

  return false;
};

const paint = () => {
  const { sprite, x, y, width, height } = player;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(barrier.x, barrier.y, barrier.width, barrier.height);
  ctx.clearRect(
    barrier.x,
    barrier.topSpace,
    barrier.width,
    barrier.botSpace - barrier.topSpace
  );
  ctx.fillRect(barrier_2.x, barrier_2.y, barrier_2.width, barrier_2.height);
  ctx.clearRect(
    barrier_2.x,
    barrier_2.topSpace,
    barrier_2.width,
    barrier_2.botSpace - barrier_2.topSpace
  );
  ctx.drawImage(sprite, x - 12, y - 12, width + 24, height + 24);
  if (gameOver) return;
  requestAnimationFrame(paint);
};

const calculate = (timer) => {
  player.fall();
  barrier.moveBar();
  barrier_2.moveBar();
  if (!collision()) {
    gameOver = true;
    clearInterval(timer);
    player.back();
    barrier.back();
    barrier_2.back();
    score = 0;
    scoreElem.textContent = `Ваши очки: ${score}`;
    canvas.style.display = 'none';
    table.style.display = 'table';
  }
};

const startGame = (face) => {
  const sprite = new Image();
  sprite.src = face;
  sprite.onload = () => {
    console.log('Спрайт загружен');
    player.sprite = sprite;
    barrier.setSpace();
    barrier_2.setSpace();
    gameOver = false;
    canvas.addEventListener('click', () => {
      console.log('клик');
      player.setYSpeed(-5);
    });
    const timer = setInterval(() => {
      calculate(timer);
    }, 10);
    requestAnimationFrame(paint);
  };
};

img_1.addEventListener('mouseover', () => {
  img_1.setAttribute('src', './assets/happy.svg');
  img_2.setAttribute('src', './assets/sad.svg');
});

img_1.addEventListener('mouseout', () => {
  img_1.setAttribute('src', './assets/sad.svg');
  img_2.setAttribute('src', './assets/happy.svg');
});

img_1.addEventListener('click', () => {
  alert('dadasdas');
  table.style.display = 'none';
  canvas.style.display = 'block';
  startGame('./assets/happy.svg');
});

img_2.addEventListener('mouseover', () => {
  img_1.setAttribute('src', './assets/happy.svg');
  img_2.setAttribute('src', './assets/sad.svg');
});

img_2.addEventListener('mouseout', () => {
  img_1.setAttribute('src', './assets/sad.svg');
  img_2.setAttribute('src', './assets/happy.svg');
});

img_2.addEventListener('click', () => {
  alert('dadasdas');
  table.style.display = 'none';
  canvas.style.display = 'block';
  startGame('./assets/sad.svg');
});

// imgs.forEach((e) => {
//   let imgover, imgout, text, face;
//   if (e.id === 'first-img') {
//     imgover = './assets/happy.svg';
//     imgout = './assets/sad.svg';
//     text = 'Вы сделали лицо счастливым! Теперь вы будете играть за него!';
//     face = './assets/happy.svg';
//   } else if (e.id === 'second-img') {
//     imgover = './assets/sad.svg';
//     imgout = './assets/happy.svg';
//     text = 'Вы сделали лицо несчастным! Теперь вы будете играть за него!';
//     face = './assets/sad.svg';
//   }
//   e.addEventListener('mouseover', () => {
//     e.setAttribute('src', imgover);
//   });
//   e.addEventListener('mouseout', () => {
//     e.setAttribute('src', imgout);
//   });
//   e.addEventListener('click', () => {
//     alert(text);
//     table.style.display = 'none';
//     canvas.style.display = 'block';
//     startGame(face);
//   });
// });
