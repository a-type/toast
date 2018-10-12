const fetch = require('node-fetch');
const fs = require('fs');
const childProcess = require('child_process');
const path = require('path');

(async () => {
  childProcess.execSync('npm run build', {
    cwd: path.resolve(__dirname, '../apis/toast-core'),
    stdio: 'inherit',
  });

  const server = childProcess.exec('npm start', {
    cwd: path.resolve(__dirname, '../apis/toast-core'),
  });

  process.on('exit', () => {
    server.kill();
  });

  await new Promise(resolve => {
    server.stdout.on('data', data => {
      console.info(`SERVER> ${data.toString()}`);
      if (data.toString().includes('Server ready')) {
        resolve();
      }
    });

    server.stderr.pipe(process.stderr);
  });

  const result = await fetch(`http://localhost:4000/api`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {},
      query: `
        {
          __schema {
            types {
              kind
              name
              possibleTypes {
                name
              }
            }
          }
        }
      `,
    }),
  });
  const json = await result.json();

  // here we're filtering out any type information unrelated to unions or interfaces
  const filteredData = json.data.__schema.types.filter(
    type => type.possibleTypes !== null,
  );
  json.data.__schema.types = filteredData;

  await new Promise((resolve, reject) => {
    fs.writeFile(
      path.resolve(
        __dirname,
        '../apps/toast-web/src/generated/fragmentTypes.json',
      ),
      JSON.stringify(json.data),
      err => {
        if (err) {
          console.error('Error writing fragmentTypes file', err);
          reject(err);
        } else {
          console.log('Fragment types successfully extracted!');
          resolve();
        }
      },
    );
  });

  console.info('Done');
  server.kill();
  process.exit(0);
})().catch(err => {
  process.kill(-1);
});
