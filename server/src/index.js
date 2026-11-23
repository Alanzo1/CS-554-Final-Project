import 'dotenv/config';
import http from 'http';
import express from 'express';
import cors from 'cors';
import {Server} from 'socket.io';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@as-integrations/express5';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';

import {typeDefs} from './graphql/typeDefs.js';
import {resolvers} from './graphql/resolvers.js';
import {dbConnection} from './db/mongoConnection.js';
import {redisConnection} from './cache/redisConnection.js';

const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const app = express();
const httpServer = http.createServer(app);

// Apollo
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
});
await apollo.start();

app.use(
  '/graphql',
  cors({origin: CLIENT_ORIGIN, credentials: true}),
  express.json(),
  expressMiddleware(apollo)
);

// Socket.io (same port as Apollo)
const io = new Server(httpServer, {
  cors: {origin: CLIENT_ORIGIN, credentials: true}
});

io.on('connection', (socket) => {
  console.log('socket connected:', socket.id);
  socket.on('disconnect', () => console.log('socket disconnected:', socket.id));
});

// Databases
await dbConnection();
console.log('Connected to MongoDB');
await redisConnection();
console.log('Connected to Redis');

httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}/graphql`);
});
