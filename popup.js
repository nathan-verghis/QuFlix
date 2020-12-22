var checkbox = document.getElementById("queue");
var clear = document.getElementById("clear");
var next = document.getElementById("next");

// Keep checkbox updated
chrome.storage.sync.get('on', function(data) {
     checkbox.checked = data.on;
});

// Check if queue needs to be added
checkbox.addEventListener('change', function() {
    chrome.storage.sync.set({on: checkbox.checked}, function(){});
});

// Clear Queue
clear.addEventListener("click", function() {
    chrome.storage.sync.set({queue: []}, function(){});
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "Queue has been cleared!"})
    });
});

// Get Next video and remove it from queue
next.addEventListener("click", function() {
    chrome.storage.sync.get("queue", function(data) {

        if (data.queue.length > 0) {
            chrome.storage.sync.set({on: false}, function(){});
            var video = data.queue.shift()
            chrome.storage.sync.set({queue: data.queue}, function(){});
            chrome.tabs.update(null, {url: video});
        } else {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, {"message": "Nothing has been added to the queue yet :("})
            });
        }
    });
});
