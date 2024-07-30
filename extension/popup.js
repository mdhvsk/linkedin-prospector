document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "getLinks"}, function(response) {
        const linkList = document.getElementById('linkList');
        if (response && response.links) {
          response.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link;
            linkElement.textContent = link;
            linkElement.target = '_blank';
            const listItem = document.createElement('div');
            linkList.appendChild(listItem);
            listItem.appendChild(linkElement);

          });
        } else {
          linkList.textContent = 'No links found or error occurred.';
        }
      });
    });
  });