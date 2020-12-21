
// Display Messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "Queue has been cleared!" || request.message === "Nothing has been added to the queue yet :(") {
        alert(request.message);
    }
})

