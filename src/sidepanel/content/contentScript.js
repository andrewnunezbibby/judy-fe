console.log('Content script loaded on:', window.location.href);

let currentElementIndex = 0;
let elementsToHighlight;
let clickableElements;

function getClickableElements() {
  clickableElements = document.querySelectorAll(
    'a, button, input[type="button"], input[type="submit"], input[type="reset"], [role="button"], [onclick]'
  );
}

function findButton(text) {
  const regex = new RegExp(text.replace(/[^a-zA-Z0-9]/g, ''), 'i');

  return Array.from(clickableElements).find((clickEl) => {
    return regex.test(clickEl.textContent) || regex.test(clickEl.ariaLabel);
  });
}

function highlightElement() {
  if (elementsToHighlight.length > 0 && currentElementIndex < elementsToHighlight.length) {
    getClickableElements();
    const element = findButton(elementsToHighlight[currentElementIndex]);
    element.style.border = '2px solid red';

    element.addEventListener('click', handleElementClick);
  }
}

function handleElementClick() {
  this.style.border = '';
  this.removeEventListener('click', handleElementClick);
  currentElementIndex++;

  setTimeout(() => {
    highlightElement();
  }, 2000);
}

function setupElementsToHighlight(selectors) {
  elementsToHighlight = selectors;
  highlightElement();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('STARTING', request.selectors);
  if (request.action === 'startGuide' && request.selectors) {
    setupElementsToHighlight(request.selectors);
  }
  return true;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'highlightElements' && request.selector) {
    setupElementsToHighlight(request.selectors);
  }
});

function updateCurrentIndex(index) {
  chrome.storage.local.set({ currentIndex: index }, () => {
    console.log('Index updated');
  });
}

function getCurrentIndex() {
  chrome.storage.local.get(['currentIndex'], (result) => {
    currentElementIndex = result.currentIndex || 0;
    highlightElement();
  });
}
