"use strict";

const heroSection = document.querySelector(".hero__section");
const nav = document.querySelector(".header__nav");
const hamburgerBtn = document.querySelector(".hamburger");
const navLinks = document.querySelectorAll(".header__link");
const heroList = document.querySelector(".hero__list")

// Stick nav
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
    heroList.classList.add('mobile--hidden');
  }
  else {
    nav.classList.remove("sticky");
    heroList.classList.remove('mobile--hidden');
  }
};

const heroObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
heroObserver.observe(heroSection);

// Wave animation

const waveAnimate = function () {
  const wave = document.querySelector(".hero__wave svg");
  wave.classList.add("wave");
};

window.addEventListener("load", waveAnimate);

// Mobile Navigation

const openNav = function () {
  hamburgerBtn.classList.toggle("is-active");
  nav.classList.toggle("nav-open");
};

hamburgerBtn.addEventListener("click", openNav);
navLinks.forEach((link) => link.addEventListener("click", openNav));

// Footer year
const year = document.querySelector(".footer__year");
year.textContent = new Date().getFullYear();


/*=============== MIXITUP FILTER PORTFOLIO ===============*/

// Projects
const inializeMixitup = () => {
  let mixerPortfolio = mixitup('.work__container', {
    selectors: {
      target: '.work__card'
    },
    animation: {
      duration: 300
    }
  });

/* Link active work */
  const linkWork = document.querySelectorAll('.work__item')
  
  function activeWork() {
      linkWork.forEach(l => l.classList.remove('active-work'))
      this.classList.add('active-work')
  }

  linkWork.forEach(l => l.addEventListener('click', activeWork))
}


const fetchProjects = async () => {
  const res = await fetch('/data.json');
  const data = await res.json();
  return data.projects;
} 

const renderModal = (project) => {
  const overlay = document.querySelector('.services__modal');
  const modal = document.querySelector('.services__modal');
  
  const markup = `
  <div class="services__modal-content">
    <i class="bx bx-x services__modal-close"></i>

    <h3 class="services__modal-title">${project.name}</h3>
    <p class="services__modal-description">
      ${project.description}
    </p>
  </div>
  `

// Modal List 
//   <ul class="services__modal-list">
//   <li class="services__modal-item">
//     <i class="bx bx-check services__modal-icon"></i>
//     <p class="services__modal-info">
//       Lorem ipsum dolor sit amet.
//     </p>
//   </li>
//   <li class="services__modal-item">
//     <i class="bx bx-check services__modal-icon"></i>
//     <p class="services__modal-info">
//       Lorem ipsum dolor sit amet.
//     </p>
//   </li>
//   <li class="services__modal-item">
//     <i class="bx bx-check services__modal-icon"></i>
//     <p class="services__modal-info">
//       Lorem ipsum dolor sit amet.
//     </p>
//   </li>
// </ul>
  modal.innerHTML = markup;

  modal.querySelector('.services__modal-content .services__modal-close').addEventListener('click', toggleModal)
  overlay.addEventListener('click', (e) => {
    if (e.target.classList.value === 'overlay') toggleModal()
  })
}

const toggleModal = () => {
  const overlay = document.querySelector('.overlay');

  overlay.classList.toggle('hidden');
}

const renderProjects = async () => {
  const projects = await fetchProjects();

  const projectsContainerEl = document.querySelector('.work__container');

  projectsContainerEl.innerHTML = ``;

  projects.forEach(project => {
    const markup = `
      <div class="work__card mix ${project.categories.join(' ')}">
            <img
              src="${project.image}"
              alt=""
              class="work__img"
            />

            <div class ="work__text">
              <h3 class="work__title">${project.name}</h3>

              <div class="work-button__container">
                <a href="${project.github}" class="work__button">
                  <i class="bx bxl-github github"></i>
                </a>
                <a href=${project.demo}" class="work__button">
                  <h2 class="demo">DEMO</h2>
                </a>
                <button class="work__button button--modal">
                  <h2 class="demo"><i class='bx bx-right-arrow-alt'></i></h2>
                </button>
              </div>
            </div>
          </div>
    `

    
    projectsContainerEl.insertAdjacentHTML("beforeend", markup);

    Array.from(projectsContainerEl.querySelectorAll('.button--modal')).at(-1).addEventListener('click', () => {
      renderModal(project)
      toggleModal();
    });
  })

  inializeMixitup();
};


renderProjects(projects)

