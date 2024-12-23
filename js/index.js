var audio;
var effects;

function subtextFiller() {
    const textVariants = ['Software Engineer', 'Web Developer', 'JavaScript', 'React', 'PHP', 'Python', 'NodeJS', 'C#', 'SAP ByD'];
    const subtextElement = document.getElementById('subtext');
    let currentIndex = 0;

    function typeText(text, callback) {
        let i = 0;
        const interval = setInterval(() => {
            subtextElement.innerText = text.substring(0, i + 1) || "\u00A0"; // Ha üres, használjunk nem törhető szóközt
            i++;
            if (i === text.length) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 100); // Betűnkénti megjelenítés sebessége (100ms)
    }

    function deleteText(callback) {
        let i = subtextElement.innerText.length;
        const interval = setInterval(() => {
            subtextElement.innerText = i > 1 
                ? subtextElement.innerText.substring(0, i - 1) 
                : "\u00A0"; // Hagyj egy nem törhető szóközt, ha üres
            i--;
            if (i === 0) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 100); // Betűnkénti eltűnés sebessége (100ms)
    }

    function cycleText() {
        typeText(textVariants[currentIndex], () => {
            setTimeout(() => {
                deleteText(() => {
                    currentIndex = (currentIndex + 1) % textVariants.length;
                    cycleText();
                });
            }, 3000); // Pausa mielőtt eltűnne
        });
    }

    cycleText();
}


function musicPlayer(){
    audio = new Audio("./sounds/ambient.mp3");
    if(!localStorage.getItem('muted') || localStorage.getItem('muted') == '0'){
        audio.volume = 1;
    }
    else if(localStorage.getItem('muted') == '1'){
        audio.volume = 0;
    }
    audio.play();
}

function loadContent(){
    document.body.style.animationName = 'backgroundChange';
    document.body.style.animationDuration = '1s';
    document.body.style.animationFillMode = 'both';
    document.getElementById('content').style.animationName = 'disappear';
    document.getElementById('content').style.animationDuration = '0.3s';
    document.getElementById('content').style.animtionFillMode = 'both';

    document.getElementById('particles-js').style.animationName = 'disappear';
    document.getElementById('particles-js').style.animationDuration = '0.3s';
    document.getElementById('particles-js').style.animtionFillMode = 'both';

    setTimeout(function(){
        document.getElementById('particles-js').remove();
    },400);

    var effects = new Audio("./sounds/woosh.mp3");
    if(!localStorage.getItem('muted') || localStorage.getItem('muted') == '0'){
        effects.volume = 0.3;
    }
    else if(localStorage.getItem('muted') == '1'){
        effects.volume = 0;
    }
    effects.play();
}

function soundStateChange(){
    if(!localStorage.getItem('muted') || localStorage.getItem('muted') == '0'){
        localStorage.setItem('muted', '1');
        document.getElementById('soundIcon').innerHTML = `<img src='./img/soundoff.svg'>`;
        audio.volume = 0;
    }
    else if(localStorage.getItem('muted') == '1'){
        localStorage.setItem('muted', '0');
        document.getElementById('soundIcon').innerHTML = `<img src='./img/soundon.svg'>`;
        audio.volume = 1;
    }
}

function defaultState(){
    document.getElementById('content').style.animationName = 'disappear';
    document.getElementById('content').style.animationDuration = '0.5s';
    document.getElementById('content').style.animationFillMode = 'both';
    document.getElementById('particles-js').style.animationName = 'appear';
    document.getElementById('particles-js').style.animationDuration = '1s';
    document.getElementById('particles-js').style.animationFillMode = 'both';
    setTimeout(musicPlayer(),500);
    setTimeout(function(){
        document.getElementById('content').style.animationName = 'appear';
        document.getElementById('content').style.animationDuration = '0.5s';
        document.getElementById('content').style.animationFillMode = 'both';
        document.getElementById('content').style.border = '1px solid white';
        document.getElementById('content').style.backgroundColor = 'rgba(16, 16, 16, 0.8)';

        if(!localStorage.getItem('muted') || localStorage.getItem('muted') == '0'){
            document.getElementById('separator').innerHTML += `
                <div class="soundIconContainer">
                    <div id='soundIcon' class="soundIcon">
                        <img src='./img/soundon.svg'>
                    </div>
                </div>
            `;
        }
        else if(localStorage.getItem('muted') == '1'){
            document.getElementById('separator').innerHTML += `
                <div class="soundIconContainer">
                    <div id='soundIcon' class="soundIcon">
                        <img src='./img/soundoff.svg'>
                    </div>
                </div>
            `;
        }

        document.getElementById('content').innerHTML = `
            <div id='welcomeElements'>
                <div id='defaultTextContainer'>
                    <center><div id='name'>Tátrai Péter</div>
                    <div id='subtext'></div></center>
                </div>
                <hr>
                <div class='optionSelectorContainer'>
                    <div class='optionSelectorOption optionButton'>Magyar</div>
                    <div class='optionSelectorOption optionButton'>English</div>
                </div>
            </div>
        `;

        document.querySelector('.optionSelectorContainer').addEventListener('click', (event) => {
            if (event.target.classList.contains('optionButton')) {
                const selectedValue = event.target.textContent;
                if(selectedValue == 'Magyar'){
                    loadContent();
                }
                else if(selectedValue == 'English'){
                    loadContent();
                }
            }
        });

        document.getElementById('soundIcon').addEventListener('click', soundStateChange);
        subtextFiller();
    },1000)
}

function startState(){
    document.getElementById('content').style.border = '0px solid white';
    document.getElementById('content').style.background = 'none';
    document.getElementById('content').innerHTML += `
        <button id='startButton' class='trButton'>START</button>
    `;

    document.getElementById('startButton').addEventListener('click', defaultState);
}

startState();

