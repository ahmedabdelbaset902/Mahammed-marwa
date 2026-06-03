const timeline = document.querySelector(".timeline");

let isDown = false;
let startX = 0;
let scrollLeft = 0;

if (timeline) {

    timeline.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX;
        scrollLeft = timeline.scrollLeft;
    });

    timeline.addEventListener("mouseup", () => isDown = false);
    timeline.addEventListener("mouseleave", () => isDown = false);

    timeline.addEventListener("mousemove", (e) => {
        if (!isDown) return;

        e.preventDefault();

        const x = e.pageX;
        const walk = (x - startX) * 1.2;

        timeline.scrollLeft = scrollLeft - walk;
    });
}
