// const messageHandlers = new Set()

// export const addMessageHandler = (handler) => {
//   messageHandlers.add(handler)
// }

// export const removeMessageHandler = (handler) => {
//   messageHandlers.delete(handler)
// }

// const socket = new WebSocket("ws://127.0.0.1:8000/ws/ble-devices/")

// socket.onmessage = (event) => {
//     console.log("TEst")
//     messageHandlers.forEach((handler) => handler(event))
// }