const env = document.getElementById("env");
const btn = document.getElementById("btn");
const flash = document.querySelector(".open-flash");

const main = document.getElementById("main");
const scene = document.querySelector(".scene");
const bottomText = document.querySelector(".bottom-text");

/* =========================
   PARTICLES
========================= */

const particles = document.getElementById("particles");

function createParticle() {

    if (!particles) return;

    const p = document.createElement("div");

    p.classList.add("particle");

    p.style.left = Math.random() * 100 + "vw";
    p.style.bottom = "-10px";
    p.style.animationDuration = (4 + Math.random() * 5) + "s";
    p.style.opacity = Math.random();

    particles.appendChild(p);

    setTimeout(() => p.remove(), 9000);
}

if (particles) {
    setInterval(createParticle, 180);
}

/* =========================
   ELEMENTS
========================= */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const heroVideo = document.querySelector(".hero-video");
const cardVideo = document.querySelector(".card-video");
const bgVideo = document.querySelector(".bg-video");

/* =========================
   STOP EVERYTHING ON LOAD
========================= */

window.addEventListener("load", () => {

    /* ⛔ وقف الفيديوهات */
    const stopVideo = (v) => {
        if (!v) return;
        v.pause();
        v.currentTime = 0;
        v.muted = true;
    };

    stopVideo(heroVideo);
    stopVideo(cardVideo);
    stopVideo(bgVideo);

    /* ⛔ منع السكرول */
    document.body.style.overflow = "hidden";

    /* ⛔ تجهيز الموسيقى */
    if (music) {
        music.pause();
        music.currentTime = 0;
        music.volume = 0;
    }

    /* ⛔ تجهيز الصفحة */
    if (main) {
        main.style.opacity = "0";
        main.style.transform = "translateY(20px)";
    }

    if (scene) {
        scene.style.opacity = "1";
        scene.style.transform = "scale(1)";
    }
});

/* =========================
   OPEN ENVELOPE (CORE)
========================= */

let opened = false;

function openEnvelope() {

    if (opened) return;
    opened = true;

    /* 🎬 تشغيل الفيديوهات */
    const playVideo = (v) => {
        if (!v) return;
        v.muted = true;
        const p = v.play();
        if (p) p.catch(() => {});
    };

    playVideo(heroVideo);
    playVideo(cardVideo);
    playVideo(bgVideo);

    /* 🎵 تشغيل الموسيقى + fade in */
    if (music) {
        music.currentTime = 0;
        music.volume = 0;

        const playPromise = music.play();
        if (playPromise) playPromise.catch(() => {});

        let vol = 0;
        const fade = setInterval(() => {
            vol += 0.02;
            music.volume = Math.min(vol, 0.4);

            if (vol >= 0.4) clearInterval(fade);
        }, 60);
    }

    /* 🎛️ زر الموسيقى */
    if (musicBtn) {
        musicBtn.classList.add("playing");
        musicBtn.innerHTML = `
            <div class="music-disc">
                <i class="fa-solid fa-pause"></i>
            </div>
        `;
    }

    /* ✨ إخفاء scene (smooth) */
    if (scene) {
        scene.style.transition = "all 1.2s ease";
        scene.style.opacity = "0";
        scene.style.transform = "scale(1.05)";
    }

    /* ✨ فتح الموقع */
    setTimeout(() => {

        if (main) {
            main.style.transition = "all 1.4s ease";
            main.style.opacity = "1";
            main.style.transform = "translateY(0)";
            main.classList.add("show");
        }

        document.body.style.overflowY = "auto";

    }, 1200);
}

/* =========================
   FIRST USER INTERACTION
========================= */

function startSite() {
    openEnvelope();
}

/* أول interaction فقط (iPhone safe) */
document.addEventListener("click", startSite, { once: true });
document.addEventListener("touchstart", startSite, { once: true });

/* =========================
   MUSIC BUTTON CONTROL
========================= */

if (musicBtn && music) {

    musicBtn.addEventListener("click", () => {

        if (music.paused) {

            music.volume = 0.4;
            music.play();

            musicBtn.classList.add("playing");
            musicBtn.innerHTML = `
                <div class="music-disc">
                    <i class="fa-solid fa-pause"></i>
                </div>
            `;

        } else {

            music.pause();

            musicBtn.classList.remove("playing");
            musicBtn.innerHTML = `
                <div class="music-disc">
                    <i class="fa-solid fa-music"></i>
                </div>
            `;
        }
    });
}

/* =========================
   VIDEO SPEED CONTROL
========================= */

if (heroVideo) heroVideo.playbackRate = 0.30;
if (cardVideo) cardVideo.playbackRate = 0.30;
if (bgVideo) bgVideo.playbackRate = 1.5;