document.addEventListener("DOMContentLoaded", () => {

    const timeline = document.querySelector(".timeline");

    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false;

    if (!timeline) return;

    /* ================= DESKTOP ================= */

    timeline.addEventListener("mousedown", (e) => {
        isDown = true;
        isDragging = false;
        startX = e.pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
    });

    timeline.addEventListener("mouseleave", () => isDown = false);
    timeline.addEventListener("mouseup", () => isDown = false);

    timeline.addEventListener("mousemove", (e) => {
        if (!isDown) return;

        const x = e.pageX - timeline.offsetLeft;
        const walk = (x - startX) * 1.5;

        if (Math.abs(walk) > 5) isDragging = true;

        timeline.scrollLeft = scrollLeft - walk;
    });

    /* ================= MOBILE (iPhone fix) ================= */

    timeline.addEventListener("touchstart", (e) => {
        startX = e.touches[0].pageX;
        scrollLeft = timeline.scrollLeft;
        isDragging = false;
    });

    timeline.addEventListener("touchmove", (e) => {
        const x = e.touches[0].pageX;
        const walk = (x - startX) * 1.5;

        if (Math.abs(walk) > 5) isDragging = true;

        timeline.scrollLeft = scrollLeft - walk;
    });

    /* منع الضغط أثناء السحب */
    timeline.addEventListener("click", (e) => {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

});
