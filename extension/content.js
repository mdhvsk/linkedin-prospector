function collectLinks() {
    const links = Array.from(document.getElementsByTagName('a'))
    const uniqueLinks = [...new Set(
        links
          .map(a => a.href)
          .filter(href => href.startsWith('https://www.linkedin.com/in/'))
      )];
    
    return uniqueLinks;
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getLinks") {
      sendResponse({links: collectLinks()});

    }
  });


function processLink(index, url) {
  setTimeout(() => {
    const statusSpan = document.getElementById(`status-${index}`);
    statusSpan.textContent = 'Completed';
    statusSpan.className = 'completed';
  }, 2000); 
}