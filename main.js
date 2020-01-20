// Variables and functions to reduce and increase session time
document.getElementById('sessionDown').addEventListener('click', reduceSessionTime);

document.getElementById('sessionUp').addEventListener('click', increaseSessionTime);

const sessionTime = document.getElementsByClassName('adjustSession');

function reduceSessionTime(){
    if(sessionTime[0].textContent > 1){
        sessionTime[0].textContent = Number(sessionTime[0].textContent) - 1;
        if(Number(sessionTime[0].textContent < 10)){
            sessionDisplay[0].textContent = '0' + sessionTime[0].textContent + ':00';
        } else{
            sessionDisplay[0].textContent = sessionTime[0].textContent + ':00';
        }
        displayNumbers = sessionDisplay[0].textContent.split(':');
    }
}

function increaseSessionTime(){
    if(sessionTime[0].textContent < 60){
        sessionTime[0].textContent = Number(sessionTime[0].textContent) + 1;
        if(Number(sessionTime[0].textContent < 10)){
            sessionDisplay[0].textContent = '0' + sessionTime[0].textContent + ':00';
        } else{
            sessionDisplay[0].textContent = sessionTime[0].textContent + ':00';
        }
        displayNumbers = sessionDisplay[0].textContent.split(':');
    }
}

// Variables and functions to reduce and increase break time
document.getElementById('breakDown').addEventListener('click', reduceBreakTime);

document.getElementById('breakUp').addEventListener('click', increaseBreakTime);

const breakTime = document.getElementsByClassName('adjustBreak');

function reduceBreakTime(){
    if(breakTime[0].textContent > 5){
        breakTime[0].textContent = Number(breakTime[0].textContent) - 1;
    }
}

function increaseBreakTime(){
    if(breakTime[0].textContent < 60){
        breakTime[0].textContent = Number(breakTime[0].textContent) + 1;
    }
}


//----------- Second half of page w/ display buttons


// Variables and functions to activate the session buttons and countdown the session
const startSession = function(){
    document.getElementById('sessionDown').disabled = true;
    document.getElementById('sessionUp').disabled = true;
    minutes = Number(displayNumbers[0]);
    seconds = Number(displayNumbers[1]);
    timer = setInterval(function(){
        if(minutes + seconds > 0){
            if(seconds === 0 && minutes > 0){
                minutes = minutes - 1;
                seconds = 59;
                if(minutes < 10){
                    sessionDisplay[0].textContent = '0' + minutes + ':' + seconds;
                } else if(seconds < 10){
                    sessionDisplay[0].textContent = minutes + ':0' + seconds;
                } else{
                    sessionDisplay[0].textContent = minutes + ':' + seconds;
                }
            } else if(seconds > 0){
                seconds = seconds - 1;
                if(minutes >= 10 && seconds >= 10){
                    sessionDisplay[0].textContent = minutes + ':' + seconds;
                } else if(minutes >= 10 && seconds < 10){
                    sessionDisplay[0].textContent = minutes + ':0' + seconds;
                } else if(minutes < 10 && seconds >= 10){
                    sessionDisplay[0].textContent = '0' + minutes + ':' + seconds;
                } else if(minutes < 10 && seconds < 10){
                    sessionDisplay[0].textContent = '0' + minutes + ':0' + seconds;
                } 
            } 
        } if(minutes === 0 && seconds < 6 && seconds > 0){
                const countdownAudio = document.getElementById('countdownSound');
                countdownAudio.play();
        } if(minutes + seconds === 0){
            //clearInterval(timer);// Don't need clearInterval in this function. Need to transition between session and break time here.
            const endAudio = document.getElementById('endSound');
            endAudio.play();
            console.log('transition now');
        }
    }, 1000);
}

const changeColor = function(){
    color = setInterval(function(){
        displayMins = Number(sessionDisplay[0].textContent.split(':')[0]);
        displaySecs = Number(sessionDisplay[0].textContent.split(':')[1]) - 1;
        if(displayMins > 0){
            document.getElementById('timer').style.color = '#33a11a';
        } else if(displayMins === 0 && displaySecs > 15 || displaySecs === -1){
            document.getElementById('timer').style.color = '#33a11a';
        } else if(displayMins === 0 && displaySecs <= 15 && displaySecs > 5){
            document.getElementById('timer').style.color = '#d8d012';
        } else{
            document.getElementById('timer').style.color = '#db1d1d';
        }  
    }, 1000);
}

const refreshTimer = function(){
    clearInterval(timer);
    clearInterval(color);
    displayNumbers[0] = 25;
    displayNumbers[1] = 0;
    sessionDisplay[0].textContent = '25:00';
    sessionTime[0].textContent = 25;
    document.getElementById('timer').style.color = 'black';
    document.getElementById('play').disabled = false;
    document.getElementById('sessionDown').disabled = false;
    document.getElementById('sessionUp').disabled = false;
}

const pauseTimer = function(){
    clearInterval(timer);
    clearInterval(color);
    displayNumbers[0] = minutes;
    displayNumbers[1] = seconds;
    document.getElementById('play').disabled = false;
} 

const stopTimer = function(){
    clearInterval(timer);
    clearInterval(color);
    displayNumbers[0] = Number(sessionTime[0].textContent);
    displayNumbers[1] = 0;
    sessionDisplay[0].textContent = displayNumbers[0] + ':00';
    document.getElementById('timer').style.color = 'black';
    document.getElementById('play').disabled = false;
}

document.getElementById('play').addEventListener('click', startSession);

document.getElementById('play').addEventListener('mousedown', changeColor);

document.getElementById('refresh').addEventListener('click', refreshTimer);

document.getElementById('pause').addEventListener('click', pauseTimer);

document.getElementById('stop').addEventListener('click', stopTimer);

// disable play after one click
document.getElementById('play').onclick = function(){
    const playAudio = document.getElementById('playSound');
    playAudio.play();
    this.disabled = true;
}

const sessionDisplay = document.getElementsByClassName('timer');
let displayNumbers = sessionDisplay[0].textContent.split(':');
let minutes;
let seconds;
let timer;
let color;
let displayMins;
let displaySecs;