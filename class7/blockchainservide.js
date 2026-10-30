//blockchainService.js
export const blockchainData = []

const ws = new WebSocket("wss://api.avax.network/ext/bc/C/ws")

function handleOpen() {
    console.log("Connected to Avalanche!");

    ws.send(JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_subscribe",
        params: ["newHeads"]
    }));
}

function handleMessage(event) {
    const message = JSON.parse(event.data);

    // Notificación de un nuevo bloque
    if (message.method === "eth_subscription") {
        const block = message.params.result;

        blockchainData.push({
            number: Number.parseInt(block.number, 16),
            hash: block.hash,
            gasUsed: Number.parseInt(block.gasUsed, 16), 
            timestamp: new Date(Number.parseInt(block.timestamp, 16) * 1000)
        })

        avisar({
            number: Number.parseInt(block.number, 16),
            hash: block.hash,
            gasUsed: Number.parseInt(block.gasUsed, 16), 
            timestamp: new Date(Number.parseInt(block.timestamp, 16) * 1000)
        })
    }
}

export function createConnectionToBlockchain() {
    ws.addEventListener("open", handleOpen)
    ws.addEventListener("message", handleMessage);
}

export function disconnectFromBlockchain() {
    ws.removeEventListener('open', handleOpen)
    ws.removeEventListener('message', handleMessage)
}

/** @type {Array<function(): void>} */
var suscriptores = []

/**
 * 
 * @param {function(): void} callback Debe ser una funcion
 */
export function suscribir(callback) {
    if(suscriptores.length == 0) {
        createConnectionToBlockchain()
    } 
    suscriptores.push(callback)
}

export function avisar(bloqueInfo) {
    for(var suscriptor of suscriptores) {
        suscriptor(bloqueInfo)
    }
}

export function desuscribir(callback) {
    
    for(var suscriptor of suscriptores) {
      if(suscriptor === callback) {
        const index = suscriptores.indexOf(suscriptor);
        if (index > -1) {
            suscriptores.splice(index, 1);
        }
      }  
    }
    //ir elemento por elemento hasta encontrar el callback
    //a desuscribir, luego lo quito de la lista
    /*
    1.iterar sobe la lista de suscriptores
     1.1 por cada element, buscar si el elemento acual es igual al callback que quiero desuscribir
        1.2 si es igual, eliminarlo de la lista de suscriptores
        
    */ 
    //si ya no hay listeners, cierro la conexion WS
}
