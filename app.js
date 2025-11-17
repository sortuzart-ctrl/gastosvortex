// Base de datos en memoria (localStorage)
let servicios = [];
let editingId = null;

// Listas configurables
let creadores = [];
let empresas = [];
let faenas = [];

// Datos iniciales de ejemplo basados en la imagen
const datosIniciales = [
    {
        id: 1,
        servicio: 'JUAN CARDENAS',
        creador: 'SEBASTIAN',
        fecha: '2025-05-15',
        detalle: 'TRASLADO DE EQUIPO',
        estado: 'COMPLETADO',
        factura: '1217',
        monto: 15000,
        archivo: '',
        observaciones: '',
        faena: 'MULTI X VORTEX'
    },
    {
        id: 2,
        servicio: 'JUAN CARDENAS',
        creador: 'SEBASTIAN',
        fecha: '2025-05-20',
        detalle: 'TRASLADO DE EQUIPO',
        estado: 'COMPLETADO',
        factura: '1217',
        monto: 35000,
        archivo: '',
        observaciones: '',
        faena: 'MULTI X VORTEX'
    },
    {
        id: 3,
        servicio: 'PATRICIA CARDENAS',
        creador: 'SEBASTIAN',
        fecha: '2025-06-04',
        detalle: 'TRABAJO PODA Y DESBROCE GAS PULQUI - PUERTO MONTT CENTRO SURESTE',
        estado: 'COMPLETADO',
        factura: '202',
        monto: 90000,
        archivo: '',
        observaciones: '',
        faena: 'CERMAQ'
    },
    {
        id: 4,
        servicio: 'TIBUROB',
        creador: 'SEBASTIAN',
        fecha: '2025-06-10',
        detalle: 'REPARACION DE ROV MARCACCI',
        estado: 'COMPLETADO',
        factura: '38',
        monto: 327250,
        archivo: '',
        observaciones: '',
        faena: 'INSPECCION DARWIN'
    },
    {
        id: 5,
        servicio: 'TIBUROB',
        creador: 'SEBASTIAN',
        fecha: '2025-06-10',
        detalle: 'REPARACION DE ROV MARCACCI',
        estado: 'COMPLETADO',
        factura: '33',
        monto: 345100,
        archivo: '',
        observaciones: '',
        faena: 'INSPECCION DARWIN'
    },
    {
        id: 6,
        servicio: 'JUAN CARDENAS',
        creador: 'SEBASTIAN',
        fecha: '2025-06-05',
        detalle: '',
        estado: 'COMPLETADO',
        factura: '1226',
        monto: 75000,
        archivo: '',
        observaciones: '',
        faena: 'CERMAQ'
    },
    {
        id: 7,
        servicio: 'MIRZA VERA',
        creador: 'SEBASTIAN',
        fecha: '2025-06-09',
        detalle: 'Traslado 9 de junio traslado de pasajero de Yatehua a base de Quillen $35.000, 10 de junio traslado de base Quillen a Quicavi $90.000',
        estado: 'COMPLETADO',
        factura: '',
        monto: 125000,
        archivo: '',
        observaciones: '',
        faena: 'CERMAQ'
    },
    {
        id: 8,
        servicio: 'ELMUT ROJAS',
        creador: 'SEBASTIAN',
        fecha: '2025-06-15',
        detalle: 'traslado de rov desde puerto cisne a balmaceda',
        estado: 'COMPLETADO',
        factura: '278',
        monto: 300000,
        archivo: '',
        observaciones: '',
        faena: 'INSPECCION PUYUHUAPI'
    },
    {
        id: 9,
        servicio: 'ELMUT ROJAS',
        creador: 'SEBASTIAN',
        fecha: '2025-06-13',
        detalle: 'encomienda rov balmaceda puerto montt',
        estado: 'COMPLETADO',
        factura: '2464710',
        monto: 113555,
        archivo: '',
        observaciones: '',
        faena: 'INSPECCION PUYUHUAPI'
    },
    {
        id: 10,
        servicio: 'JUAN CARDENAS',
        creador: 'SEBASTIAN',
        fecha: '2025-06-12',
        detalle: 'TRASLADO CRUCE MOCOPULLI A CALEN INGRESO MARIO OYARZO CENTRO VOIGUE',
        estado: 'COMPLETADO',
        factura: '1227',
        monto: 35000,
        archivo: '',
        observaciones: '',
        faena: 'CERMAQ'
    },
    {
        id: 11,
        servicio: 'EJEMPLO PENDIENTE',
        creador: 'SEBASTIAN',
        fecha: '2025-11-15',
        detalle: 'Servicio pendiente de pago',
        estado: 'PENDIENTE',
        factura: '1500',
        monto: 150000,
        archivo: '',
        observaciones: 'Revisar pago',
        faena: 'MULTI X VORTEX'
    }
];

// Charts instances
let chartFaenas, chartEstados, chartPrincipal, chartSecundario;

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();
    inicializarEventos();
    cambiarVista('dashboard');
    actualizarDashboard();
    renderizarTabla();
    cargarFiltros();
});

// Cargar datos del localStorage o usar datos iniciales
function cargarDatos() {
    const datosGuardados = localStorage.getItem('servicios');
    if (datosGuardados) {
        servicios = JSON.parse(datosGuardados);
    } else {
        servicios = datosIniciales;
        guardarDatos();
    }
    
    // Cargar listas configurables
    const creadoresGuardados = localStorage.getItem('creadores');
    if (creadoresGuardados) {
        creadores = JSON.parse(creadoresGuardados);
    } else {
        creadores = ['SEBASTIAN'];
        localStorage.setItem('creadores', JSON.stringify(creadores));
    }
    
    const empresasGuardadas = localStorage.getItem('empresas');
    if (empresasGuardadas) {
        empresas = JSON.parse(empresasGuardadas);
    } else {
        empresas = ['JUAN CARDENAS', 'PATRICIA CARDENAS', 'TIBUROB', 'MIRZA VERA', 'ELMUT ROJAS', 'YOHANA HORMAZABAL HOSPEDAJE MELINKA'];
        localStorage.setItem('empresas', JSON.stringify(empresas));
    }
    
    const faenasGuardadas = localStorage.getItem('faenas');
    if (faenasGuardadas) {
        faenas = JSON.parse(faenasGuardadas);
    } else {
        faenas = ['MULTI X VORTEX', 'CERMAQ', 'INSPECCION DARWIN', 'INSPECCION PUYUHUAPI'];
        localStorage.setItem('faenas', JSON.stringify(faenas));
    }
}

// Guardar datos en localStorage
function guardarDatos() {
    localStorage.setItem('servicios', JSON.stringify(servicios));
}

// Inicializar eventos
function inicializarEventos() {
    // Navegación
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const vista = this.dataset.view;
            cambiarVista(vista);
        });
    });

    // Botones principales
    document.getElementById('btnNuevoServicio').addEventListener('click', abrirModalNuevo);
    document.getElementById('btnExportarExcel').addEventListener('click', exportarExcel);

    // Modal
    document.querySelector('.close').addEventListener('click', cerrarModal);
    document.getElementById('btnCancelar').addEventListener('click', cerrarModal);
    document.getElementById('formServicio').addEventListener('submit', guardarServicio);
    
    // Archivo input - previsualización
    document.getElementById('inputArchivo').addEventListener('change', previsualizarArchivo);

    // Filtros
    document.getElementById('searchInput').addEventListener('input', aplicarFiltros);
    document.getElementById('filterEstado').addEventListener('change', aplicarFiltros);
    document.getElementById('filterFaena').addEventListener('change', aplicarFiltros);
    document.getElementById('filterCreador').addEventListener('change', aplicarFiltros);
    document.getElementById('filterFechaDesde').addEventListener('change', aplicarFiltros);
    document.getElementById('filterFechaHasta').addEventListener('change', aplicarFiltros);
    document.getElementById('btnLimpiarFiltros').addEventListener('click', limpiarFiltros);

    // Gráficos
    document.getElementById('tipoGrafico').addEventListener('change', actualizarGraficos);
    document.getElementById('tipoChart').addEventListener('change', actualizarGraficos);

    // Administración
    document.getElementById('btnAgregarCreador').addEventListener('click', () => agregarItem('creador'));
    document.getElementById('btnAgregarEmpresa').addEventListener('click', () => agregarItem('empresa'));
    document.getElementById('btnAgregarFaena').addEventListener('click', () => agregarItem('faena'));

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('modalServicio');
        if (e.target === modal) {
            cerrarModal();
        }
    });
}

// Cambiar vista
function cambiarVista(vista) {
    // Actualizar menú
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-view="${vista}"]`).classList.add('active');

    // Actualizar vistas
    document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
    });
    document.getElementById(`${vista}-view`).classList.add('active');

    // Actualizar título
    const titulos = {
        dashboard: 'Dashboard',
        servicios: 'Gestión de Servicios',
        graficos: 'Análisis Gráfico',
        reportes: 'Reportes',
        administracion: 'Administración'
    };
    document.getElementById('view-title').textContent = titulos[vista];

    // Cargar datos específicos de la vista
    if (vista === 'dashboard') {
        actualizarDashboard();
    } else if (vista === 'graficos') {
        actualizarGraficos();
    } else if (vista === 'reportes') {
        generarReportes();
    } else if (vista === 'administracion') {
        mostrarAdministracion();
    }
}

// Actualizar Dashboard
function actualizarDashboard() {
    const completados = servicios.filter(s => s.estado === 'COMPLETADO').length;
    const totalMonto = servicios.reduce((sum, s) => sum + parseFloat(s.monto || 0), 0);
    const faenas = [...new Set(servicios.map(s => s.faena))].length;

    document.getElementById('totalMonto').textContent = formatearMoneda(totalMonto);
    document.getElementById('totalCompletados').textContent = completados;
    document.getElementById('totalServicios').textContent = servicios.length;
    document.getElementById('totalFaenas').textContent = faenas;

    // Mostrar alertas de pendientes
    mostrarAlertasPendientes();

    // Gráficos del dashboard
    crearGraficoFaenas();
    crearGraficoEstados();
}

// Mostrar alertas de pagos pendientes
function mostrarAlertasPendientes() {
    const container = document.getElementById('alertasPendientes');
    const pendientes = servicios.filter(s => s.estado === 'PENDIENTE' || s.estado === 'EN PROCESO');
    
    if (pendientes.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    const totalPendiente = pendientes.reduce((sum, s) => sum + parseFloat(s.monto || 0), 0);
    
    let html = `
        <div class="alerta alerta-warning">
            <div class="alerta-header">
                <span class="alerta-icon">⚠️</span>
                <h3>Pagos Pendientes</h3>
                <span class="alerta-badge">${pendientes.length}</span>
            </div>
            <div class="alerta-body">
                <p class="alerta-total">Total pendiente: <strong>${formatearMoneda(totalPendiente)}</strong></p>
                <div class="alerta-lista">
    `;
    
    pendientes.forEach(servicio => {
        const diasPendientes = calcularDiasPendientes(servicio.fecha);
        const urgente = diasPendientes > 30 ? 'urgente' : '';
        
        html += `
            <div class="alerta-item ${urgente}" onclick="irAServicio(${servicio.id})">
                <div class="alerta-item-info">
                    <span class="alerta-item-titulo">${servicio.servicio} - ${servicio.faena}</span>
                    <span class="alerta-item-fecha">${formatearFecha(servicio.fecha)} (${diasPendientes} días)</span>
                </div>
                <div class="alerta-item-monto">${formatearMoneda(servicio.monto)}</div>
            </div>
        `;
    });
    
    html += `
                </div>
                <button class="btn btn-primary" onclick="filtrarPendientes()">Ver todos los pendientes</button>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Calcular días desde la fecha del servicio
function calcularDiasPendientes(fecha) {
    const fechaServicio = new Date(fecha);
    const hoy = new Date();
    const diferencia = hoy - fechaServicio;
    return Math.floor(diferencia / (1000 * 60 * 60 * 24));
}

// Ir a un servicio específico
function irAServicio(id) {
    cambiarVista('servicios');
    // Resaltar el servicio
    setTimeout(() => {
        const rows = document.querySelectorAll('#tablaBody tr');
        rows.forEach(row => {
            const editBtn = row.querySelector('button[onclick*="editarServicio"]');
            if (editBtn && editBtn.onclick.toString().includes(id)) {
                row.style.background = '#fef3c7';
                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => {
                    row.style.background = '';
                }, 3000);
            }
        });
    }, 300);
}

// Filtrar servicios pendientes
function filtrarPendientes() {
    cambiarVista('servicios');
    setTimeout(() => {
        document.getElementById('filterEstado').value = 'PENDIENTE';
        aplicarFiltros();
    }, 200);
}

// Crear gráfico por faenas
function crearGraficoFaenas() {
    const ctx = document.getElementById('chartFaenas');
    
    // Agrupar por faena
    const porFaena = {};
    servicios.forEach(s => {
        if (!porFaena[s.faena]) {
            porFaena[s.faena] = { cantidad: 0, monto: 0 };
        }
        porFaena[s.faena].cantidad++;
        porFaena[s.faena].monto += parseFloat(s.monto || 0);
    });

    const labels = Object.keys(porFaena);
    const data = labels.map(f => porFaena[f].monto);

    if (chartFaenas) chartFaenas.destroy();
    
    chartFaenas = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Monto por Faena',
                data: data,
                backgroundColor: [
                    '#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
                    '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Crear gráfico por estados
function crearGraficoEstados() {
    const ctx = document.getElementById('chartEstados');
    
    const porEstado = {};
    servicios.forEach(s => {
        if (!porEstado[s.estado]) {
            porEstado[s.estado] = 0;
        }
        porEstado[s.estado] += parseFloat(s.monto || 0);
    });

    const labels = Object.keys(porEstado);
    const data = labels.map(e => porEstado[e]);

    if (chartEstados) chartEstados.destroy();
    
    chartEstados = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#22c55e', '#f59e0b', '#3b82f6']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// Renderizar tabla
function renderizarTabla(serviciosFiltrados = servicios) {
    const tbody = document.getElementById('tablaBody');
    tbody.innerHTML = '';

    serviciosFiltrados.forEach(servicio => {
        const tr = document.createElement('tr');
        
        // Generar vista previa del archivo
        let archivoHtml = '';
        if (servicio.archivo) {
            if (servicio.archivo.startsWith('data:image')) {
                archivoHtml = `<img src="${servicio.archivo}" alt="Archivo" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; cursor: pointer;" onclick="verArchivo('${servicio.id}')">`;
            } else if (servicio.archivo.startsWith('data:application/pdf')) {
                archivoHtml = `<button class="btn btn-small btn-secondary" onclick="verArchivo('${servicio.id}')">📄 PDF</button>`;
            } else {
                archivoHtml = servicio.archivo;
            }
        }
        
        tr.innerHTML = `
            <td>${servicio.servicio}</td>
            <td>${servicio.creador}</td>
            <td>${formatearFecha(servicio.fecha)}</td>
            <td>${servicio.detalle}</td>
            <td><span class="badge badge-${servicio.estado.toLowerCase().replace(' ', '-')}">${servicio.estado}</span></td>
            <td>${servicio.factura}</td>
            <td>${formatearMoneda(servicio.monto)}</td>
            <td>${archivoHtml}</td>
            <td>${servicio.observaciones}</td>
            <td>${servicio.faena}</td>
            <td class="actions-cell">
                <button class="btn btn-primary btn-small" onclick="editarServicio(${servicio.id})">✏️</button>
                <button class="btn btn-danger btn-small" onclick="eliminarServicio(${servicio.id})">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Cargar opciones de filtros
function cargarFiltros() {
    const faenas = [...new Set(servicios.map(s => s.faena))];
    const creadores = [...new Set(servicios.map(s => s.creador))];

    const selectFaena = document.getElementById('filterFaena');
    const selectCreador = document.getElementById('filterCreador');

    selectFaena.innerHTML = '<option value="">Todas las Faenas</option>';
    faenas.forEach(f => {
        selectFaena.innerHTML += `<option value="${f}">${f}</option>`;
    });

    selectCreador.innerHTML = '<option value="">Todos los Creadores</option>';
    creadores.forEach(c => {
        selectCreador.innerHTML += `<option value="${c}">${c}</option>`;
    });
    
    // Cargar opciones en formulario
    cargarOpcionesFormulario();
}

// Cargar opciones en el formulario de nuevo servicio
function cargarOpcionesFormulario() {
    const selectCreador = document.getElementById('inputCreador');
    const selectServicio = document.getElementById('inputServicio');
    const selectFaena = document.getElementById('inputFaena');
    
    selectCreador.innerHTML = '<option value="">Seleccionar creador...</option>';
    creadores.forEach(c => {
        selectCreador.innerHTML += `<option value="${c}">${c}</option>`;
    });
    
    selectServicio.innerHTML = '<option value="">Seleccionar empresa...</option>';
    empresas.forEach(e => {
        selectServicio.innerHTML += `<option value="${e}">${e}</option>`;
    });
    
    selectFaena.innerHTML = '<option value="">Seleccionar faena...</option>';
    faenas.forEach(f => {
        selectFaena.innerHTML += `<option value="${f}">${f}</option>`;
    });
}

// Aplicar filtros
function aplicarFiltros() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const estado = document.getElementById('filterEstado').value;
    const faena = document.getElementById('filterFaena').value;
    const creador = document.getElementById('filterCreador').value;
    const fechaDesde = document.getElementById('filterFechaDesde').value;
    const fechaHasta = document.getElementById('filterFechaHasta').value;

    let filtrados = servicios.filter(s => {
        const matchSearch = !search || 
            s.servicio.toLowerCase().includes(search) ||
            s.creador.toLowerCase().includes(search) ||
            s.detalle.toLowerCase().includes(search) ||
            s.faena.toLowerCase().includes(search);
        
        const matchEstado = !estado || s.estado === estado;
        const matchFaena = !faena || s.faena === faena;
        const matchCreador = !creador || s.creador === creador;
        const matchFechaDesde = !fechaDesde || s.fecha >= fechaDesde;
        const matchFechaHasta = !fechaHasta || s.fecha <= fechaHasta;

        return matchSearch && matchEstado && matchFaena && matchCreador && matchFechaDesde && matchFechaHasta;
    });

    renderizarTabla(filtrados);
}

// Limpiar filtros
function limpiarFiltros() {
    document.getElementById('searchInput').value = '';
    document.getElementById('filterEstado').value = '';
    document.getElementById('filterFaena').value = '';
    document.getElementById('filterCreador').value = '';
    document.getElementById('filterFechaDesde').value = '';
    document.getElementById('filterFechaHasta').value = '';
    renderizarTabla();
}

// Abrir modal para nuevo servicio
function abrirModalNuevo() {
    editingId = null;
    document.getElementById('modalTitle').textContent = 'Nuevo Servicio';
    document.getElementById('formServicio').reset();
    document.getElementById('inputFecha').valueAsDate = new Date();
    document.getElementById('archivoPreview').innerHTML = '';
    document.getElementById('modalServicio').classList.add('active');
}

// Editar servicio
function editarServicio(id) {
    editingId = id;
    const servicio = servicios.find(s => s.id === id);
    
    document.getElementById('modalTitle').textContent = 'Editar Servicio';
    document.getElementById('inputServicio').value = servicio.servicio;
    document.getElementById('inputCreador').value = servicio.creador;
    document.getElementById('inputFecha').value = servicio.fecha;
    document.getElementById('inputDetalle').value = servicio.detalle;
    document.getElementById('inputEstado').value = servicio.estado;
    document.getElementById('inputFactura').value = servicio.factura;
    document.getElementById('inputMonto').value = servicio.monto;
    document.getElementById('inputFaena').value = servicio.faena;
    document.getElementById('inputObservaciones').value = servicio.observaciones;
    
    // Mostrar previsualización del archivo si existe
    const previewDiv = document.getElementById('archivoPreview');
    previewDiv.innerHTML = '';
    if (servicio.archivo) {
        if (servicio.archivo.startsWith('data:image')) {
            previewDiv.innerHTML = `<img src="${servicio.archivo}" alt="Archivo actual" style="max-width: 200px; max-height: 150px; border-radius: 8px; border: 2px solid var(--border-color);">`;
        } else if (servicio.archivo.startsWith('data:application/pdf')) {
            previewDiv.innerHTML = `<p style="color: var(--text-secondary);">📄 PDF adjunto</p>`;
        }
    }
    
    document.getElementById('modalServicio').classList.add('active');
}

// Guardar servicio
function guardarServicio(e) {
    e.preventDefault();
    
    const archivoInput = document.getElementById('inputArchivo');
    let archivoData = '';
    
    // Si hay un archivo seleccionado, guardarlo
    if (archivoInput.files && archivoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            archivoData = event.target.result;
            guardarServicioConArchivo(archivoData);
        };
        reader.readAsDataURL(archivoInput.files[0]);
    } else {
        // Si se está editando y no se seleccionó nuevo archivo, mantener el anterior
        if (editingId) {
            const servicioActual = servicios.find(s => s.id === editingId);
            archivoData = servicioActual.archivo || '';
        }
        guardarServicioConArchivo(archivoData);
    }
}

function guardarServicioConArchivo(archivoData) {
    const servicio = {
        servicio: document.getElementById('inputServicio').value,
        creador: document.getElementById('inputCreador').value,
        fecha: document.getElementById('inputFecha').value,
        detalle: document.getElementById('inputDetalle').value,
        estado: document.getElementById('inputEstado').value,
        factura: document.getElementById('inputFactura').value,
        monto: parseFloat(document.getElementById('inputMonto').value),
        archivo: archivoData,
        faena: document.getElementById('inputFaena').value,
        observaciones: document.getElementById('inputObservaciones').value
    };

    if (editingId) {
        // Editar
        const index = servicios.findIndex(s => s.id === editingId);
        servicios[index] = { ...servicios[index], ...servicio };
    } else {
        // Nuevo
        servicio.id = Date.now();
        servicios.push(servicio);
    }

    guardarDatos();
    cerrarModal();
    renderizarTabla();
    cargarFiltros();
    actualizarDashboard();
    
    alert('Servicio guardado correctamente');
}

// Eliminar servicio
function eliminarServicio(id) {
    if (confirm('¿Está seguro de eliminar este servicio?')) {
        servicios = servicios.filter(s => s.id !== id);
        guardarDatos();
        renderizarTabla();
        cargarFiltros();
        actualizarDashboard();
    }
}

// Cerrar modal
function cerrarModal() {
    document.getElementById('modalServicio').classList.remove('active');
    editingId = null;
}

// Actualizar gráficos personalizados
function actualizarGraficos() {
    const tipo = document.getElementById('tipoGrafico').value;
    const chartType = document.getElementById('tipoChart').value;

    let datos = {};
    let titulo = '';

    switch(tipo) {
        case 'faenas':
            servicios.forEach(s => {
                if (!datos[s.faena]) datos[s.faena] = 0;
                datos[s.faena] += parseFloat(s.monto);
            });
            titulo = 'Montos por Faena';
            break;
        case 'estados':
            servicios.forEach(s => {
                if (!datos[s.estado]) datos[s.estado] = 0;
                datos[s.estado] += parseFloat(s.monto);
            });
            titulo = 'Montos por Estado';
            break;
        case 'creadores':
            servicios.forEach(s => {
                if (!datos[s.creador]) datos[s.creador] = 0;
                datos[s.creador] += parseFloat(s.monto);
            });
            titulo = 'Montos por Creador';
            break;
        case 'empresas':
            servicios.forEach(s => {
                if (!datos[s.servicio]) datos[s.servicio] = 0;
                datos[s.servicio] += parseFloat(s.monto);
            });
            titulo = 'Montos por Empresa';
            break;
        case 'mensual':
            servicios.forEach(s => {
                const mes = s.fecha.substring(0, 7);
                if (!datos[mes]) datos[mes] = 0;
                datos[mes] += parseFloat(s.monto);
            });
            titulo = 'Montos por Mes';
            break;
    }

    crearGrafico('chartPrincipal', datos, titulo, chartType);
    crearAnalisisCruzado();
}

// Crear gráfico genérico
function crearGrafico(canvasId, datos, titulo, tipo) {
    const ctx = document.getElementById(canvasId);
    
    const labels = Object.keys(datos);
    const values = Object.values(datos);

    if (chartPrincipal && canvasId === 'chartPrincipal') chartPrincipal.destroy();
    if (chartSecundario && canvasId === 'chartSecundario') chartSecundario.destroy();

    const colores = [
        '#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
        '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
    ];

    const config = {
        type: tipo,
        data: {
            labels: labels,
            datasets: [{
                label: titulo,
                data: values,
                backgroundColor: colores,
                borderColor: colores,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: titulo,
                    font: { size: 16 }
                },
                legend: {
                    display: tipo === 'pie' || tipo === 'doughnut',
                    position: 'bottom'
                }
            },
            scales: tipo === 'line' || tipo === 'bar' ? {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            } : {}
        }
    };

    if (canvasId === 'chartPrincipal') {
        chartPrincipal = new Chart(ctx, config);
    } else {
        chartSecundario = new Chart(ctx, config);
    }
}

// Crear análisis cruzado
function crearAnalisisCruzado() {
    const container = document.getElementById('analyticsContent');
    
    // Análisis: Faena vs Creador
    const analisis = {};
    servicios.forEach(s => {
        const key = `${s.faena} - ${s.creador}`;
        if (!analisis[key]) {
            analisis[key] = { cantidad: 0, monto: 0 };
        }
        analisis[key].cantidad++;
        analisis[key].monto += parseFloat(s.monto);
    });

    let html = '<table style="width:100%; border-collapse: collapse;">';
    html += '<thead><tr><th style="padding:10px; text-align:left; border-bottom:2px solid #e2e8f0;">Faena - Creador</th><th style="padding:10px; text-align:right; border-bottom:2px solid #e2e8f0;">Cantidad</th><th style="padding:10px; text-align:right; border-bottom:2px solid #e2e8f0;">Monto Total</th></tr></thead>';
    html += '<tbody>';
    
    Object.keys(analisis).forEach(key => {
        html += `<tr>
            <td style="padding:10px; border-bottom:1px solid #e2e8f0;">${key}</td>
            <td style="padding:10px; text-align:right; border-bottom:1px solid #e2e8f0;">${analisis[key].cantidad}</td>
            <td style="padding:10px; text-align:right; border-bottom:1px solid #e2e8f0;">${formatearMoneda(analisis[key].monto)}</td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Generar reportes
function generarReportes() {
    generarReporteFaenas();
    generarReporteCreadores();
    generarReporteMensual();
}

function generarReporteFaenas() {
    const container = document.getElementById('reporteFaenas');
    const porFaena = {};
    
    servicios.forEach(s => {
        if (!porFaena[s.faena]) {
            porFaena[s.faena] = { cantidad: 0, monto: 0 };
        }
        porFaena[s.faena].cantidad++;
        porFaena[s.faena].monto += parseFloat(s.monto);
    });

    let html = '';
    Object.keys(porFaena).forEach(faena => {
        html += `
            <div class="reporte-item">
                <div class="reporte-label">${faena}</div>
                <div class="reporte-value">${formatearMoneda(porFaena[faena].monto)} (${porFaena[faena].cantidad})</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function generarReporteCreadores() {
    const container = document.getElementById('reporteCreadores');
    const porCreador = {};
    
    servicios.forEach(s => {
        if (!porCreador[s.creador]) {
            porCreador[s.creador] = { cantidad: 0, monto: 0 };
        }
        porCreador[s.creador].cantidad++;
        porCreador[s.creador].monto += parseFloat(s.monto);
    });

    let html = '';
    Object.keys(porCreador).forEach(creador => {
        html += `
            <div class="reporte-item">
                <div class="reporte-label">${creador}</div>
                <div class="reporte-value">${formatearMoneda(porCreador[creador].monto)} (${porCreador[creador].cantidad})</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function generarReporteMensual() {
    const container = document.getElementById('reporteMensual');
    const porMes = {};
    
    servicios.forEach(s => {
        const mes = s.fecha.substring(0, 7);
        if (!porMes[mes]) {
            porMes[mes] = { cantidad: 0, monto: 0 };
        }
        porMes[mes].cantidad++;
        porMes[mes].monto += parseFloat(s.monto);
    });

    let html = '';
    Object.keys(porMes).sort().reverse().forEach(mes => {
        html += `
            <div class="reporte-item">
                <div class="reporte-label">${formatearMes(mes)}</div>
                <div class="reporte-value">${formatearMoneda(porMes[mes].monto)} (${porMes[mes].cantidad})</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Exportar a Excel (CSV)
function exportarExcel() {
    let csv = 'Servicio,Creador,Fecha,Detalle,Estado,Factura,Monto,Archivo,Observaciones,Faena\n';
    
    servicios.forEach(s => {
        csv += `"${s.servicio}","${s.creador}","${s.fecha}","${s.detalle}","${s.estado}","${s.factura}","${s.monto}","${s.archivo}","${s.observaciones}","${s.faena}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `servicios_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
}

// Utilidades de formato
function formatearMoneda(valor) {
    return '$' + parseFloat(valor).toLocaleString('es-CL');
}

function formatearFecha(fecha) {
    const [year, month, day] = fecha.split('-');
    return `${day}-${month}-${year}`;
}

function formatearMes(mes) {
    const [year, month] = mes.split('-');
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${meses[parseInt(month) - 1]} ${year}`;
}

// Previsualizar archivo seleccionado
function previsualizarArchivo(e) {
    const file = e.target.files[0];
    const previewDiv = document.getElementById('archivoPreview');
    previewDiv.innerHTML = '';
    
    if (!file) return;
    
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(event) {
            previewDiv.innerHTML = `<img src="${event.target.result}" alt="Vista previa" style="max-width: 200px; max-height: 150px; border-radius: 8px; border: 2px solid var(--primary-color);">`;
        };
        reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
        previewDiv.innerHTML = `<p style="color: var(--primary-color); font-weight: 500;">📄 ${file.name} (${(file.size / 1024).toFixed(2)} KB)</p>`;
    } else {
        previewDiv.innerHTML = `<p style="color: var(--danger-color);">⚠️ Tipo de archivo no soportado</p>`;
    }
}

// Ver archivo en modal o nueva ventana
function verArchivo(id) {
    const servicio = servicios.find(s => s.id == id);
    if (!servicio || !servicio.archivo) return;
    
    if (servicio.archivo.startsWith('data:image')) {
        // Crear modal para mostrar imagen
        const modal = document.createElement('div');
        modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 2000; display: flex; align-items: center; justify-content: center;';
        modal.innerHTML = `
            <div style="position: relative; max-width: 90%; max-height: 90%;">
                <img src="${servicio.archivo}" style="max-width: 100%; max-height: 90vh; border-radius: 8px;">
                <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 10px; right: 10px; background: white; border: none; padding: 10px 15px; border-radius: 50%; cursor: pointer; font-size: 20px;">✕</button>
            </div>
        `;
        document.body.appendChild(modal);
        modal.onclick = function(e) {
            if (e.target === modal) modal.remove();
        };
    } else if (servicio.archivo.startsWith('data:application/pdf')) {
        // Abrir PDF en nueva ventana
        const win = window.open();
        win.document.write(`<iframe src="${servicio.archivo}" style="width:100%; height:100%; border:none;"></iframe>`);
    }
}

// ============================================
// FUNCIONES DE ADMINISTRACIÓN
// ============================================

// Mostrar sección de administración
function mostrarAdministracion() {
    renderizarListaCreadores();
    renderizarListaEmpresas();
    renderizarListaFaenas();
}

// Renderizar lista de creadores
function renderizarListaCreadores() {
    const container = document.getElementById('listaCreadores');
    container.innerHTML = '';
    
    if (creadores.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">No hay creadores registrados</p>';
        return;
    }
    
    creadores.forEach((creador, index) => {
        const div = document.createElement('div');
        div.className = 'admin-item';
        div.innerHTML = `
            <span class="admin-item-name">${creador}</span>
            <div class="admin-item-actions">
                <button class="btn btn-danger btn-small" onclick="eliminarCreador(${index})">🗑️</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// Renderizar lista de empresas
function renderizarListaEmpresas() {
    const container = document.getElementById('listaEmpresas');
    container.innerHTML = '';
    
    if (empresas.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">No hay empresas registradas</p>';
        return;
    }
    
    empresas.forEach((empresa, index) => {
        const div = document.createElement('div');
        div.className = 'admin-item';
        div.innerHTML = `
            <span class="admin-item-name">${empresa}</span>
            <div class="admin-item-actions">
                <button class="btn btn-danger btn-small" onclick="eliminarEmpresa(${index})">🗑️</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// Renderizar lista de faenas
function renderizarListaFaenas() {
    const container = document.getElementById('listaFaenas');
    container.innerHTML = '';
    
    if (faenas.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">No hay faenas registradas</p>';
        return;
    }
    
    faenas.forEach((faena, index) => {
        const div = document.createElement('div');
        div.className = 'admin-item';
        div.innerHTML = `
            <span class="admin-item-name">${faena}</span>
            <div class="admin-item-actions">
                <button class="btn btn-danger btn-small" onclick="eliminarFaena(${index})">🗑️</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// Agregar item (creador, empresa o faena)
function agregarItem(tipo) {
    const nombres = {
        creador: 'Creador',
        empresa: 'Empresa/Servicio',
        faena: 'Faena'
    };
    
    const nombre = prompt(`Ingrese el nombre del ${nombres[tipo]}:`);
    
    if (!nombre || nombre.trim() === '') {
        return;
    }
    
    const nombreTrim = nombre.trim().toUpperCase();
    
    if (tipo === 'creador') {
        if (creadores.includes(nombreTrim)) {
            alert('Este creador ya existe');
            return;
        }
        creadores.push(nombreTrim);
        localStorage.setItem('creadores', JSON.stringify(creadores));
        renderizarListaCreadores();
    } else if (tipo === 'empresa') {
        if (empresas.includes(nombreTrim)) {
            alert('Esta empresa ya existe');
            return;
        }
        empresas.push(nombreTrim);
        localStorage.setItem('empresas', JSON.stringify(empresas));
        renderizarListaEmpresas();
    } else if (tipo === 'faena') {
        if (faenas.includes(nombreTrim)) {
            alert('Esta faena ya existe');
            return;
        }
        faenas.push(nombreTrim);
        localStorage.setItem('faenas', JSON.stringify(faenas));
        renderizarListaFaenas();
    }
    
    cargarOpcionesFormulario();
    cargarFiltros();
}

// Eliminar creador
function eliminarCreador(index) {
    if (confirm('¿Está seguro de eliminar este creador?')) {
        creadores.splice(index, 1);
        localStorage.setItem('creadores', JSON.stringify(creadores));
        renderizarListaCreadores();
        cargarOpcionesFormulario();
        cargarFiltros();
    }
}

// Eliminar empresa
function eliminarEmpresa(index) {
    if (confirm('¿Está seguro de eliminar esta empresa?')) {
        empresas.splice(index, 1);
        localStorage.setItem('empresas', JSON.stringify(empresas));
        renderizarListaEmpresas();
        cargarOpcionesFormulario();
        cargarFiltros();
    }
}

// Eliminar faena
function eliminarFaena(index) {
    if (confirm('¿Está seguro de eliminar esta faena?')) {
        faenas.splice(index, 1);
        localStorage.setItem('faenas', JSON.stringify(faenas));
        renderizarListaFaenas();
        cargarOpcionesFormulario();
        cargarFiltros();
    }
}
