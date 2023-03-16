const { spawn } = require('child_process');

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
const bungeeJarPath = './public/game/java/bungee_command/bungee-dist.jar';

startMinecraftServer(gameJarPath);
startMinecraftServer(bungeeJarPath);

