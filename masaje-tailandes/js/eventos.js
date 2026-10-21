// ============================================================
//  CONFIGURACIÓN DEL CALENDARIO (lo único que vas a editar)
// ============================================================

const MESES_ANTES = 2;    // cuántos meses ANTERIORES al mes actual se muestran
const MESES_TOTAL = 12;   // cantidad total de meses (incluye los anteriores y el actual)
//   Para achicar los meses futuros: bajá MESES_TOTAL. Ejemplo: 6.

const WHATSAPP = "https://wa.me/549XXXXXXXXXX";   // tu número

// Tipos de actividad y su color (el color es el del puntito)
const TIPOS = {
  inicial:   { nombre: "Formación inicial",  color: "#1F4A44" },
  avanzada:  { nombre: "Formación avanzada", color: "#E0A526" },
  retiro:    { nombre: "Retiro",             color: "#B4533C" },
  viaje:     { nombre: "Viaje a Tailandia",  color: "#3B6EA5" },
  especial:  { nombre: "Curso especial",     color: "#7A5C9E" },
  yoga:      { nombre: "Yoga",               color: "#5E9C6B" }
};

// ============================================================
//  EVENTOS: una línea { ... } por actividad.
//  Fechas en formato AAAA-MM-DD. "hasta" es opcional (si dura un solo día, no lo pongas).
//  Si está completo, agregá  completo: true  y desaparece el botón Reservar.
//  Los datos de abajo son EJEMPLOS: reemplazalos por los reales.
//  Cada línea termina en coma, excepto la última.
// ============================================================
const EVENTOS = [
  { desde: "2026-10-05", hasta: "2026-10-06", tipo: "inicial",  titulo: "Formación inicial",  lugar: "Buenos Aires", estado: "Cupos disponibles", pagina: "formacion-inicial.html",  whatsapp: "Hola! Quiero reservar la Formación inicial de octubre" },
  { desde: "2026-11-02", hasta: "2026-11-03", tipo: "inicial",  titulo: "Formación inicial",  lugar: "Buenos Aires", estado: "Últimos lugares",   pagina: "formacion-inicial.html",  whatsapp: "Hola! Quiero reservar la Formación inicial de noviembre" },
  { desde: "2026-11-09", hasta: "2026-11-10", tipo: "avanzada", titulo: "Formación avanzada", lugar: "Buenos Aires", estado: "Completo", completo: true, pagina: "formacion-avanzada.html" },
  { desde: "2026-12-14", hasta: "2026-12-15", tipo: "avanzada", titulo: "Formación avanzada", lugar: "Buenos Aires", estado: "Cupos disponibles", pagina: "formacion-avanzada.html", whatsapp: "Hola! Quiero reservar la Formación avanzada de diciembre" },
  { desde: "2027-02-10", hasta: "2027-02-20", tipo: "retiro",   titulo: "Retiro de Masaje Tailandés + Yoga + Meditación", lugar: "El Bolsón, Patagonia", estado: "Cupos disponibles", pagina: "retiros.html", whatsapp: "Hola! Quiero reservar el Retiro de febrero" },
  { desde: "2027-04-12", hasta: "2027-04-30", tipo: "viaje",    titulo: "Viaje a Tailandia",  lugar: "Tailandia",    estado: "Consultar",         pagina: "viaje-a-tailandia.html",  whatsapp: "Hola! Quiero info del Viaje a Tailandia" }
];
