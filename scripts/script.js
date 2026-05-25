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

    p.style.animationDuration =
        (4 + Math.random() * 5) + "s";

    p.style.opacity = Math.random();

    particles.appendChild(p);

    setTimeout(() => {

        p.remove();

    }, 9000);
}

/* شغّل particles فقط لو العنصر موجود */
if (particles) {

    setInterval(createParticle, 180);
}

/* =========================
   MUSIC
========================= */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let musicStartedFromEnvelope = false;

/* =========================
   OPEN INTRO
========================= */

let opened = false;

function openEnvelope() {

    if (opened) return;

    opened = true;

    /* 🎵 تشغيل الموسيقى */
    if (music && music.paused) {

        music.volume = 0.4;

        music.play().catch(() => {
            console.log("Autoplay blocked");
        });

        musicStartedFromEnvelope = true;

        if (musicBtn) {

            musicBtn.classList.add("playing");

            musicBtn.innerHTML = `
                <div class="music-disc">
                    <i class="fa-solid fa-pause"></i>
                </div>
            `;
        }
    }

    /* ✨ اخفاء شاشة البداية */
    if (scene) {

        scene.classList.add("hide");
    }

    /* ✨ اظهار الصفحة */
    setTimeout(() => {

        if (main) {

            main.classList.add("show");
        }

        /* السماح بالاسكرول */
        document.body.style.overflowY = "auto";

    }, 700);
}

/* =========================
   AUTO OPEN
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        openEnvelope();

    }, 3300);
});

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

const heroVideo = document.querySelector(".hero-video");
const cardVideo = document.querySelector(".card-video");
const bgVideo = document.querySelector(".bg-video");
/* تبطي السرعة */

if (heroVideo) {

    heroVideo.playbackRate = 0.30;
}

if (cardVideo) {

    cardVideo.playbackRate = 0.30;
}


if (bgVideo) {

    /* سرعة الفيديو */
    bgVideo.playbackRate = 2.5;
}