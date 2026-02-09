// popup.js

document.getElementById("add").addEventListener("click", () => {
    // Get the current active tab
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const currentTab = tabs[0];
        const hostname = new URL(currentTab.url).hostname;
        
        chrome.storage.local.get(["blockedSites"], (result) => {
            let blockedSites = result.blockedSites || [];
            
            if (!blockedSites.includes(hostname)) {
                blockedSites.push(hostname);
                chrome.storage.local.set({blockedSites: blockedSites}, () => {
                    alert(`${hostname} added to blocked list.`);
                });
            } else {
                alert("Site already blocked.");
            }
        });
    });
});

document.getElementById("edit").addEventListener("click", () => {
    chrome.tabs.create({
        url: chrome.runtime.getURL("index.html")
    });
});