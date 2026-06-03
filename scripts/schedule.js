const timeline = document.querySelector(".timeline");

if (timeline) {
    let isDown = false;
    let startX;
    let scrollLeft;

    timeline.addEventListener("touchstart", (e) => {
        isDown = true;
        startX = e.touches[0].pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
    });

    timeline.addEventListener("touchmove", (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - timeline.offsetLeft;
        const walk = (x - startX) * 1.5;
        timeline.scrollLeft = scrollLeft - walk;
    });

    timeline.addEventListener("touchend", () => {
        isDown = false;
    });
}