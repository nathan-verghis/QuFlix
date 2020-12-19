
// https://www.netflix.com/watch/70171942?tctx=2%2C2%2C%2C%2C%2C Archer S5E2
// https://www.netflix.com/watch/70153382?tctx=2%2C1%2C%2C%2C%2C Family Guy S10E17
// https://www.netflix.com/watch/70195800?tctx=7%2C3%2C%2C%2C%2C Suits S4E6 https://www.netflix.com/watch/70283153?trackId=200257859 S1E9


alert("Hello from your NEW CHROME EXTENSION")

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
        var firstHref = $("a[href^='http']").eq(0).attr("href");
  
        console.log(firstHref);
      }
    }
);

