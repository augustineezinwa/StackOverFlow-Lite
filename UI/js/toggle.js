function toggle () {
    
    const nav = document.querySelectorAll('.callNav');
   
    nav.forEach(x => {
        if(x.style.display === '' || x.style.display === 'none') {
            x.style.display = 'block';
        } else {
            x.style.display = '';
        }
    });
   console.log(nav);
}

const dropdownButton = document.querySelector('.dropdown-icon');
dropdownButton.addEventListener('click', toggle);