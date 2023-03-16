const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const { spawn } = require('child_process'); // Add this line to import child_process

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Add this function to start the .jar file
function startJarFile() {
  const jarPath = '/CGA/public/game/Java/bukkit_command/craftbukkit-1.5.2-R1.0.jar';
  const javaProcess = spawn('java', ['-jar', jarPath]);

  javaProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  javaProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  javaProcess.on('close', (code) => {
    console.log(`Java process exited with code ${code}`);
  });
}

startJarFile(); // Add this line to start the .jar file

app.post('/api/gpt', async (req, res) => {
  // ... (the rest of your existing code)
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


