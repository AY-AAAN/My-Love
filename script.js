// --- ENVELOPE & MUSIC LOGIC ---
function openEnvelope() {
    // 1. Hide Envelope
    document.getElementById("envelope-screen").style.display = "none";
    
    // 2. Show Content
    const main = document.getElementById("main-content");
    main.style.display = "block";
    setTimeout(() => { main.style.opacity = "1"; }, 50);

    // 3. FIX: Start Music (Browser allows it now because of the click)
    const audio = document.getElementById("bgMusic");
    if (audio) {
        audio.play().catch(error => {
            console.log("Autoplay prevented. Music will play on next interaction.");
        });
    }

    // 4. FIX: Trigger Typewriter
    startTypewriter();
}

// --- TYPEWRITER EFFECT ---
function startTypewriter() {
    document.querySelectorAll('.typewriter').forEach(el => {
        const text = el.getAttribute('data-text');
        if (!text) return; 

        el.innerText = ''; // Clear existing text
        let i = 0;
        
        function typing() {
            if (i < text.length) {
                el.innerText += text.charAt(i);
                i++;
                setTimeout(typing, 50); // Speed of typing
            }
        }
        typing();
    });
}

// --- PASSWORD CHECK ---
function checkPassword() {
    const pw = document.getElementById("passwordInput").value;
    if (pw === "021026") {
        window.location.href = "secret.html";
    } else {
        alert("That is not the sacred word, my love ❤️");
    }
}

// --- HEARTS ---
setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    // Purple variation for hearts
    const colors = ['#a078ff', '#6b527e', '#d1c4e9'];
    heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    heart.style.animation = `floatUp ${5 + Math.random() * 5}s linear forwards`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
}, 800);

// --- YOUTUBE API (For songs.html) ---
let players = {};
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

function togglePlay(button) {
    const playerId = button.getAttribute('data-target');
    const player = players[playerId];
    
    // Pause other playing songs
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
