/* =========================
   ENVELOPE
========================= */

let hasWritten = false;

function openEnvelope() {
    document.getElementById("envelope-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";

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
            const text = el.getAttribute("data-text");

            writeInk(el, text, () => {
                index++;
                setTimeout(next, 1200);
            });
        }
    }

    next();
}

/* =========================
   AUTO START (LETTERS + SECRET)
========================= */

window.addEventListener("load", () => {

    if (document.getElementById("envelope-screen")) return;

    document.body.addEventListener("click", () => {
        const audio = document.getElementById("typingSound");
        if (audio) {
            audio.play().then(() => {
                audio.pause();
                audio.currentTime = 0;
            }).catch(() => {});
        }
    }, { once: true });

    startInkSequence();
});

/* =========================
   FLOATING HEARTS
========================= */

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.animation = `floatUp ${4 + Math.random() * 4}s linear forwards`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
}

setInterval(createHeart, 500);

/* =========================
   SONG PLAYER
========================= */

function playSong(button) {
    const card = button.parentElement;
    const audio = card.querySelector("audio");
    const vinyl = card.querySelector(".vinyl");

    document.querySelectorAll(".romantic-song").forEach(song => {
        if (song !== audio) song.pause();
    });

    document.querySelectorAll(".vinyl").forEach(v => v.classList.remove("spin"));

    if (audio.paused) {
        audio.play();
        vinyl.classList.add("spin");
        button.innerText = "Pause";
    } else {
        audio.pause();
        vinyl.classList.remove("spin");
        button.innerText = "Play";
    }
}

/* =========================
   PASSWORD
========================= */

function checkPassword() {
    const password = document.getElementById("passwordInput").value;

    if (password === "021026") {
        document.getElementById("main-content").style.transition = "opacity 1s";
        document.getElementById("main-content").style.opacity = "0";

        setTimeout(() => {
            window.location.href = "secret.html";
        }, 1000);

    } else {
        alert("That is not the sacred word, my love ❤️");
    }
}


