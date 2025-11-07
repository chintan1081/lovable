import { useEffect, useRef, useState } from "react";


export const useWebSocket = (projectId: string) => {
const socket = new WebSocket(`http://localhost:3001`);
    // const socket = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}/?id=${projectId}`);
    const [stream, setStream] = useState("");
    const sandboxUrl = useRef("");
    const fileStructure = useRef({});

    useEffect(() => {
        socket.addEventListener("open", () => {
            socket.send(JSON.stringify({
                projectId
            }))
            console.log("ws connected successfully");
        });

        socket.addEventListener("message", (e) => {
            const message = JSON.parse(e.data);
            console.log(e.data);
            
            if (message.type === "stream") {
                setStream(message.data)
            } else if (message.type === "sandboxUrl") {
                sandboxUrl.current = message.data;
            }
        })

        socket.addEventListener("close", () => {
            console.log("ws closed successfully");

        })

        socket.addEventListener("error", (e) => {
            console.log(e);

        })
    })

    return { stream }
}