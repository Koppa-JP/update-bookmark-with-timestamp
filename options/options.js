function saveOptions() {

    // List the checked elements for the next time the option page is opened.
    const checkedList = [];

    // Get the state of the radio buttons.
    let updatingStyle;
    let timestampPosition;

    if (noTimestamp.checked) {
        updatingStyle = "no-timestamp";
        checkedList.push("#no-timestamp");
    } else {
        updatingStyle = "with-timestamp";
        checkedList.push("#with-timestamp");
    }

    if (atBeginning.checked) {
        timestampPosition = "beginning-timestamp";
        checkedList.push("#beginning-timestamp");
    } else {
        timestampPosition = "ending-timestamp";
        checkedList.push("#ending-timestamp");
    }

    // Initialize the object and add elements depending on the state of the checkboxes.
    const dateFormatOptions = {};

    if (yearOption.checked) {
        dateFormatOptions.year = "numeric";
        checkedList.push("#year");
    }
    if (monthOption.checked) {
        dateFormatOptions.month = "numeric";
        checkedList.push("#month");
    }
    if (dayOption.checked) {
        dateFormatOptions.day = "numeric";
        checkedList.push("#day");
    }
    if (hourOption.checked) {
        dateFormatOptions.hour = "2-digit";
        checkedList.push("#hour");
    }
    if (minuteOption.checked) {
        dateFormatOptions.minute = "2-digit";
        checkedList.push("#minute");
    }
    if (secondOption.checked) {
        dateFormatOptions.second = "2-digit";
        checkedList.push("#second");
    }

    // Handle the case when none of the elements are chosen.
    if (!checkedList[2]) {
        updatingStyle = "no-timestamp";
    }

    // Save data to the local storage.
    browser.storage.local.set({
        updatingStyle: updatingStyle,
        timestampPosition: timestampPosition,
        dateFormatOptions: dateFormatOptions,
        checkedList: checkedList
    });

}

function checkOptions(list) {
    for (let item of list) {
        document.querySelector(item).setAttribute("checked", "true");
    }
}

function disableWithTimestampOptions() {
    document.querySelector(".with-timestamp-radio-buttons").setAttribute("disabled", "true");
    document.querySelector(".with-timestamp-checkboxes").setAttribute("disabled", "disabled");
}

async function restoreOptions() {

    // Try to get the saved check state, and if it failed, initialize the check state. 
    try {
        const checkedListObject = await browser.storage.local.get("checkedList");
        checkOptions(checkedListObject.checkedList);
    }
    catch {
        const initializeOptions = ["#with-timestamp", "#beginning-timestamp", "#month", "#day", "#hour", "#minute"];
        checkOptions(initializeOptions);
    }

    // If "No timestamp" is selected, disable the other options.
    if (noTimestamp.checked) {
        disableWithTimestampOptions();
    }
}

// Updating style radio buttons.
const noTimestamp = document.querySelector("#no-timestamp");
const withTimestamp = document.querySelector("#with-timestamp");

// Timestamp position radio buttons.
const atBeginning = document.querySelector("#beginning-timestamp");
const atEnding = document.querySelector("#ending-timestamp")

// Formatting options.
const yearOption = document.querySelector("#year");
const monthOption = document.querySelector("#month");
const dayOption = document.querySelector("#day");
const hourOption = document.querySelector("#hour");
const minuteOption = document.querySelector("#minute");
const secondOption = document.querySelector("#second");

const styleOptions = document.querySelector(".style-options");
const form = document.querySelector("form");

// If "No timestamp" is selected, disable the other options.
styleOptions.addEventListener("change", () => {
    if (noTimestamp.checked) {
        disableWithTimestampOptions();
    } else {
        document.querySelector(".with-timestamp-radio-buttons").removeAttribute("disabled");
        document.querySelector(".with-timestamp-checkboxes").removeAttribute("disabled");
    }
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    saveOptions();
});

document.addEventListener("DOMContentLoaded", restoreOptions);