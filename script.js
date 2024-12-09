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
