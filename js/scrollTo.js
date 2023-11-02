const headerIcon = document.querySelector('.header__icon');
const headerNav = document.querySelector('.header__nav');
const sayHello = document.querySelector('#SayHelloBtn');

sayHello.addEventListener('click', function(e){
    alert('Привет');
});

if (headerIcon){
    headerIcon.addEventListener('click', function(e){
        document.body.classList.toggle("lock");
        headerIcon.classList.toggle("nav__active");
        headerNav.classList.toggle("nav__active");
    });
}


const section = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.header-scroll');
const arrayOffset = [];

if (navLinks.length > 0){
    navLinks.forEach(elem => {
        elem.addEventListener('click', function(e){
            if (headerNav.classList.contains('nav__active')){
                document.body.classList.toggle("lock");
                headerIcon.classList.toggle("nav__active");
                headerNav.classList.toggle("nav__active");
            }
        });
    });
}

section.forEach(sec => {
    arrayOffset.push(sec.offsetTop - 80);
});

window.onscroll = () => {
    let top = window.scrollY;
    if (top >= arrayOffset[4]){
        navLinks.forEach(links => {
            links.classList.remove('link__active');
        });
        navLinks[4].classList.add('link__active');
    } else if (top > arrayOffset[3]){
        navLinks.forEach(links => {
            links.classList.remove('link__active');
        });
        navLinks[3].classList.add('link__active');
    } else if (top > arrayOffset[2]){
        navLinks.forEach(links => {
            links.classList.remove('link__active');
        });
        navLinks[2].classList.add('link__active');
    } else if (top > arrayOffset[1]){
        navLinks.forEach(links => {
            links.classList.remove('link__active');
        });
        navLinks[1].classList.add('link__active');
    } else if (top > arrayOffset[0]){
        navLinks.forEach(links => {
            links.classList.remove('link__active');
        });
        navLinks[0].classList.add('link__active');
    }
}


// window.onscroll = () => {
//     let top = window.scrollY;
//     section.forEach(sec => {
//         let offset = sec.offsetTop -72;
//         let height = sec.offsetHeight;
//         let id = sec.getAttribute('id');

//         if (top >= offset && top < offset + height){
//             navLinks.forEach(links => {
//                 links.classList.remove('link__active');
//                 if (links.getAttribute('href').replace('#', '') == id){
//                     links.classList.add('link__active');
//                 }
//             });
//         };
//     });
// }