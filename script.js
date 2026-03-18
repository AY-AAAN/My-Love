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
        if (!text) return; 
        el.innerText = ''; 
        let i = 0;
        function typing() {
            if (i < text.length) {
                el.innerText += text.charAt(i);
                i++;
                setTimeout(typing, 50); 
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

setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    const colors = ['#a078ff', '#6b527e', '#d1c4e9'];
    heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    heart.style.animation = `floatUp ${5 + Math.random() * 5}s linear forwards`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
}, 800);
