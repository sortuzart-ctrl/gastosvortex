async function cargarGastos() {
  const res = await fetch('/api/gastos');
  const gastos = await res.json();
  const tbody = document.querySelector('#tablaGastos tbody');
  tbody.innerHTML = '';
  gastos.forEach(g => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${g.servicio}</td>
      <td>${g.creador}</td>
      <td>${g.fecha}</td>
      <td>${g.detalle}</td>
      <td>${g.estado}</td>
      <td>${g.monto}</td>
      <td>${g.archivo ? `<a href="/uploads/${g.archivo}" target="_blank">Ver</a>` : ''}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById('formGasto').addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  try {
    const res = await fetch('/api/gastos', { method: 'POST', body: formData });
    const data = await res.json();
    console.log("Respuesta del servidor:", data);
    e.target.reset();
    cargarGastos();
  } catch (err) {
    console.error("Error al guardar gasto:", err);
  }
});
cargarGastos();