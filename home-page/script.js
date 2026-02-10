// script.js
let blockedSites = [];

const fieldset = document.getElementById("sites-fieldset");
const siteForm = document.getElementById('new-site-form');
const siteInput = document.getElementById('site-input');
const saveButton = document.getElementById('save');
const clearButton = document.getElementById('clear');

// Load sites from storage on page load
chrome.storage.local.get(["blockedSites"], (result) => {
    blockedSites = result.blockedSites || [];
    renderList();
});

function renderList() {
    fieldset.innerHTML = '';

    blockedSites.forEach((site, index) => {
        const div = document.createElement("div");
        div.className = "row";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `site${index}`;
        checkbox.class = `site`;
        checkbox.checked = true;

        const label = document.createElement("label");
        label.htmlFor = `site${index}`;
        label.textContent = site;

        div.appendChild(checkbox);
        div.appendChild(label);
        fieldset.appendChild(div);
    });
}

siteForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const enteredSite = siteInput.value;

    if (!blockedSites.includes(enteredSite)) {
        blockedSites.push(enteredSite);
        chrome.storage.local.set({blockedSites: blockedSites});
    } else {
        alert("Site already added.");
    }

    siteInput.value = '';
    renderList();
});

saveButton.addEventListener('click', function() {
    const checkboxes = fieldset.querySelectorAll('input[type="checkbox"]');
    const updatedSites = [];

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            updatedSites.push(blockedSites[index]);
        }
    });

    blockedSites = updatedSites;
    chrome.storage.local.set({blockedSites: blockedSites});
    renderList();
});

clearButton.addEventListener('click', function() {
    if (confirm("Are you sure you want to unblock all sites?")) {
        blockedSites = [];
        chrome.storage.local.set({blockedSites: blockedSites});
        renderList();
    }
});