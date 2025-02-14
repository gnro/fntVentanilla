const socket = io.connect('http://localhost:3000');

// Send message to the server
function sendMessage() {
    const oficina = document.getElementById('oficina').value;
    const tipOficina = document.getElementById('tipOficina').value;
    const message = `${oficina}/${tipOficina}`;
    socket.emit('message', message);
}

// Receive messages from the server
socket.on('message', function (data) {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas tablas

  // Crear una tabla para cada arreglo en DtS
    data.forEach((array, index) => {
        const table = document.createElement('table');
        table.style.border = '1px solid black';
        table.style.marginBottom = '20px';

        // Crear el encabezado de la tabla
        const headerRow = document.createElement('tr');
        Object.keys(array[0]).forEach((key) => {
            const th = document.createElement('th');
            th.textContent = key;
            th.style.border = '1px solid black';
            th.style.padding = '5px';
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Crear las filas de la tabla con los datos
        array.forEach((item) => {
            const row = document.createElement('tr');
            Object.values(item).forEach((value) => {
                const td = document.createElement('td');
                td.textContent = value;
                td.style.border = '1px solid black';
                td.style.padding = '5px';
                row.appendChild(td);/**/
            }
            );
            table.appendChild(row);
        }
    
    );

        // Agregar la tabla al contenedor de mensajes
        messagesContainer.appendChild(table);
    });
});