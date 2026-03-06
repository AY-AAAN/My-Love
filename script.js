let players = {};
let hasWritten = false;

// 1. INITIALIZE YOUTUBE PLAYERS
function onYouTubeIframeAPIReady() {
    document.querySelectorAll('.song-card').forEach((card, index) => {
        const videoId = card.getAttribute('data-video-id');
        const placeholder = card.querySelector('.yt-placeholder');
        const playerId = "player-" + index;
        placeholder.id = playerId;

        players[playerId] = new YT.Player(playerId, {
            height: '0',
            width: '0',
            videoId: videoId,
            playerVars: { 'autoplay': 0, 'controls': 0 },
            events: {
                'onStateChange': (event) => onPlayerStateChange(event, card)
            }
        });
        card.querySelector('.play-btn').setAttribute('data-target', playerId);
    });
}

// 2. PLAY/PAUSE LOGIC
function togglePlay(button) {
    const playerId = button.getAttribute('data-target');
    const player = players[playerId];

    // Stop all other songs
    Object.keys(players).forEach(id => {
        if (id !== playerId && players[id].getPlayerState() === 1) {
            players[id].pauseVideo();
        }
    });

    if (player.getPlayerState() === 1) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

// 3. SYNC VINYL SPIN WITH YOUTUBE STATE
function onPlayerStateChange(event, card) {
    const vinyl = card.querySelector('.vinyl');
    const btn = card.querySelector('.play-btn');

    if (event.data === YT.PlayerState.PLAYING) {
        vinyl.classList.add('spin');
        btn.innerText = "Pause";
    } else {
        vinyl.classList.remove('spin');
        btn.innerText = "Play";
    }
}

// 4. ENVELOPE & UI LOGIC
function openEnvelope() {
    document.getElementById("envelope-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    if (!hasWritten) {
        // Trigger typewriter if you have elements with class "typewriter"
        hasWritten = true;
    }
}

// 5. FLOATING HEARTS
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animation = `floatUp ${4 + Math.random() * 4}s linear forwards`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
}
setInterval(createHeart, 600);

// 6. PASSWORD LOGIC
function checkPassword() {
    const password = document.getElementById("passwordInput").value;
    if (password === "021026") {
        window.location.href = "secret.html";
    } else {
        alert("That is not the sacred word, my love ❤️");
    }
}
