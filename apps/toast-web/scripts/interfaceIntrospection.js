const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

(async () => {
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
      path.resolve(__dirname, '../src/generated/fragmentTypes.json'),
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
  process.exit(0);
})().catch(err => {
  process.kill(-1);
});
