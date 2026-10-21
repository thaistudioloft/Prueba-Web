// Dibuja el calendario usando los datos de eventos.js (no hace falta editar este archivo)
const NOMBRES_MES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const MES_CORTO = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
const primerMes = new Date(hoy.getFullYear(), hoy.getMonth() - MESES_ANTES, 1);
let indice = MESES_ANTES;   // arranca en el mes actual
let elegido = null;         // día seleccionado (null = ninguno)

const elTitulo = document.getElementById('cal-titulo');
const elDias = document.getElementById('cal-dias');
const elPanel = document.getElementById('cal-panel');
const botAnt = document.getElementById('cal-ant');
const botSig = document.getElementById('cal-sig');

function aFecha(texto) { const [a, m, d] = texto.split('-').map(Number); return new Date(a, m - 1, d); }
function eventosDelDia(f) { return EVENTOS.filter(e => f >= aFecha(e.desde) && f <= aFecha(e.hasta || e.desde)); }

function textoRango(e) {
  const a = aFecha(e.desde), b = aFecha(e.hasta || e.desde);
  if (+a === +b) return `${a.getDate()} ${MES_CORTO[a.getMonth()]}`;
  if (a.getMonth() === b.getMonth()) return `${a.getDate()} al ${b.getDate()} ${MES_CORTO[b.getMonth()]}`;
  return `${a.getDate()} ${MES_CORTO[a.getMonth()]} al ${b.getDate()} ${MES_CORTO[b.getMonth()]}`;
}

function tarjeta(e) {
  const tipo = TIPOS[e.tipo] || { color: '#1F4A44' };
  const card = document.createElement('article');
  card.className = 'cal-evento';
  card.style.setProperty('--color', tipo.color);
  const enlaces = [];
  if (e.pagina) enlaces.push(`<a href="${e.pagina}">Ver más</a>`);
  if (e.whatsapp && !e.completo) enlaces.push(`<a href="${WHATSAPP}?text=${encodeURIComponent(e.whatsapp)}" target="_blank" rel="noopener">Reservar</a>`);
  card.innerHTML = `<h4>${e.titulo}</h4>
    <p>${textoRango(e)}${e.lugar ? ' · ' + e.lugar : ''}</p>
    ${e.estado ? `<span class="cal-estado${e.completo ? ' completo' : ''}">${e.estado}</span>` : ''}
    <div class="cal-enlaces">${enlaces.join('')}</div>`;
  return card;
}

function dibujar() {
  const mes = new Date(primerMes.getFullYear(), primerMes.getMonth() + indice, 1);
  elTitulo.textContent = `${NOMBRES_MES[mes.getMonth()]} ${mes.getFullYear()}`;
  botAnt.disabled = indice === 0;
  botSig.disabled = indice === MESES_TOTAL - 1;

  // Días (la semana empieza en lunes)
  elDias.innerHTML = '';
  const offset = (mes.getDay() + 6) % 7;
  const diasMes = new Date(mes.getFullYear(), mes.getMonth() + 1, 0).getDate();
  const celdas = Math.ceil((offset + diasMes) / 7) * 7;
  for (let i = 0; i < celdas; i++) {
    const f = new Date(mes.getFullYear(), mes.getMonth(), 1 - offset + i);
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cal-dia';
    b.innerHTML = `<span class="num">${f.getDate()}</span>`;
    if (f.getMonth() !== mes.getMonth()) { b.classList.add('fuera'); b.disabled = true; elDias.appendChild(b); continue; }
    if (+f === +hoy) b.classList.add('hoy');
    if (elegido && +f === +elegido) b.classList.add('elegido');
    const tipos = [...new Set(eventosDelDia(f).map(e => e.tipo))];
    if (tipos.length) {
      b.insertAdjacentHTML('beforeend', '<span class="puntos">' + tipos.map(t => `<i class="punto" style="background:${(TIPOS[t] || {}).color || '#1F4A44'}"></i>`).join('') + '</span>');
    }
    b.setAttribute('aria-label', f.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' }) + (tipos.length ? ', con actividades' : ''));
    b.addEventListener('click', () => { elegido = (elegido && +elegido === +f) ? null : f; dibujar(); });
    elDias.appendChild(b);
  }

  // Panel de detalle: el día elegido o todo el mes
  elPanel.innerHTML = '';
  const titulo = document.createElement('h3');
  let lista;
  if (elegido) {
    titulo.textContent = elegido.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
    lista = eventosDelDia(elegido);
  } else {
    titulo.textContent = 'Actividades de ' + NOMBRES_MES[mes.getMonth()];
    const fin = new Date(mes.getFullYear(), mes.getMonth() + 1, 0);
    lista = EVENTOS.filter(e => aFecha(e.hasta || e.desde) >= mes && aFecha(e.desde) <= fin)
                   .sort((a, b) => aFecha(a.desde) - aFecha(b.desde));
  }
  elPanel.appendChild(titulo);
  if (!lista.length) {
    const p = document.createElement('p');
    p.textContent = 'No hay actividades programadas.';
    elPanel.appendChild(p);
  } else {
    lista.forEach(e => elPanel.appendChild(tarjeta(e)));
  }
}

botAnt.addEventListener('click', () => { indice--; elegido = null; dibujar(); });
botSig.addEventListener('click', () => { indice++; elegido = null; dibujar(); });

// Leyenda de colores
const elLeyenda = document.getElementById('cal-leyenda');
Object.values(TIPOS).forEach(t => {
  elLeyenda.insertAdjacentHTML('beforeend', `<li><i class="punto" style="background:${t.color}"></i>${t.nombre}</li>`);
});

dibujar();
