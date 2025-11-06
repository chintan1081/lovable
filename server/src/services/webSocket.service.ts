import { Server } from "http";
import { WebSocketServer } from "ws";

const clients = new Map();

const webSocketService = (data?: any) => {
    const wss = new WebSocketServer({ port: Number(process.env.WEBSOCKETPORT) });

    wss.on("connection", (ws, req) => {
        console.log("connection", ws);
        
        wss.on("message", () => {

        });

        wss.on("close", () => {

        })

        wss.on("error", (err) => {
            console.error(`⚠️ WebSocket error ():`, err.message);
        })
    })

}

export default webSocketService;