const timeline = document.querySelector(".timeline");

let isDown = false;
let startX;
let scrollLeft;

if (timeline) {

    timeline.addEventListener("mousedown", (e) => {
        isDown = true;
        timeline.classList.add("dragging");

        startX = e.pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
    });

    timeline.addEventListener("mouseleave", () => {
        isDown = false;
    });

    timeline.addEventListener("mouseup", () => {
        isDown = false;
    });

    timeline.addEventListener("mousemove", (e) => {
        if (!isDown) return;

        e.preventDefault();

        const x = e.pageX - timeline.offsetLeft;
        const walk = (x - startX) * 1.2; // 👈 قوة السحب

        timeline.scrollLeft = scrollLeft - walk;
    });

    // touch support (iOS + Android smooth feel)
    let startTouchX = 0;
    let startScroll = 0;

    timeline.addEventListener("touchstart", (e) => {
        startTouchX = e.touches[0].pageX;
        startScroll = timeline.scrollLeft;
    });

    timeline.addEventListener("touchmove", (e) => {
        const x = e.touches[0].pageX;
        const walk = (x - startTouchX) * 1.3;

        timeline.scrollLeft = startScroll - walk;
    }, { passive: true });
}