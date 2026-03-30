import 'dotenv/config';

process.on('uncaughtException', (err: unknown) => {
    console.error('ERROR:', JSON.stringify(err, Object.getOwnPropertyNames(err as object)));
});

import app from './app.js';

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});