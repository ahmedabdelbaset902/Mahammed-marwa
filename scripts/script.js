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
   🎬 VIDEO FIX (NO WAIT - iPhone SAFE)
========================= */

const prepareVideo = (v) => {
    if (!v) return;

    v.muted = true;
    v.playsInline = true;

    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    // ❌ منع التكرار
    v.removeAttribute("loop");

    // ⚡ تحميل خفيف
    v.setAttribute("preload", "metadata");
};

const playVideo = (v) => {
    if (!v) return;

    try {
        prepareVideo(v);

        v.currentTime = 0;

        const playPromise = v.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {});
        }

        // ✅ سرعة طبيعية
        v.playbackRate = 1;

        // ❌ وقف عند النهاية
        v.onended = () => {
            v.pause();
        };

    } catch (e) {
        console.log("Video error:", e);
    }
};

/* =========================
   STOP ON LOAD
========================= */

window.addEventListener("load", () => {

    [heroVideo, cardVideo, bgVideo].forEach(v => {
        if (!v) return;

        try {
            prepareVideo(v);
            v.pause();
            v.currentTime = 0;
        } catch (e) {}
    });

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";

    if (music) {
        music.pause();
        music.currentTime = 0;
        music.volume = 0;
    }

    if (main) {
        main.style.opacity = "0";
        main.style.transform = "translateY(40px)";
        main.style.visibility = "hidden";
    }

    if (scene) {
        scene.style.opacity = "1";
        scene.style.pointerEvents = "auto";
    }
});

/* =========================
   OPEN ENVELOPE
========================= */

let opened = false;

function openEnvelope() {

    if (opened) return;
    opened = true;

    // 🔥 مهم: شغل الفيديو فوراً بعد الضغط
    playVideo(bgVideo);
    playVideo(heroVideo);
    playVideo(cardVideo);

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

    /* ✨ scene exit */
    if (scene) {
        scene.style.transition = "opacity 1.5s ease";
        scene.style.opacity = "0";
        scene.style.pointerEvents = "none";
    }

    /* ✨ show main */
    setTimeout(() => {

        if (main) {
            main.style.transition = "opacity 1.5s ease, transform 1.5s ease";
            main.style.opacity = "1";
            main.style.transform = "translateY(0)";
            main.style.visibility = "visible";
            main.classList.add("show");
        }

        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
        document.documentElement.style.height = "auto";
        document.body.style.height = "auto";

        window.scrollTo({ top: 0, behavior: "smooth" });

    }, 1200);
}

/* =========================
   🔥 iPhone FIX (IMPORTANT)
========================= */

document.addEventListener("touchstart", openEnvelope, { once: true });
document.addEventListener("click", openEnvelope, { once: true });

/* =========================
   MUSIC CONTROL
========================= */
if (musicBtn && music) {

    musicBtn.addEventListener("click", () => {

        if (music.paused) {

            music.volume = 0.4;

            const playPromise = music.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {

                    musicBtn.classList.add("playing");
                    musicBtn.innerHTML = `
                        <div class="music-disc">
                            <i class="fa-solid fa-pause"></i>
                        </div>
                    `;

                }).catch(() => {
                    console.log("Play blocked");
                });
            }

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