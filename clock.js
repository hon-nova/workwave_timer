const sessionLength = document.getElementById("session-length");
const sessionLengthContent = sessionLength.textContent;

const timeLeft = document.getElementById("time-left");

const breakLength = document.getElementById("break-length");
const breakLengthContent = breakLength.textContent;

let sessionN = Number(sessionLengthContent);
let breakN = Number(breakLengthContent);
// let minutes = Math.floor(sessionN%60)
// let seconds =Math.floor(minutes/60)
let totalSeconds = sessionN * 60;
let minutes = totalSeconds / 60;
let seconds = totalSeconds % 60;
let formatSeconds = seconds < 10 ? `0${seconds}` : seconds;

timeLeft.innerHTML = `${minutes <10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

const onIncrease = () => {
  if (sessionN < 60) {
    sessionN += 1;
    sessionLength.innerHTML = `${sessionN}`;

    let totalSeconds = sessionN * 60;
    let minutes = totalSeconds / 60;
    let seconds = totalSeconds % 60;
    timeLeft.innerHTML = `${minutes <10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
};
const onDecrease = () => {
  if (sessionN > 1) {
    sessionN -= 1;
    sessionLength.innerHTML = `${sessionN}`;

    let totalSeconds = sessionN * 60;
    let minutes = totalSeconds / 60;
    let seconds = totalSeconds % 60;

    timeLeft.innerHTML = `${minutes <10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
};
const onIncreaseBreak = () => {
  if (breakN < 60) {
    breakN += 1;
    breakLength.innerHTML = `${breakN}`;
  }
};
const onDecreaseBreak = () => {
  if (breakN > 1) {
    breakN -= 1;
    breakLength.innerHTML = `${breakN}`;
  }
};
let intervalId;
let isCountingDown =false;

const startCountDown = () => {
  
   if(!isCountingDown){
      let totalSeconds = sessionN * 60; // Convert minutes to seconds

      intervalId = setInterval(() => {
          if (totalSeconds >= 0) {
              let minutes = Math.floor(totalSeconds / 60);
              let seconds = totalSeconds % 60;
   
              timeLeft.innerHTML = `${minutes <10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
              
              totalSeconds -= 1; // Decrease totalSeconds by 1
          } else {
              clearInterval(intervalId);
              console.log("Countdown finished!");
              // Play audio
              const audio = document.getElementById("beep");
              audio.play();
              setTimeout(()=>{
              
              startBreakCountDown();
              },5000)
             
            
          }
      }, 1000);
      isCountingDown = true
   } else {
      clearInterval(intervalId);
      isCountingDown =false;
   }
   
};
const onReset = ()=>{
   sessionLength.innerHTML = sessionLengthContent;
   breakLength.innerHTML = breakLengthContent
   timeLeft.innerHTML = `${minutes <10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
   timerLabel.textContent = 'Session';
   timerLabel.style.color = 'black';
   timeLeft.style.border='2px solid #d0d0d5'

   //any interval is running
   clearInterval(intervalId);

   //audio
   const audio = document.getElementById("beep");  
   audio.pause();
   audio.currentTime = 0;


}
let timerLabel= document.getElementById('timer-label')
// let sessionLabelContent =sessionLabel.textContent
// let timeLeft =document.getElementById('time-left')

const startBreakCountDown = () => {
  
   let totalSeconds = breakN * 60; 
  
   timerLabel.textContent = 'BREAK TIME';
   timerLabel.style.color = 'red';
   timeLeft.style.border='2px solid red'
 

   intervalId = setInterval(() => {
       if (totalSeconds >= 0) {
           let minutes = Math.floor(totalSeconds / 60);
           let seconds = totalSeconds % 60;

           timeLeft.innerHTML = `${minutes <10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

           totalSeconds -= 1;
       } else {
           clearInterval(intervalId);
           console.log("Break ended!");
           onReset()
         
       }
   }, 1000);

  
};



