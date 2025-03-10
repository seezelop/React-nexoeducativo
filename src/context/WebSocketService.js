import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const SOCKET_URL = "http://localhost:8080/ms"; // La URL de tu backend con WebSockets

class WebSocketService {
  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      debug: (str) => console.log(str),
      reconnectDelay: 5000, // Intentará reconectar cada 5 segundos si se desconecta
    });
  }

  connect(onMessageReceived) {
    this.client.onConnect = () => {
      console.log("🟢 Conectado a WebSocket");

      // Suscribirse a mensajes privados (cambiar según tu backend)
      this.client.subscribe("/usuario/privado", (message) => {
        onMessageReceived(JSON.parse(message.body));
      });
    };

    this.client.activate();
  }

  sendMessage(destinatario, contenido) {
    if (this.client.connected) {
      this.client.publish({
        destination: "/enviar/mensajePrivado",
        body: JSON.stringify({ destinatario, contenido }),
      });
    } else {
      console.error("🔴 No conectado a WebSocket");
    }
  }
}

export default new WebSocketService();
