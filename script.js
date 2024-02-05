const btns = document.querySelectorAll(".btn");
const restart = document.querySelector(".restart");
const winningSign = document.querySelector(".winningSign");

const clicked = [] // Array to store buttons clicked
const scores = [0, 0, 0] // Array to store scores
let activePlayer = 1

restart.addEventListener("click", function(){ // Function to restart the values and game BUT the score is still
  activePlayer = 1;
  clicked.splice(0, clicked.length);
  restart.style.display = "none";
  document.querySelector(".block").style.display = "none";
  winningSign.innerHTML = "";
  for (let i of btns){
    i.classList.remove("x");
    i.classList.remove("o");
  }
})

function block(){ // Function to block the gameplay
  restart.style.display = "block";
  document.querySelector(".block").style.display = "block";
}

function check(a, b, c, sign){ // Checks if a game solution is made
  if (btns[a].classList.contains(sign) && btns[b].classList.contains(sign) && btns[c].classList.contains(sign)){
    if (sign === "x"){
      scores[1] += 1;
      document.querySelector(".score-1").innerHTML = scores[1];
      winningSign.innerHTML = "Player 1 wins!";
      block();
    } else if (sign === "o"){
      scores[2] += 1;
      document.querySelector(".score-2").innerHTML = scores[2];
      winningSign.innerHTML = "Player 2 wins!";
      block();
    }
    playAudio('./assets/win.mp3', 1500)
  }
}

function checkAll(a, b, c, d, e, f, g, h, i,  signOne, signTwo){ // Takes all the possible solutions and tries them
  check(a, b, c, signOne);
  check(a, b, c, signTwo);
  check(d, e, f, signOne);
  check(d, e, f, signTwo);
  check(g, h, i, signOne);
  check(g, h, i, signTwo);
  check(a, d, g, signOne);
  check(a, d, g, signTwo);
  check(b, e, h, signOne);
  check(b, e, h, signTwo);
  check(c, f, i, signOne);
  check(c, f, i, signTwo);
  check(a, e, i, signOne);
  check(a, e, i, signTwo);
  check(c, e, g, signTwo);
  check(c, e, g, signOne);
}

function checkDraw(){ // Checks if a draw
  if (clicked.length === 9){
    scores[0] += 1;
    document.querySelector(".score-0").innerHTML = scores[0];
    winningSign.innerHTML = "Draw!";
    block();
    playAudio("./draw.mp3")
  }
}

for (let i of btns){ // Combines everything before and happens whenever we click any button
  i.addEventListener("click", function(){
    if (activePlayer === 1 && i.classList.contains("x") == false && i.classList.contains("o") == false){
    clicked.push(1);
    i.classList.add("x");
    activePlayer = 2;
    } else if (activePlayer === 2 && i.classList.contains("x") === false && i.classList.contains("o") == false){
    clicked.push(1);
    i.classList.add("o");
    activePlayer = 1;
    }
    playAudio('./assets/click.wav', 150)
    checkAll(0, 1, 2, 3, 4, 5, 6, 7, 8, "x", "o");
    checkDraw();
  })
}

function playAudio(link, timeout){
  const audio = new Audio(link);
  audio.play();
  setTimeout(() => {
    audio.pause();
  }, timeout);
}