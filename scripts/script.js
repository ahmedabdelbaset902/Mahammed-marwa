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
   STOP EVERYTHING ON LOAD (iOS SAFE)
========================= */

window.addEventListener("load", () => {

    const stopVideo = (v) => {
        if (!v) return;
        try {
            v.pause();
            v.muted = true;
            // ❌ مهم: شيلنا currentTime reset لأنه بيعمل مشاكل في iPhone
        } catch (e) {}
    };

    stopVideo(heroVideo);
    stopVideo(cardVideo);
    stopVideo(bgVideo);

    /* 🔒 lock scroll */
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";

    /* 🎵 reset music */
    if (music) {
        music.pause();
        music.currentTime = 0;
        music.volume = 0;
    }

    /* 📄 hide main */
    if (main) {
        main.style.opacity = "0";
        main.style.transform = "translateY(40px)";
        main.style.visibility = "hidden";
    }

    if (scene) {
        scene.style.opacity = "1";
        scene.style.transform = "scale(1)";
        scene.style.pointerEvents = "auto";
    }
});

/* =========================
   OPEN ENVELOPE (SMOOTH iOS FIX)
========================= */

let opened = false;

async function openEnvelope() {

    if (opened) return;
    opened = true;

    const playVideo = async (v) => {
        if (!v) return;

        try {
            v.muted = true;
            v.playsInline = true;
            v.setAttribute("playsinline", "");

            await v.play();
        } catch (e) {
            console.log("Video play blocked:", e);
        }
    };

    /* 🎬 start videos */
    setTimeout(() => {
        playVideo(heroVideo);
        playVideo(cardVideo);
        playVideo(bgVideo);
    }, 250);

    /* 🎵 music fade in */
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

    /* 🎛️ music button */
    if (musicBtn) {
        musicBtn.classList.add("playing");
        musicBtn.innerHTML = `
            <div class="music-disc">
                <i class="fa-solid fa-pause"></i>
            </div>
        `;
    }

    /* ✨ smooth scene exit (NOT sudden) */
    if (scene) {
        scene.style.transition = "opacity 1.8s ease, transform 1.8s ease";
        scene.style.opacity = "0";
        scene.style.transform = "scale(1.05)";
        scene.style.pointerEvents = "none";
        scene.style.zIndex = "-1";
    }

    /* ✨ show main smoothly */
    setTimeout(() => {

        if (main) {
            main.style.transition = "opacity 2s ease, transform 2s ease";
            main.style.opacity = "1";
            main.style.transform = "translateY(0)";
            main.style.visibility = "visible";
            main.classList.add("show");
        }

        /* 🔥 iOS smooth scroll fix */
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
        document.documentElement.style.height = "auto";
        document.body.style.height = "auto";

        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }, 150);

    }, 1300);
}

/* =========================
   START ON FIRST TAP ONLY
========================= */

function startSite() {
    openEnvelope();
}

document.addEventListener("touchend", startSite, { once: true });
document.addEventListener("click", startSite, { once: true });

/* =========================
   MUSIC CONTROL
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
   VIDEO SPEED (CINEMATIC SAFE)
========================= */

if (heroVideo) heroVideo.playbackRate = 1;
if (cardVideo) cardVideo.playbackRate = 1;
if (bgVideo) bgVideo.playbackRate = 1;