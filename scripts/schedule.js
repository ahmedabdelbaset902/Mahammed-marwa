const items = document.querySelectorAll(".timeline-item");

function checkItems() {
    items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();

        // مهم: قياس داخل الـ horizontal container
        const visible =
            rect.left < window.innerWidth &&
            rect.right > 0;

        if (visible) {
            setTimeout(() => {
                item.classList.add("show");
            }, index * 150);
        }
    });
}

// scroll على الـ timeline نفسه مش window
document.querySelector(".timeline").addEventListener("scroll", checkItems);

// أول تشغيل
checkItems();