const form = document.getElementById('registroForm');
const tabla = document.getElementById('tablaRegistros');
const balanceEl = document.getElementById('balance');
const fechaInput = document.getElementById('fecha');

    // Fecha por defecto: hoy
    const hoy = new Date().toISOString().split("T")[0];
    fechaInput.value = hoy;

    let balance = 0;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value.trim();
      const monto = parseFloat(document.getElementById('monto').value);
      const tipo = document.getElementById('tipo').value;
      const fecha = document.getElementById('fecha').value;

      if (nombre === "" || isNaN(monto) || monto <= 0 || !fecha) {
        alert("Completa todos los campos correctamente.");
        return;
      }

      // Crear fila
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${fecha}</td>
        <td>${nombre}</td>
        <td class="${tipo === 'ingreso' ? 'ingreso' : 'egreso'}">
          ${tipo === 'ingreso' ? '+' : '-'}$${monto.toFixed(2)}
        </td>
        <td>${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</td>
        <td><button class="eliminar">🗑️</button></td>
      `;

      // Agregar la fila a la tabla
      tabla.appendChild(fila);

      // Actualizar balance
      balance += (tipo === 'ingreso' ? monto : -monto);
      balanceEl.textContent = `Balance: $${balance.toFixed(2)}`;

      // Agregar funcionalidad de eliminar
      fila.querySelector('.eliminar').addEventListener('click', function () {
        const montoTexto = fila.children[2].textContent;
        const montoFila = parseFloat(montoTexto.replace(/[^0-9.]/g, ''));

        if (tipo === 'ingreso') {
          balance -= montoFila;
        } else {
          balance += montoFila;
        }

        balanceEl.textContent = `Balance: $${balance.toFixed(2)}`;
        fila.remove();
      });

      // Limpiar formulario
      form.reset();
      fechaInput.value = hoy;
    });
