// background.js

// Called when the user clicks on the page action.
chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
            {
                // That fires when a page's URL contains "netflix.com"
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {hostEquals: 'www.netflix.com', schemes: ['https', 'http']}
                    })
                ],
                // Show the Extension's page action
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });

    // Sync storage for Queue
    chrome.storage.sync.set({queue:[], on:false}, function(){});
});
 // Add to queue
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        if (changeInfo.url.indexOf("netflix.com") != -1 && changeInfo.url.indexOf("/watch/") != -1) {
            chrome.storage.sync.get('on', function(data) {
                let toQueue = data.on;
                if (toQueue) {
                    chrome.storage.sync.get('queue', function(data) {
                        var temp = data.queue;
                        temp.push(changeInfo.url);
                        chrome.storage.sync.set({queue:temp}, function(){});
                    });
                    chrome.tabs.goBack(tabId, function() {});
                }
            });
        }
    }
});
