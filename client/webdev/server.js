
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

// creating socket server and combining it with nextjs server
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
//IF WE DONT HAVE PORT IN ENV USE 3000
const port = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

export let io

app.prepare().then(() => {
    const httpServer = createServer(handler)

    let onLineUsers = new Map()
    io = new Server(httpServer)

    
     io.on("connection", (socket) => {
     console.log("connected >>>>>>")
     socket.on('addOnlineUsers', (userId) => {
        if(userId && !onLineUsers.has(userId)){
            onLineUsers.set(userId, {
                userId,
                socketId: socket.id
            })
        }

        console.log("Current Online Users:", Array.from(onLineUsers.entries()))
     })

     socket.on('onNotification', (recipientId) => {
      const recipient = onLineUsers.get(recipientId)

      if(recipient){
        io.to(recipient.socketId).emit("getNotification")
      }else {
        console.log(`Recipient with ID ${recipientId} is not online`)
      }
     })



     socket.on('disconnect', () => {
        onLineUsers.forEach((value, key) => {
            if(value.socketId === socket.id) {
                console.log('disconnected', key, value.socketId, socket.id)
                onLineUsers.delete(key)
            }
        })
     })
  });


  httpServer
    .once("error", (err) => {
      console.log(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});