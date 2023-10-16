import { Server } from 'http';
import app from './app';
import configs from './configs';

const startServer = async () => {
    const server: Server = app.listen(configs.port, () => {
        console.log(`Server running on port ${configs.port}`);
    });

    const exitHandler = () => {
        if (server) {
            server.close(() => {
                console.log('Server closed');
            });
        }
        process.exit(1);
    };

    const unexpectedErrorHandler = (error: unknown) => {
        console.error(error);
        exitHandler();
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);
};

startServer();
