let english_word = document.getElementById("english-word");
let hungarian_input = document.getElementById("hungarian-word");
hungarian_input.addEventListener("keydown",event => {
    if (event.keyCode === 13) {
        submitButton.click();
    }
});
let submitButton = document.getElementById("submit_button");
let user_feedback = document.getElementById("user-feedback")
submitButton.addEventListener("click",CheckEquality);

let words = {};
let score = 0;  
let hungarian_word = "";

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let data = xmlhttp.responseText.slice(0,-1);
    let pairs = data.split(";");
    for (const pair of pairs) {
      let word = pair.split("-");
      words[word[0]] = word[1];
    }
    SetEnglishname();
  }
};




xmlhttp.open("GET","/data.php",true);
xmlhttp.send();


function SetEnglishname() {
  if(Object.keys(words).length < 1){
    user_feedback.innerText = "Congrats you won! " + "Your score is: " + score + " points!";
    user_feedback.style.color = "green"
    submitButton.disabled = true;
    hungarian_input.value = ""
    return;
  }
  let key=Object.keys(words)[getRandomInt()];
  hungarian_word = words[key];
  english_word.innerHTML = key;
  delete words[key]
  hungarian_input.value = ""
  hungarian_input.focus();

}

function SetBackTimer(){
  seconds -= 3;
  if (seconds < 3) seconds = 0;
  ShowTime();
}

function CheckEquality() {
  if(hungarian_input.value == hungarian_word){
    score++;
    SetEnglishname();
    SetBackTimer();
  }
  else{

    End();
  }
}


function End(){
  user_feedback.style.color = "red"
  user_feedback.innerText = "You failed :( the correct answer was " + hungarian_word + "! Your score is: " + score + " points!";
  submitButton.disabled = true;
  hungarian_input.value = "";
  clearInterval(timerInterval);
  timerInterval = null;
}

function getRandomInt() {
  let nbrOfKeys = Object.keys(words);
  if(nbrOfKeys.length == 1) return 0;
  let valami;
  do {
    valami = (Math.floor(Math.random() * nbrOfKeys.length - 1));
  } while (valami < 0);
  return valami
}
 let timerInterval;
 let seconds = 0;
 let minutes = 0;
 const timerDisplay = document.getElementById('timer');
 timerInterval = setInterval(updateTimer, 1000)
 function updateTimer() {
     seconds++;
     if (seconds === 60) {
         seconds = 0;
         minutes++;
     }

     if (minutes == 1) {
        End();
     }
     ShowTime();
 }


 function ShowTime(){
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

 }