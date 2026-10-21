// Menú hamburguesa: al tocar el botón, muestra u oculta el menú en celular
const boton = document.querySelector('.hamburguesa');
const menu = document.querySelector('nav');

boton.addEventListener('click', () => {
  const abierto = menu.classList.toggle('abierto');
  boton.setAttribute('aria-expanded', abierto);
});
