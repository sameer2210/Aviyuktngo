const { Socket } = require("socket.io");
const app = require("./src/app");
const connectDB = require("./src/db/db");
const { log } = require("console");

connectDB();


const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', Socket => {
  console.log('a user connected');

  Socket.on('disconnected',() => {
    console.log(`user is disconnected`);
  });
  
});
server.listen(3000, () => {
  console.log(`server is connected on port 3000`);
});
