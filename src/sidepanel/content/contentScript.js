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
  if (typeof text !== 'string') return null;
  const sanitizedText = text.slice(0, 100);
  const regex = new RegExp(sanitizedText.replace(/[^a-zA-Z0-9]/g, ''), 'i');

  return Array.from(clickableElements).find((clickEl) => {
    const content = (clickEl.textContent || '').slice(0, 100);
    const label = (clickEl.ariaLabel || '').slice(0, 100);
    return regex.test(content) || regex.test(label);
  });
}

function highlightElement() {
  if (elementsToHighlight.length > 0 && currentElementIndex < elementsToHighlight.length) {
    getClickableElements();
    const element = findButton(elementsToHighlight[currentElementIndex]);
    if (!element) {
      console.error(`Element not found: ${elementsToHighlight[currentIndex]}`);
    }
    element.style.border = '2px solid red';

    element.addEventListener('click', handleElementClick);
  }
}

function handleElementClick() {
  this.style.border = '';
  this.removeEventListener('click', handleElementClick);
  currentElementIndex++;
  updateCurrentIndex(currentElementIndex);

  setTimeout(() => {
    highlightElement();
  }, 2000);
}

function setupElementsToHighlight(selectors) {
  elementsToHighlight = selectors;
  currentElementIndex = 0;
  updateCurrentIndex(currentElementIndex);
  highlightElement();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startGuide' && request.selectors) {
    setupElementsToHighlight(request.selectors);
  }
  return true;
});

function updateCurrentIndex(index) {
  chrome.storage.local.set({ currentIndex: index }, () => {});
}

function getCurrentIndex() {
  chrome.storage.local.get(['currentIndex'], (result) => {
    currentElementIndex = result.currentIndex || 0;
    highlightElement();
  });
}
