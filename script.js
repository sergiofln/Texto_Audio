let textarea = document.querySelector('#textarea');
let voices = document.querySelector('#voices');
let button = document.querySelector('#button');
let selectVoice = 0;

window.speechSynthesis.addEventListener('voiceschanged', () => {
    let voicesList = window.speechSynthesis.getVoices();
    for(let i in voicesList) {
        let optionEl = document.createElement('option');
        optionEl.setAttribute('value', i);
        optionEl.innerText = voicesList[i].name;
        voices.appendChild(optionEl);
    }
});

button.addEventListener('click', () => {
    if(textarea.value !== '') {
        let voicesList = window.speechSynthesis.getVoices();
        let ut = new SpeechSynthesisUtterance(textarea.value);
        ut.voice = voicesList[selectVoice];
        window.speechSynthesis.speak(ut);
    }
});

voices.addEventListener('change', () => {
    selectVoice = parseInt(voices.value);
})

function updateStatus() {
    if(window.speechSynthesis.speaking) {
        voices.setAttribute('disabled', 'disabled');
        button.setAttribute('disabled', 'disabled');
    } else {
        voices.removeAttribute('disabled');
        button.removeAttribute('disabled');
    }
}
setInterval(updateStatus, 100);
