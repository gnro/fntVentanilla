import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import fetch from 'node-fetch';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: '*' } }); // cors solo para pruebas
const url1 = 'http://192.168.1.147:4015/api/v1/MuestraTurnos/';

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Manejar conexiones de clientes
io.on('connection', (socket) => {
  console.log('Client connected');
  // Manejar mensajes del cliente
  socket.on('message', async (message) => {
    try {
      const data = await getCitas(url1 + message);
      io.emit('message', data.DtS); // Enviar todo el arreglo DtS
    } catch (error) {
      console.error('Error fetching data:', error);
      io.emit('message', [{ error: 'Error fetching data' }]);
    }
  });
  // Manejar desconexiones
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Función para obtener datos de la API
async function getCitas(url) {
  const response = await fetch(url);
  const Var = await response.json(); 
  return Var;
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Socket.IO server started at http://localhost:${PORT}`);
});