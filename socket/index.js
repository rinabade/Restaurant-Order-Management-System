import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://202.52.248.120:3000",
  },
});


io.on("connection", (socket) => {

  socket.on("order", (order) => {
    // Handle the order notification here
    console.log("Received order:", order);

    io.emit("newOrder", order); 
  });

  // Modify the "doneOrder" event in the socket server to "orderDoneNotification"
socket.on("orderDoneNotification", (order) => {
 
  console.log("Received order:", order);
  // Emit the updated cart to all connected clients, including CashierDash
  io.emit("neworderDoneNotification",   order);
});

  socket.on("disconnect", () => {
   
  });
});

io.listen(8000);
