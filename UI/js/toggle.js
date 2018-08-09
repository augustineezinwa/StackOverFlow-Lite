function toggle () {
    
    const nav = document.querySelectorAll('.callNav');
   
     nav.forEach(x => { 
         x.classList.toggle('invisible');
         x.classList.toggle('render');
        }); 
   console.log(nav);
}

 