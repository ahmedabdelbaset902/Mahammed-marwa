const form = document.getElementById("rsvpForm");

const guestsInput = document.getElementById("guests");
const minusBtn = document.querySelector(".minus");
const plusBtn = document.querySelector(".plus");

// =========================
// COUNTER LOGIC
// =========================

minusBtn.addEventListener("click", () => {
    let value = parseInt(guestsInput.value);

    if (value > 1) {
        guestsInput.value = value - 1;
    }
});

plusBtn.addEventListener("click", () => {
    let value = parseInt(guestsInput.value);

    if (value < 10) {
        guestsInput.value = value + 1;
    }
});

// حماية لو المستخدم كتب يدويًا
guestsInput.addEventListener("input", () => {
    let value = parseInt(guestsInput.value);

    if (isNaN(value) || value < 1) {
        guestsInput.value = 1;
    }

    if (value > 10) {
        guestsInput.value = 10;
    }
});

// =========================
// FORM SUBMIT
// =========================

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", document.getElementById("name").value);
    formData.append("guests", guestsInput.value);
    formData.append("attendance", document.getElementById("attendance").value);

    try {
        await fetch("https://script.google.com/macros/s/AKfycbwJHKhSfvMXalLOerc3H8FxvcmeOF9AyHyYgoEhOikheujyX3AWxt53pJDZHTUx0bhI/exec", {
            method: "POST",
            body: formData,
            mode: "no-cors"
        });

        alert("Reservation Sent 🤍");
        form.reset();

        // reset default value بعد الريست
        guestsInput.value = 1;

    } catch (error) {
        console.error(error);
        alert("Something went wrong ❌");
    }
});