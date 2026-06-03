const env = document.getElementById("env");
const btn = document.getElementById("btn");
const main = document.getElementById("main");
const scene = document.querySelector(".scene");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const heroVideo = document.querySelector(".hero-video");
const cardVideo = document.querySelector(".card-video");
const bgVideo = document.querySelector(".bg-video");

/* =========================
   STATE LOCK
========================= */

let opened = false;
let audioReady = false;

/* =========================
   AUDIO UNLOCK (FIX ALL BROWSERS)
========================= */

async function unlockAudio() {
    if (!music || audioReady) return;

    try {
        music.muted = true;
        music.volume = 0;

        await music.play();

        music.pause();
        music.currentTime = 0;
        music.muted = false;

        audioReady = true;

    } catch (e) {
        console.log("Audio unlock failed", e);
    }
}

/* =========================
   VIDEO SAFE PLAY
========================= */

function playVideo(v) {
    if (!v) return;

    try {
        v.muted = true;
        v.playsInline = true;
        v.setAttribute("playsinline", "");

        v.currentTime = 0;

        const p = v.play();
        if (p && p.catch) p.catch(() => {});
    } catch (e) {}
}

/* =========================
   OPEN ENVELOPE (ONE TIME ONLY)
========================= */

async function openEnvelope() {

    if (opened) return;
    opened = true;

    // 1️⃣ unlock audio FIRST
    await unlockAudio();

    // 2️⃣ start music safely
    if (music && audioReady) {

        music.currentTime = 0;
        music.volume = 0;

        const p = music.play();
        if (p && p.catch) p.catch(() => {});

        let vol = 0;
        const fade = setInterval(() => {
            vol += 0.02;
            music.volume = Math.min(vol, 0.4);
            if (vol >= 0.4) clearInterval(fade);
        }, 60);
    }

    // 3️⃣ videos
    playVideo(heroVideo);
    playVideo(cardVideo);
    playVideo(bgVideo);

    // 4️⃣ UI transition
    if (scene) {
        scene.style.transition = "opacity 1.2s ease";
        scene.style.opacity = "0";
        scene.style.pointerEvents = "none";
    }

    setTimeout(() => {

        if (main) {
            main.style.transition = "opacity 1.5s ease, transform 1.5s ease";
            main.style.opacity = "1";
            main.style.transform = "translateY(0)";
            main.style.visibility = "visible";
        }

        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";

        window.scrollTo({ top: 0 });

    }, 900);
}

/* =========================
   SINGLE TRIGGER ONLY (IMPORTANT FIX)
========================= */

function startSite() {
    openEnvelope();
}

// 🔥 أهم سطر في المشروع كله
document.addEventListener("pointerdown", startSite, { once: true });

/* =========================
   BUTTONS
========================= */

if (btn) btn.addEventListener("click", openEnvelope);

/* =========================
   MUSIC BUTTON (NO DOUBLE TRIGGER)
========================= */

if (musicBtn && music) {

    musicBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (music.paused) {

            music.volume = 0.4;
            music.play().catch(() => {});

            musicBtn.classList.add("playing");
            musicBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;

        } else {

            music.pause();

            musicBtn.classList.remove("playing");
            musicBtn.innerHTML = `<i class="fa-solid fa-music"></i>`;
        }
    });
}
