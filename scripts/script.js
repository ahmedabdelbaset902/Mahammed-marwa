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

    const stopVideo = (v) => {
        if (!v) return;
        v.pause();
        v.currentTime = 0;
        v.muted = true;
    };

    stopVideo(heroVideo);
    stopVideo(cardVideo);
    stopVideo(bgVideo);

    /* ⛔ منع السكروول */
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    /* ⛔ تجهيز الموسيقى */
    if (music) {
        music.pause();
        music.currentTime = 0;
        music.volume = 0;
    }

    /* ⛔ تجهيز main (مهم جدًا) */
    if (main) {
        main.style.opacity = "0";
        main.style.transform = "translateY(40px)";
        main.style.visibility = "hidden";
        main.style.display = "block";
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
        v.play().catch(() => {});
    };

    playVideo(heroVideo);
    playVideo(cardVideo);
    playVideo(bgVideo);

    /* 🎵 تشغيل الموسيقى + fade in */
    if (music) {
        music.currentTime = 0;
        music.volume = 0;

        music.play().catch(() => {});

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

    /* ✨ إخفاء scene */
    if (scene) {
        scene.style.transition = "all 1.2s ease";
        scene.style.opacity = "0";
        scene.style.transform = "scale(1.05)";
    }

    /* ✨ إظهار الموقع بشكل مضمون */
    setTimeout(() => {

        if (main) {
            main.style.transition = "all 1.4s ease";
            main.style.opacity = "1";
            main.style.transform = "translateY(0)";
            main.style.visibility = "visible";
            main.classList.add("show");
        }

        /* 🔥 أهم سطر لحل مشكلة السكروول */
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";

        /* ضمان السكروول يشتغل */
        window.scrollTo(0, 0);

    }, 1200);
}

/* =========================
   FIRST USER INTERACTION
========================= */

function startSite() {
    openEnvelope();
}

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
