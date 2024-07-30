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

            
            const linkItem = document.createElement('p');
            linkItem.textContent = "completed"
            linkItem.className = 'link-item';
            // linkItem.id = `status-${index}`
        //     linkItem.innerHTML = `
        //   <a href = ${link}>${link}</a>
        //   <span id="status-${index}"></span>
        // `;
        linkList.appendChild(linkItem);

        // setTimeout(() => {
        //   processLink(index, link.href);
        // }, index * 1000);
          }
        );

        } else {
          linkList.textContent = 'No links found or error occurred.';
        }
      });
    });
  });