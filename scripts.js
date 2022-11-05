const stemStart = document.querySelector('#stemStart');
const stemContainer = document.querySelector('.stem-container');
const addStemBtn = document.querySelector('.stem-add');

const timer = document.querySelector('#timer-count');
const startingMins = .5;
let time = startingMins * 60;
let refreshInterval;

console.log(stemStart);
console.log(stemContainer);
console.log(addStemBtn);
console.log(timer);

//add enter functionality for first stem
//add stem addition functionality for the addStemBtn
//auto start time

function updateCountdown(){
    let minutes = Math.floor( time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds: seconds;

    timer.innerText = `${minutes}:${seconds}`;
    if (time <= 0) { //stop the setInterval whe time = 0 for avoid negative time
        addStemBtn.classList.remove('active');
        clearInterval(refreshInterval);
        
    }
    time--;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addStem(){
    let stemNum;

    if (stemContainer.querySelectorAll('.stem').length > 0){
        stemNum = String(stemContainer.querySelectorAll('.stem').length+1);
    }
    else{
        stemNum = "1";
    }

    let stemName = "stem" + stemNum;
    console.log(stemName);
    //create stem
    let newStem = document.createElement('div');
    newStem.classList.add('stem');
    newStem.classList.add('flex-item-v');

    let label = document.createElement('label');
    label.innerText=stemStart.value+"...";
    label.setAttribute('for', stemName);
    newStem.appendChild(label);

    let input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('for', stemName);
    input.setAttribute('name',stemName);
    newStem.appendChild(input);

    //add stem to container list
    stemContainer.appendChild(newStem);

    let addedStem = document.querySelector(`input[for="${stemName}"]`);
    addedStem.focus();

    

    /*
    sleep(2000);
    addedStem.addEventListener('keypress', function(e){
        if(e.key==='Enter');
        addStem();
    });
    */
}

stemStart.addEventListener('keypress', function (e){
    if (e.key==='Enter'){
        console.log('stemStart hit the Enter button');
        

        console.log(this.value);
        //create stem
        addStem();

        //show addButton
        addStemBtn.classList.add('active'); 
        addStemBtn.addEventListener('click', addStem);
        //start timer
        refreshInterval = setInterval(updateCountdown, 1000);

        //disable the stem
        stemStart.setAttribute('disabled','');

    }
});
