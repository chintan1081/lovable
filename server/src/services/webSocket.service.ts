import strict from "assert/strict";
import { WebSocketServer, WebSocket } from "ws";

interface User {
    socket: WebSocket,
    projectId: string
}

let allSocket: User[] = [];
let socketCount: number = 0;

const wss = new WebSocketServer({ port: Number(process.env.WEBSOCKETPORT) });

const webSocketService = () => {
    wss.on("connection", (socket: WebSocket) => {
        socketCount += 1;
        console.log("connection",socketCount);
        socket.on("message", (message: any) => {
            const projectId = JSON.parse(message).projectId;
            allSocket.push({
                socket,
                projectId
            })
            console.log(projectId,'socketCount');
        });

        socket.on("close", () => {
        allSocket = allSocket.filter((s) => s.socket !== socket);
        console.log(allSocket,'...............socket');
        
        socketCount -= 1;
        })

        socket.on("error", (err) => {
            console.error(`⚠️ WebSocket error ():`, err.message);
        })
    })

};

export default webSocketService;

interface ClientData {
    projectId: String,
    type: "stream" | "fileStructure" | "sandboxUrl",
    data: any
}

export const wsSendToClient = (clientData: ClientData) => {
        const user = allSocket.find((s) => s.projectId === clientData.projectId);
        if(user?.socket.readyState === WebSocket.OPEN){
            user.socket.send(JSON.stringify(clientData))
        }
}