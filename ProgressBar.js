let progressBar = document.querySelector('.progress');
let progressPercent = document.querySelector('.progress-percent');
let timeInput = document.querySelector('.time-input');
let startButton = document.querySelector('.start-button');
let pauseButton = document.querySelector('.pause-button');
let resumeButton = document.querySelector('.resume-button');
let restartButton = document.querySelector('.restart-button');
let intervalId;
let duration;
let progress = 0;

function hideButton(button) {
    button.style.display = 'none';
}

function showButton(button) {
    button.style.display = 'inline-block';
}

function startProgressBar() {
    if (isNaN(duration)) {
        alert("Please enter a valid time.");
        return;
    }
    hideButton(startButton);
    showButton(pauseButton);
    showButton(restartButton);
    hideButton(resumeButton);
    clearInterval(intervalId);
    progress = 0;
    progressBar.style.width = '0%';
    progressPercent.textContent = '0%';
    intervalId = setInterval(updateProgressBar, 1000);
}

function updateProgressBar() {
    progress += (100 / duration);
    if (progress > 100) {
        progress = 100;
    }
    progressBar.style.width = progress + '%';
    progressPercent.textContent = Math.round(progress) + '%';
    if (progress >= 100) {
        clearInterval(intervalId);
        hideButton(pauseButton);
        hideButton(resumeButton);
        showButton(restartButton);
    }
}

function pauseProgressBar() {
    clearInterval(intervalId);
    hideButton(pauseButton);
    showButton(resumeButton);
}

function resumeProgressBar() {
    intervalId = setInterval(updateProgressBar, 1000);
    showButton(pauseButton);
    hideButton(resumeButton);
}

function restartProgressBar() {
    clearInterval(intervalId);
    progress = 0;
    progressBar.style.width = '0%';
    progressPercent.textContent = '0%';
    hideButton(pauseButton);
    hideButton(resumeButton);
    hideButton(restartButton);
}

startButton.addEventListener('click', function() {
    duration = parseInt(timeInput.value);
    startProgressBar();
});

pauseButton.addEventListener('click', pauseProgressBar);

resumeButton.addEventListener('click', resumeProgressBar);

restartButton.addEventListener('click', restartProgressBar);