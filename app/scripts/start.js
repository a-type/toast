const childProcess = require('child_process');
const path = require('path');

const server = childProcess.exec('npm run dev', {
  cwd: path.resolve(__dirname, '../apis/toast-core'),
  stdio: 'inherit',
});

process.on('beforeExit', () => {
  server.kill(-1);
});

process.on('SIGKILL', () => {
  server.kill(-1);
});

childProcess.execSync('npm start', {
  cwd: path.resolve(__dirname, '../apps/toast-web'),
  stdio: 'inherit',
});
