const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const input = document.querySelector(".counter input");

if (minus && plus && input) {

    minus.addEventListener("click", () => {

        let value = parseInt(input.value);

        if (value > 1) input.value = value - 1;
    });

    plus.addEventListener("click", () => {

        let value = parseInt(input.value);

        if (value < 10) input.value = value + 1;
    });
}