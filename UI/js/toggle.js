function toggle() {
    const nav = document.querySelector('.getNav');
    console.log(nav);
    return nav.classList.toggle('nav-bar-toggle-display');
  }
  document.querySelector('.nav-bar-icon-toggle').addEventListener('click', toggle);