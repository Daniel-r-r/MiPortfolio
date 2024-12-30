const container = document.querySelector('.projects-container');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const projectCards = document.querySelectorAll('.project-card');
let projectsPerView = calculateProjectsPerView();
let currentIndex = 0;

// Función para calcular las tarjetas visibles dinámicamente
function calculateProjectsPerView() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 480) return 1; // 1 tarjeta para pantallas pequeñas
  if (screenWidth <= 768) return 2; // 2 tarjetas para pantallas medianas
  if (screenWidth <= 1024) return 3; // 3 tarjetas para pantallas grandes
  return 4; // 4 tarjetas para pantallas extra grandes
}

// Función para actualizar el carrusel
function updateCarousel() {
  const cardWidth = projectCards[0].getBoundingClientRect().width; // Ancho de una tarjeta
  const gap = 8; // Espacio entre tarjetas
  const fullCardWidth = cardWidth + gap; // Ancho total de tarjeta + margen
  const maxTranslate = (projectCards.length - projectsPerView) * fullCardWidth;

  // Mantener el índice dentro de límites válidos
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > projectCards.length - projectsPerView) {
    currentIndex = projectCards.length - projectsPerView;
  }

  // Si hay 1 tarjeta visible, centramos el contenedor
  if (projectsPerView === 1) {
    container.classList.add('single-view');
    projectCards.forEach(card => card.classList.add('single-card'));
  } else {
    container.classList.remove('single-view');
    projectCards.forEach(card => card.classList.remove('single-card'));
  }

  // Aplicar el desplazamiento
  container.style.transform = `translateX(-${currentIndex * fullCardWidth}px)`;

  // Deshabilitar botones según la posición
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex * fullCardWidth >= maxTranslate;
}

// Eventos para los botones de navegación
prevBtn.addEventListener('click', () => {
  currentIndex--;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  currentIndex++;
  updateCarousel();
});

// Recalcular las tarjetas visibles al cambiar el tamaño de la pantalla
function handleResize() {
  projectsPerView = calculateProjectsPerView();
  currentIndex = 0; // Reinicia la posición del carrusel
  updateCarousel(); // Actualiza el carrusel
}

window.addEventListener('resize', handleResize);
window.addEventListener('load', updateCarousel);


/****conocimientos */

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel-3d');
  const items = carousel.querySelectorAll('.carousel-item');
  let angle = 0;
  let animationFrameId = null;

  // Calcular el ángulo y el radio basado en el número de elementos
  const totalItems = items.length;
  const anglePerItem = 360 / totalItems;
  const radius = 288; // Ajusta este valor según el tamaño deseado del carrusel

  items.forEach((item, index) => {
    item.style.setProperty('--i', index);
    item.style.setProperty('--angle', `-${anglePerItem}deg`);
    item.style.setProperty('--radius', `${radius}px`);
  });

  function rotateCarousel() {
    angle += 0.5; // Ajusta la velocidad de rotación aquí
    carousel.style.transform = `rotateY(${angle}deg)`;
    animationFrameId = requestAnimationFrame(rotateCarousel);
  }

  // Iniciar la rotación automática
  rotateCarousel();

  // Manejo de eventos para detener y reanudar la rotación
  carousel.addEventListener('mouseenter', () => {
    cancelAnimationFrame(animationFrameId); // Detener la animación
  });

  carousel.addEventListener('mouseleave', () => {
    rotateCarousel(); // Reanudar la animación
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const techCategories = document.querySelectorAll(".tecnologia-categoria");
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });
  
  techCategories.forEach(category => {
    category.style.opacity = 0;
    category.style.transform = "translateY(50px)";
    observer.observe(category);
  });
});

 // Función para activar la descarga del CV
 function downloadCV() {
  // Se activa el enlace invisible para descargar el CV
  document.getElementById('download-link').click();
  
  // Aquí se podría activar un formulario de contacto u otra acción si es necesario
  openContactForm();
}

// Función para cambiar el estilo de la barra de navegación al hacer scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");

  // Si el usuario hace scroll hacia abajo, se agrega una clase a la barra de navegación
  if (window.scrollY > 50) {
    nav.classList.add("scroll");
  } else {
    // Si vuelve al principio, se quita la clase
    nav.classList.remove("scroll");
  }
});

