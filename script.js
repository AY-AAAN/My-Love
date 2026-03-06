function openEnvelope() {
    document.getElementById("envelope-screen").style.display = "none";
    const main = document.getElementById("main-content");
    main.style.display = "block";
    setTimeout(() => { main.style.opacity = "1"; }, 50);
    startTypewriter();
}

function startTypewriter() {
    document.querySelectorAll('.typewriter').forEach(el => {
        const text = el.getAttribute('data-text');
        el.innerText = '';
        let i = 0;
        function typing() {
            if (i < text.length) {
                el.innerText += text.charAt(i);
                i++;
                setTimeout(typing, 40);
            }
        }
        typing();
    });
}

function checkPassword() {
    const pw = document.getElementById("passwordInput").value;
    if (pw === "021026") {
        window.location.href = "secret.html";
    } else {
        alert("That is not the sacred word, my love ❤️");
    }
}

// YouTube Player Logic
let players = {};
function onYouTubeIframeAPIReady() {
    document.querySelectorAll('.song-card').forEach((card, index) => {
        const videoId = card.getAttribute('data-video-id');
        const placeholder = card.querySelector('.yt-placeholder');
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

// Hearts Effect
setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animation = `floatUp ${5 + Math.random() * 5}s linear forwards`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
}, 600);
