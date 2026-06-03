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
   VIDEO FIX
========================= */

const prepareVideo = (v) => {
    if (!v) return;

    v.muted = true;
    v.playsInline = true;

    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
};

const playVideo = (v) => {
    if (!v) return;

    try {
        prepareVideo(v);
        v.currentTime = 0;

        const p = v.play();
        if (p !== undefined) {
            p.catch(() => {});
        }

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
   🔥 FIXED AUDIO START (IMPORTANT)
========================= */

let opened = false;

function startAudio() {
    if (!music) return;

    try {
        music.pause();
        music.currentTime = 0;
        music.volume = 0;

        music.load(); // مهم للأندرويد

        const p = music.play();
        if (p !== undefined) {
            p.catch(() => {});
        }

        let vol = 0;
        const fade = setInterval(() => {
            vol += 0.03;
            music.volume = Math.min(vol, 0.4);
            if (vol >= 0.4) clearInterval(fade);
        }, 50);

    } catch (e) {}
}

/* =========================
   OPEN ENVELOPE
========================= */

function openEnvelope() {

    if (opened) return;
    opened = true;

    /* 🔥 IMPORTANT: الصوت لازم الأول */
    startAudio();

    /* 🎬 الفيديو */
    playVideo(bgVideo);
    playVideo(heroVideo);
    playVideo(cardVideo);

    /* 🎛️ زر الموسيقى */
    if (musicBtn) {
        musicBtn.classList.add("playing");
        musicBtn.innerHTML = `
            <div class="music-disc">
                <i class="fa-solid fa-pause"></i>
            </div>
        `;
    }

    /* ✨ إخفاء المشهد */
    if (scene) {
        scene.style.transition = "opacity 1.2s ease";
        scene.style.opacity = "0";
        scene.style.pointerEvents = "none";
    }

    /* ✨ إظهار المحتوى */
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

    }, 1000);
}

/* =========================
   EVENTS (IMPORTANT FIX)
========================= */

function startSite() {
    openEnvelope();
}

/* أهم حاجة: touchstart + click */
document.addEventListener("touchstart", startSite, { once: true });
document.addEventListener("click", startSite, { once: true });

if (btn) btn.addEventListener("click", openEnvelope);
if (bgVideo) bgVideo.addEventListener("click", openEnvelope);

/* =========================
   MUSIC CONTROL
========================= */

if (musicBtn && music) {

    musicBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        if (music.paused) {

            music.volume = 0.4;
            music.play().catch(() => {});

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


function addToCalendar() {

    const title = "حفل زفاف محمد & مروه";
    const details = "نتشرف بحضوركم حفل زفافنا";
    const location = "قاعة دايموند - قطور غربيه";

    const start = "20260605T200000";
    const end   = "20260606T000000";

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (!isIOS) {

        // ✅ ANDROID + DESKTOP → Google Calendar (أفضل تجربة)
        const googleUrl =
        `https://www.google.com/calendar/render?action=TEMPLATE
        &text=${encodeURIComponent(title)}
        &details=${encodeURIComponent(details)}
        &location=${encodeURIComponent(location)}
        &dates=${start}/${end}`;

        window.open(googleUrl, "_blank");

    } else {

        // 🍎 iOS → ICS file (native add to calendar)
        const icsContent =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding//EN
BEGIN:VEVENT
UID:123456
DTSTAMP:20260601T120000Z
SUMMARY:${title}
DTSTART:${start}
DTEND:${end}
LOCATION:${location}
DESCRIPTION:${details}
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], {
            type: "text/calendar;charset=utf-8"
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "wedding.ics";

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}