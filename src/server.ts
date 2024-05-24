import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
