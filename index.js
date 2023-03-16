const { spawn } = require('child_process');
const WebSocket = require('ws');

const startMinecraftServer = (path) => {
  const server = spawn('java', ['-jar', path]);

  server.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  server.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  server.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
  });
};

const gameJarPath = './public/game/java/bukkit_command/game.jar';

startMinecraftServer(gameJarPath);

const wsServer = new WebSocket.Server({ port: 3000 });

wsServer.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on port 3000');


