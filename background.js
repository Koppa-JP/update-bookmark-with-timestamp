// Create a mainmenu with an icon.
browser.menus.create({
    id: "update-bookmark",
    title: "Update bookmark",
    contexts: ["bookmark"]
})

async function updateBookmark(bookmarkId) {
    // Gets the list of active tabs in the currently active window.
    const tabs = await browser.tabs.query({ currentWindow: true, active: true })
    // When no tabs are opened, the process breaks.
    if (!tabs[0]) {
        return;
    }
    const newTitle = tabs[0].title;
    const newUrl = tabs[0].url;
    browser.bookmarks.update(bookmarkId, { title: newTitle, url: newUrl });
}

browser.menus.onClicked.addListener(async (info) => {
    if (info.menuItemId === "update-bookmark") {
        await updateBookmark(info.bookmarkId)
    }
});