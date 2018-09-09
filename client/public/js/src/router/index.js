import routeTable from './routeTable.js';

const pageDisplay = document.getElementById('pageDisplay');


const renderPage = () => {
  pageDisplay.innerHTML = routeTable[window.location.hash] || routeTable[''];
};

window.addEventListener('hashchange', renderPage);
window.addEventListener('load', renderPage);
