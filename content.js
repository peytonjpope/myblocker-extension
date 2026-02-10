// content.js

const url = new URL(window.location.href);

// Load blocked sites and check immediately
chrome.storage.local.get(["blockedSites"], (result) => {
    const blockedSites = result.blockedSites || [];
    
    const isBlocked = blockedSites.some(site => 
        url.hostname === site || url.hostname.endsWith("." + site)
    );
    
    if (isBlocked) {
        window.location.href = chrome.runtime.getURL("blocked-page/blocked.html");
    }
});