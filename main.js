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
    if(breakTime[0].textContent > 1){
        breakTime[0].textContent = Number(breakTime[0].textContent) - 1;
    }
}

function increaseBreakTime(){
    if(breakTime[0].textContent < 60){
        breakTime[0].textContent = Number(breakTime[0].textContent) + 1;
    }
}


//----------- Second half of page w/ display buttons

const startSession = function(){
    clearInterval(timer);
    if(!breakActive){
        document.getElementById('sessionDown').disabled = true;
        document.getElementById('sessionUp').disabled = true;
        document.getElementById('breakUp').disabled = true;
        document.getElementById('breakDown').disabled = true;
        document.getElementsByClassName('sessionText2')[0].textContent = 'Session';
        if(!sessionActive){
            minutes = Number(sessionTime[0].textContent);
            seconds = 0;
        } else{
            minutes = Number(sessionDisplay[0].textContent.split(':')[0]);
            seconds = Number(sessionDisplay[0].textContent.split(':')[1]);
        }
        sessionDisplay[0].textContent = (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);

        sessionActive = true;

        timer = setInterval(function(){
            if(seconds <= 0){
                seconds = 60;
                minutes--;
            }
            if(minutes < 0){
                sessionActive = null;
                startBreak();
            }
            seconds--;
            if(seconds === -1){//WHY IS THIS NEEDED. ISSUE TAKING THIS OUT
                sessionActive = null;
                startBreak();
            }
            sessionDisplay[0].textContent = (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);

        }, 1000);
    } else{
        startBreak();
    }
}

const startBreak = function(){
    clearInterval(timer);
    if(breakActive){
        minutes = Number(sessionDisplay[0].textContent.split(':')[0]);
        seconds = Number(sessionDisplay[0].textContent.split(':')[1]);
    } else{
        minutes = Number(breakTime[0].textContent);
        seconds = Number(sessionDisplay[0].textContent.split(':')[1]);
    }
    breakActive = true;
    document.getElementsByClassName('sessionText2')[0].textContent = 'Break';
    sessionDisplay[0].textContent = (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);

    timer = setInterval(function(){
        if(seconds <= 0){
            seconds = 60;
            minutes--;
        }
        if(minutes < 0){
            breakActive = null;
            startSession();
        }
        seconds--;
        if(seconds === -1){
            breakActive = null;
            startSession();
        }
        sessionDisplay[0].textContent = (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);

    }, 1000);
}




const changeColor = function(){
    color = setInterval(function(){
        displayMins = Number(sessionDisplay[0].textContent.split(':')[0]);
        displaySecs = Number(sessionDisplay[0].textContent.split(':')[1]) - 1;
        if(displayMins > 0){
            document.getElementById('timer').style.color = '#e4f9f5';
        } else if(displayMins === 0 && displaySecs > 15 || displaySecs === -1){
            document.getElementById('timer').style.color = '#e4f9f5';
        } else if(displayMins === 0 && displaySecs <= 15 && displaySecs > 5){
            document.getElementById('timer').style.color = '#d8d012';
        } else{
            document.getElementById('timer').style.color = '#40514e';
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
    document.getElementById('breakUp').disabled = false;
    document.getElementById('breakDown').disabled = false;
}

const pauseTimer = function(){
    clearInterval(timer);
    clearInterval(color);
    // displayNumbers[0] = minutes;
    // displayNumbers[1] = seconds;
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
let displayNumbers = sessionDisplay[0].textContent.split(':');// this always equauls the number when paused. even after played it doesnt change. Can you remove this variable?
let minutes;
let seconds;
let timer;
let color;
let displayMins;
let displaySecs;
let breakActive;
let sessionActive;