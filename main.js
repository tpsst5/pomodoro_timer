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
        } if(minutes + seconds === 0){
            //clearInterval(timer);// Don't need clearInterval in this function. Need to transition between session and break time here.
            console.log('transition now');
        }
    }, 1000);
}

const changeColor = function(){//this function's not actively running like play function. would need to add another setInterval perhaps. Try changing the variable after it works to see what works.
    colorChangeVar;
    console.log(colorChangeVar);
    if(colorChangeVar < 24){
        console.log('it\'s working');
    }
    // if(minutes > 0){// if statement not working here
    //     console.log('mins greater than 0');
    //     document.getElementById('timer').style.color = 'green';
    // } else if(minutes === 0 && seconds > 15){
    //     console.log('mins is 0 secs greater than 15');
    //     document.getElementById('timer').style.color = 'green';
    // } else if(minutes === 0 && seconds > 5){
    //     document.getElementById('timer').style.color = 'yellow';
    // } else if(minutes === 0 && seconds < 6){
    //     document.getElementById('timer').style.color = 'red';
    // }
}

const refreshTimer = function(){
    clearInterval(timer);
    displayNumbers[0] = 25;
    displayNumbers[1] = 0;
    sessionDisplay[0].textContent = '25:00';
    sessionTime[0].textContent = 25;
    document.getElementById('play').disabled = false;
    document.getElementById('sessionDown').disabled = false;
    document.getElementById('sessionUp').disabled = false;
}

const pauseTimer = function(){
    clearInterval(timer);
    displayNumbers[0] = minutes;
    displayNumbers[1] = seconds;
    document.getElementById('play').disabled = false;
} 

const stopTimer = function(){
    clearInterval(timer);
    displayNumbers[0] = Number(sessionTime[0].textContent);
    displayNumbers[1] = 0;
    document.getElementById('play').disabled = false;
}

document.getElementById('play').addEventListener('click', startSession);

document.getElementById('play').addEventListener('mousedown', changeColor);

document.getElementById('refresh').addEventListener('click', refreshTimer);

document.getElementById('pause').addEventListener('click', pauseTimer);

document.getElementById('stop').addEventListener('click', stopTimer);

// disable play after one click
document.getElementById('play').onclick = function(){
    this.disabled = true;
}


const sessionDisplay = document.getElementsByClassName('timer');
let displayNumbers = sessionDisplay[0].textContent.split(':');
let minutes;
let seconds;
let timer;
let colorChangeVar = Number(sessionDisplay[0].textContent.split(':')[0]);;




// TESTS

// Session down button clicked:
    // 1. XXX--Top session time goes down by one
    // 2. XXX--Top session time goes down by one and stops at 5
    // 3. Main session time goes down by one if session stopped
    // 4. Main session time goes down by one and stops at 5 if session stopped
    // 5. Top session doesn't change if session active
    // 6. Main session doesn't change if session is active
            //THOUGHTS: "Session inactive" could be defined as what?

// Session up button clicked:
    // 1. XXX--Top session goes up by one
    // 2. XXX--Top session goes up by one and stops at 60