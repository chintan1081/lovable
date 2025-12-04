import strict from "assert/strict";
import { WebSocketServer, WebSocket } from "ws";
import { Temp_Sandbox } from "../utils/tempSandbox";

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
        console.log("connection", socketCount, allSocket);
        socket.on("message", (message: any) => {
            const projectId = JSON.parse(message).projectId;
            allSocket.push({
                socket,
                projectId
            })
            console.log(projectId, 'socketCount');
        });

        socket.on("close", () => {
            const socketInx = allSocket.findIndex((s) => s.socket === socket);
            if (socketInx !== -1) {
                console.log("before Temp_Sandbox", Temp_Sandbox);
                
                const removedSocket = allSocket.splice(socketInx, 1)[0];
                const removeSandboxInx = Temp_Sandbox.findIndex((sandbox) => sandbox.projectId === removedSocket?.projectId);
                if (removeSandboxInx !== -1) {
                    Temp_Sandbox.splice(removeSandboxInx, 1);
                console.log("after Temp_Sandbox", Temp_Sandbox);

                }
            }
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
    if (user?.socket.readyState === WebSocket.OPEN) {
        user.socket.send(JSON.stringify(clientData))
    }
}