// ===== CARRUSEL DE PORTADA =====
const SEGUNDOS_POR_FOTO = 5;   // cada cuántos segundos cambia la foto

document.querySelectorAll('.carrusel').forEach(function (carrusel) {
  const fotos = carrusel.querySelectorAll('.carrusel-foto');
  const cajaPuntos = carrusel.querySelector('.carrusel-puntos');
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let actual = 0;
  let timer;

  // Un puntito por foto
  const puntos = Array.from(fotos).map(function (_, i) {
    const p = document.createElement('button');
    p.type = 'button';
    p.className = 'carrusel-punto';
    p.setAttribute('aria-label', 'Ir a la foto ' + (i + 1));
    p.addEventListener('click', function () { ir(i); reiniciar(); });
    cajaPuntos.appendChild(p);
    return p;
  });

  function ir(n) {
    fotos[actual].classList.remove('activa');
    puntos[actual].classList.remove('activo');
    actual = (n + fotos.length) % fotos.length;
    fotos[actual].classList.add('activa');
    puntos[actual].classList.add('activo');
  }

  function reiniciar() {
    clearInterval(timer);
    if (!sinMovimiento) {
      timer = setInterval(function () { ir(actual + 1); }, SEGUNDOS_POR_FOTO * 1000);
    }
  }

  carrusel.querySelector('.carrusel-ant').addEventListener('click', function () { ir(actual - 1); reiniciar(); });
  carrusel.querySelector('.carrusel-sig').addEventListener('click', function () { ir(actual + 1); reiniciar(); });

  // Deslizar con el dedo en celular/tablet
  let inicioX = null;
  carrusel.addEventListener('touchstart', function (e) { inicioX = e.touches[0].clientX; }, { passive: true });
  carrusel.addEventListener('touchend', function (e) {
    if (inicioX === null) return;
    const dx = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(dx) > 50) { ir(dx < 0 ? actual + 1 : actual - 1); reiniciar(); }
    inicioX = null;
  });

  ir(0);
  reiniciar();
});
