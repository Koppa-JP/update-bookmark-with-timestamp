// Create a mainmenu with an icon.
browser.menus.create({
    id: "update-bookmark",
    title: "Update bookmark",
    contexts: ["bookmark"]
})

function formatToday(formatOptions) {
    const today = new Date();
    const formattedToday = Intl.DateTimeFormat([], formatOptions).format(today);
    return formattedToday;
}

async function updateBookmark(bookmarkId) {

    // Gets the list of active tabs in the currently active window.
    const tabs = await browser.tabs.query({ currentWindow: true, active: true });

    // When no tabs are opened, the process breaks.
    if (!tabs[0]) {
        return;
    }

    // Try to generate a new bookmark title from the saved information, and if failed, initialize it.

    let newTitle = "(" + formatToday({ month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }) + ")" + tabs[0].title;
    const newUrl = tabs[0].url;
    try {
        const updatingStyleObject = await browser.storage.local.get("updatingStyle");
        const timestampPositionObject = await browser.storage.local.get("timestampPosition");
        const dateFormatOptionsObject = await browser.storage.local.get("dateFormatOptions");
        if (updatingStyleObject.updatingStyle === "no-timestamp") {
            newTitle = tabs[0].title;
        } else if (timestampPositionObject.timestampPosition === "beginning-timestamp") {
            newTitle = "(" + formatToday(dateFormatOptionsObject.dateFormatOptions) + ")" + tabs[0].title;
        } else if (timestampPositionObject.timestampPosition === "ending-timestamp") {
            newTitle = tabs[0].title + "(" + formatToday(dateFormatOptionsObject.dateFormatOptions) + ")";
        }
    }
    catch {
        console.error(error)
    }
    browser.bookmarks.update(bookmarkId, { title: newTitle, url: newUrl });

}

browser.menus.onClicked.addListener(async (info) => {
    if (info.menuItemId === "update-bookmark") {
        await updateBookmark(info.bookmarkId)
    }
});