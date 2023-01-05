import { WebSocketServer } from "ws";

let sockets: any[] = [];

export class ServerSocket {

    private socketServer = new WebSocketServer({ noServer: true });

    constructor(private server: any) {
        this.socketServer.on('connection', socket => {
            sockets.push(socket);
            socket.on('message', (message) => {
                const data = "" + message;
                console.log("Socket Server", data);
                sockets.forEach(s => {
                    if(s.readyState == 1)
                        s.send(data);
                })
            });
        });
        server.on('upgrade', (request, socket, head) => {
            this.socketServer.handleUpgrade(request, socket, head, socket => {
                this.socketServer.emit('connection', socket, request);
            });
        });
        setInterval(() => {
            sockets = sockets.filter(socket => {
                return socket.readyState == 0 || socket.readyState == 1;
            });

        }, 5000);
    }

}