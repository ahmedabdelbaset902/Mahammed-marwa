// ===============================
// SCHEDULE ANIMATION - CLEAN VERSION
// ===============================

// كل العناصر
const items = document.querySelectorAll(".timeline-item");

// observer
const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            const item = entry.target;
            const index = [...items].indexOf(item);

            // delay لكل عنصر
            setTimeout(() => {
                item.classList.add("show");
            }, index * 200);

            // يخليه يظهر مرة واحدة بس
            observer.unobserve(item);
        }

    });

}, {
    threshold: 0.3
});

// تشغيل observer
items.forEach(item => observer.observe(item));
