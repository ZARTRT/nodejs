interface Socket {
    source: string,
    subString: number
}
declare function createServer (connectionListener?: (socket: Socket) => void): Socket;


