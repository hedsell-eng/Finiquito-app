let pagasSelected = 12;

function selectPagas(pagas) {
  pagasSelected = pagas;
  document.querySelectorAll('.paga-option').forEach(option => {
    option.classList.toggle('selected', option.textContent === pagas.toString());
  });
}

function calcularFiniquito() {
  const inicio = new Date(document.getElementById('inicio').value);
  const fin = new Date(document.getElementById('fin').value);
  const salario = parseFloat(document.getElementById('salario').value);
  const vacaciones = document.getElementById('vacaciones').value;
  const motivo = document.getElementById('motivo').value;
  const preaviso = document.getElementById('preaviso').value;

  if (isNaN(salario) || !inicio || !fin || inicio >= fin) {
    alert("Por favor, revisa los datos ingresados.");
    return;
  }

  // Días trabajados
  const diasTrabajados = Math.floor((fin - inicio) / (1000 * 60 * 60 * 24)) + 1;
  const salarioDiario = salario / 30;

  // Salario proporcional del mes actual
  const salarioMesActual = salarioDiario * fin.getDate();

  // Vacaciones pendientes (2.5 días por mes trabajado aprox.)
  const mesesTrabajados = diasTrabajados / 30;
  const diasVacacionesPendientes = vacaciones === 'no' ? mesesTrabajados * 2.5 : 0;
  const vacacionesPendientes = salarioDiario * diasVacacionesPendientes;

  // Paga extra proporcional
  const pagaExtra = pagasSelected === 14 ? salario / 14 : 0;

  // Indemnización (solo despido: 33 días por año trabajado)
  const anosTrabajados = diasTrabajados / 365;
  const indemnizacion = motivo === 'despido' ? salarioDiario * 33 * anosTrabajados : 0;

  // Penalización/preaviso
  let penalizacionPreaviso = 0;
  if (motivo === 'renuncia' && preaviso === 'ninguno') {
    penalizacionPreaviso = salarioDiario * 15; // se descuenta 15 días como base
  }

  const total = salarioMesActual + vacacionesPendientes + pagaExtra + indemnizacion - penalizacionPreaviso;

  document.getElementById('resultado').innerHTML = `
    <h3>RESULTADO DEL CÁLCULO</h3>
    <p><strong>Días trabajados:</strong> ${diasTrabajados}</p>
    <p><strong>Salario del mes actual:</strong> €${salarioMesActual.toFixed(2)}</p>
    <p><strong>Vacaciones no disfrutadas:</strong> €${vacacionesPendientes.toFixed(2)}</p>
    <p><strong>Paga extra proporcional:</strong> €${pagaExtra.toFixed(2)}</p>
    <p><strong>Indemnización (${motivo}):</strong> €${indemnizacion.toFixed(2)}</p>
    <p><strong>Penalización por no preaviso:</strong> -€${penalizacionPreaviso.toFixed(2)}</p>
    <hr>
    <h3>TOTAL ESTIMADO: €${total.toFixed(2)}</h3>
  `;
}
