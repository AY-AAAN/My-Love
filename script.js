/* =========================
   ENVELOPE LOGIC
========================= */
let hasWritten = false;

function openEnvelope() {
    const envScreen = document.getElementById("envelope-screen");
    const mainContent = document.getElementById("main-content");
    
    if (envScreen) envScreen.style.display = "none";
    if (mainContent) mainContent.style.display = "block";

    if (!hasWritten) {
        setTimeout(startInkSequence, 800);
        hasWritten = true;
    }
}

/* =========================
   OLD INK WRITING SEQUENCE
========================= */
function writeInk(element, text, callback, speed = 25) {
    element.innerHTML = "";
    let i = 0;
    const writingSound = document.getElementById("typingSound");

    function write() {
        if (i < text.length) {
            const span = document.createElement("span");
            span.textContent = text.charAt(i);
            span.classList.add("ink-char");
            element.appendChild(span);

            setTimeout(() => {
                span.classList.add("show");
            }, 10);

            if (writingSound) {
                writingSound.currentTime = 0;
                writingSound.play().catch(() => {});
            }

            i++;
            setTimeout(write, speed);
        } else {
            if (writingSound) {
                writingSound.pause();
                writingSound.currentTime = 0;
            }
            if (callback) callback();
        }
    }
    write();
}

function startInkSequence() {
    const elements = document.querySelectorAll(".typewriter");
    let index = 0;

    function next() {
        if (index < elements.length) {
            const el = elements[index];
            const text = el.getAttribute("data-text") || el.innerText;
            
            // Clear current text to prepare for animation
            el.innerText = ""; 

            writeInk(el, text, () => {
                index++;
                setTimeout(next, 1200);
            });
        }
    }
    next();
}

/* =========================
   SONG PLAYER (Updated)
========================= */
function playSong(button) {
    const card = button.closest('.song-card');
    const audio = card.querySelector("audio");
    const vinyl = card.querySelector(".vinyl");

    // 1. Stop all other songs and reset their buttons/vinyls
    document.querySelectorAll(".romantic-song").forEach(song => {
        if (song !== audio) {
            song.pause();
            const otherCard = song.closest('.song-card');
            if (otherCard) {
                otherCard.querySelector(".vinyl").classList.remove("spin");
                otherCard.querySelector("button").innerText = "Play";
            }
        }
    });

    // 2. Toggle the selected song
    if (audio.paused) {
        audio.play().catch(err => console.log("Playback interaction required"));
        vinyl.classList.add("spin");
        button.innerText = "Pause";
    } else {
        audio.pause();
        vinyl.classList.remove("spin");
        button.innerText = "Play";
    }
}

// Ensure vinyl stops when music finishes naturally
document.querySelectorAll(".romantic-song").forEach(audio => {
    audio.addEventListener('ended', () => {
        const card = audio.closest('.song-card');
        card.querySelector(".vinyl").classList.remove("spin");
        card.querySelector("button").innerText = "Play";
    });
});

/* =========================
   FLOATING HEARTS
========================= */
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * window.innerWidth + "px";
    
    // Randomize size and duration for variety
    const duration = 4 + Math.random() * 4;
    heart.style.animation = `floatUp ${duration}s linear forwards`;
    
    document.body.appendChild(heart);
    
    // Remove heart after it floats off screen
    setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(createHeart, 500);

/* =========================
   PASSWORD & INITIALIZATION
========================= */
function checkPassword() {
    const password = document.getElementById("passwordInput").value;

    if (password === "021026") {
        const main = document.getElementById("main-content");
        main.style.transition = "opacity 1s";
        main.style.opacity = "0";

        setTimeout(() => {
            window.location.href = "secret.html";
        }, 1000);
    } else {
        alert("That is not the sacred word, my love ❤️");
    }
}

window.addEventListener("load", () => {
    // If we are not on the envelope screen, start the ink sequence immediately
    if (!document.getElementById("envelope-screen")) {
        startInkSequence();
    }

    // Unlock audio context on first click (browser requirement)
    document.body.addEventListener("click", () => {
        const audio = document.getElementById("typingSound");
        if (audio) {
            audio.play().then(() => {
                audio.pause();
                audio.currentTime = 0;
            }).catch(() => {});
        }
    }, { once: true });
});
