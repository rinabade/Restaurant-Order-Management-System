import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});


io.on("connection", (socket) => {

  socket.on("order", (order) => {
    // Handle the order notification here
    console.log("Received order:", order);

    // Send the order notification to kitchen and cashier dashboards
    // You can emit specific events or use different namespaces for different dashboards
    // For example:
    io.emit("newOrder", order); // Emit to all connected clients

    // Alternatively, if you want to emit to specific dashboards, you can use namespaces or room-based communication.
    // Here's an example using namespaces:
    // io.of("/kitchen").emit("newOrder", order); // Emit to all connected clients in the "kitchen" namespace
    // io.of("/cashier").emit("newOrder", order); // Emit to all connected clients in the "cashier" namespace
  });

  socket.on("disconnect", () => {
   
  });
});

io.listen(5000);
