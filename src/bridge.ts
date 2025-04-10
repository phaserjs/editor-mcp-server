const BRIDGE_PORT = 1902;

export async function sendRequestToPhaserEditor(data: any) {

    // make POST http request to http://127.0.0.1:1902 and get JSON response with data as body

    const options = {
        hostname: "127.0.0.1",
        port: 1902,
        path: "/",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(JSON.stringify(data))
        }
    };

    const response = await fetch(`http://127.0.0.1:${BRIDGE_PORT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    return result;
}