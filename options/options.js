function saveOptions(data) {
    const updatingStyle = data.get("updating-style");
    const timestampPosition = data.get("timestamp-position");

    let dateFormatOptions = {};
    if (updatingStyle === "with-timestamp") {
        if (document.querySelector("#year").checked) {
            dateFormatOptions.year = "numeric";
        }
        if (document.querySelector("#month").checked) {
            dateFormatOptions.month = "numeric";
        }
        if (document.querySelector("#day").checked) {
            dateFormatOptions.day = "numeric";
        }
        if (document.querySelector("#hour").checked) {
            dateFormatOptions.hour = "2-digit";
        }
        if (document.querySelector("#minute").checked) {
            dateFormatOptions.minute = "2-digit";
        }
        if (document.querySelector("#second").checked) {
            dateFormatOptions.second = "2-digit";
        }
    }
    console.log(updatingStyle, timestampPosition, dateFormatOptions);
}
const styleOptions = document.querySelector(".style-options");
const form = document.querySelector("form");
styleOptions.addEventListener("change", () => {
    if (document.querySelector("#no-timestamp").checked) {
        document.querySelector(".with-timestamp-radio-buttons").setAttribute("disabled", "true");
        document.querySelector(".with-timestamp-checkboxes").setAttribute("disabled", "disabled");
    } else {
        document.querySelector(".with-timestamp-radio-buttons").removeAttribute("disabled");
        document.querySelector(".with-timestamp-checkboxes").removeAttribute("disabled");
    }
})
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    saveOptions(data);
});