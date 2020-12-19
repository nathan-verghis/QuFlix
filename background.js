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

    
    // Create ContextMenu to add Show/Movie to queue
    chrome.contextMenus.create({contexts: ["link"], title: "Add to Queue", onclick: function(){
        alert("This worked")
    }}, function() {
        alert("Context Menu Created")
    })
});
