let players = {};

// 1. YouTube API Ready
function onYouTubeIframeAPIReady() {
    document.querySelectorAll('.song-card').forEach((card, index) => {
        const videoId = card.getAttribute('data-video-id');
        const placeholder = card.querySelector('.yt-placeholder');
        if (!placeholder) return;
        const playerId = "player-" + index;
        placeholder.id = playerId;

        players[playerId] = new YT.Player(playerId, {
            height: '0', width: '0', videoId: videoId,
            playerVars: { 'autoplay': 0, 'controls': 0 },
            events: { 'onStateChange': (event) => onPlayerStateChange(event, card) }
        });
        card.querySelector('.play-btn').setAttribute('data-target', playerId);
    });
}

// 2. Play/Pause
function togglePlay(button) {
    const playerId = button.getAttribute('data-target');
    const player = players[playerId];
    Object.keys(players).forEach(id => {
        if (id !== playerId && players[id].getPlayerState() === 1) players[id].pauseVideo();
    });
    player.getPlayerState() === 1 ? player.pauseVideo() : player.playVideo();
}

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

// 3. FIX: Show Content Logic
function openEnvelope() {
    const env = document.getElementById("envelope-screen");
    const main = document.getElementById("main-content");
    if (env) env.style.display = "none";
    if (main) {
        main.style.display = "block";
        main.style.opacity = "1";
    }
}

// Auto-reveal if no envelope exists (fixes white screen on song.html)
window.onload = function() {
    if (!document.getElementById("envelope-screen")) {
        const main = document.getElementById("main-content");
        if (main) {
            main.style.display = "block";
            main.style.opacity = "1";
        }
    }
};

// 4. Hearts
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animation = `floatUp ${5 + Math.random() * 5}s linear forwards`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 800);

// 5. Password
function checkPassword() {
    const pw = document.getElementById("passwordInput").value;
    if (pw === "021026") window.location.href = "secret.html";
    else alert("That is not the sacred word, my love ❤️");
}
