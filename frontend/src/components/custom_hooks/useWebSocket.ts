import { useEffect } from "react";

export const useWebSocket = (projectId: string) => {
    const socket = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}/?id=${projectId}`);

    useEffect(() => {
        socket.addEventListener("open" , () => {
            console.log("ws connected successfully");
        });

        socket.addEventListener("message", (e) => {
            console.log(e.data);
            
        })

        socket.addEventListener("close", () => {
            console.log("ws closed successfully");
            
        })

        socket.addEventListener("error", (e) => {
            console.log(e);
            
        })
    })

    return { socket }
}