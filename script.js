const container = document.querySelector('.projects-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

const projectCards = document.querySelectorAll('.project-card');
const maxVisible = 4; // Número de tarjetas visibles
let currentIndex = 0;

// Función para actualizar el carrusel
function updateCarousel() {
  const cardWidth = projectCards[0].getBoundingClientRect().width; // Ancho de una tarjeta
  const gap = 8; // El espacio entre tarjetas
  const fullCardWidth = cardWidth + gap; // Ancho total (tarjeta + margen)
  const maxTranslate = (projectCards.length - maxVisible) * fullCardWidth;

  // Mantener el índice dentro de límites válidos
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > projectCards.length - maxVisible) currentIndex = projectCards.length - maxVisible;

  // Aplicar el desplazamiento
  container.style.transform = `translateX(-${currentIndex * fullCardWidth}px)`;

  // Desactivar botones cuando no sea posible avanzar
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex * fullCardWidth >= maxTranslate;
}

// Evento para retroceder
prevBtn.addEventListener('click', () => {
  currentIndex--;
  updateCarousel();
});

// Evento para avanzar
nextBtn.addEventListener('click', () => {
  currentIndex++;
  updateCarousel();
});

// Ajustar el carrusel al cargar y al cambiar el tamaño
window.addEventListener('load', updateCarousel);
window.addEventListener('resize', updateCarousel);
