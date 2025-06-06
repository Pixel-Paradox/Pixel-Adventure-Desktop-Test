/*if (window.location.protocol != "https:") {
    window.location.protocol="https:";
}*/

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

const body = document.querySelector("body");
const bgMenu = document.querySelector(".bgMenu");
const reprendre = document.querySelector(".reprendre");
const inputSizes = document.querySelectorAll(".inputSize");
const musiqueBtn = document.querySelector(".musique");
const ecran = document.querySelector(".ecran");
const recommencer = document.querySelectorAll(".recommencer");

let menuKeys = false;

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 81) {
        bgMenu.classList.toggle("active");
        
        menuKeys = bgMenu.classList.contains('active');

        body.style.cursor = bgMenu.classList.contains('active') ? "default" : "none";
    } 
});

reprendre.onclick = function() {
    bgMenu.classList.remove("active");
    body.style.cursor = "none";
    menuKeys = bgMenu.classList.contains('active');
};

inputSizes.forEach((input, index) => {
    input.maxLength = 3;

    input.addEventListener('input', function() {
        let value = parseInt(this.value);
        
        if (this.value.length > 3) {
            this.value = this.value.slice(0, 3)
            value = parseInt(this.value);
        }

        if (value > 100) {
            value = 100;
        }
 
        if (value < 1) {
            value = 1;
        }

        localStorage.setItem(index === 0 ? "canvasWidth" : "canvasHeight", value.toString());
        
        if (index === 0) {
            canvas.style.width = `${value}vw`;
        } else {
            canvas.style.height = `${value}vh`;
        }
    });
});

function limitNumberLength(inputSizes, maxLength) {
    if (inputSizes.value.length > maxLength) {
        inputSizes.value = input.value.slice(0, maxLength);
    }
}

let musique = false;

function music(event) {
    musique = true;
    document.removeEventListener('keydown', music);
    document.removeEventListener('click', music); 
}

document.addEventListener('keydown', music);

musiqueBtn.onclick = function() {
    if (!musique) {
        musiqueBtn.textContent = "Musique activée";
        musique = true;

        localStorage.setItem("musiqueActive", "true");
    } else {
        musiqueBtn.textContent = "Musique désactivée";
  
        for (let key in musiques) {
            if (musiques.hasOwnProperty(key)) {
                musiques[key].pause();
            }
        }
        musique = false;

        localStorage.setItem("musiqueActive", "false");
    }
}

let pleinEcranActif = false;

ecran.onclick = function() {
    if (!pleinEcranActif) {
        enterFullscreen();
        pleinEcranActif = true;
        ecran.textContent = "Plein écran activé";
    } else {
        exitFullscreen();
        pleinEcranActif = false;
        ecran.textContent = "Plein écran désactivé";
    }
};

function enterFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

recommencer.forEach((recommencerBtn) => {
    recommencerBtn.onclick = function() {
        location.reload();
    }
})

window.addEventListener('DOMContentLoaded', function() {
    const storedWidth = localStorage.getItem("canvasWidth");
    const storedHeight = localStorage.getItem("canvasHeight");
    
    if (!storedWidth) {
        inputSizes[0].value = 100;
        canvas.style.width = "100vw";
        localStorage.setItem("canvasWidth", "100");
    } else {
        inputSizes[0].value = storedWidth;
        canvas.style.width = `${storedWidth}vw`;
    }
    
    if (!storedHeight) {
        inputSizes[1].value = 100;
        canvas.style.height = "100vh";
        localStorage.setItem("canvasHeight", "100");
    } else {
        inputSizes[1].value = storedHeight;
        canvas.style.height = `${storedHeight}vh`;
    }

    const musiqueActive = localStorage.getItem("musiqueActive");
    
    if (musiqueActive === "true") {
        musiqueBtn.textContent = "Musique activée";

    } else {
        musiqueBtn.textContent = "Musique désactivée";

        document.removeEventListener('keydown', music);
        document.removeEventListener('click', music);
        musique = false;
    }
});