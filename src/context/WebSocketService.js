import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const SOCKET_URL = "http://localhost:8080/ws"; // URL del WebSocket

class WebSocketService {
  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      connectHeaders: {
        user: "lorencita2@gmail.com", // Asegúrate de obtener el usuario autenticado correctamente
      },
      debug: (str) => console.log(str),
      reconnectDelay: 5000, // Reintento automático cada 5 segundos
    });
  }

  connect(onMessageReceived) {
    this.client.onConnect = () => {
      console.log("🟢 Conectado a WebSocket");

      // 🔄 Suscribirse a mensajes privados
      this.client.subscribe("/user/privado", (message) => {
        console.log("📩 Mensaje recibido:", JSON.parse(message.body));
        onMessageReceived(JSON.parse(message.body));
      });
    };

    this.client.activate();
  }

  sendMessage(destinatario, contenido) {
    if (!this.client.connected) {
      console.error("🔴 No conectado a WebSocket");
      return;
    }

    const nuevoMensaje = {
      comunicador: "lorencita2@gmail.com", // Asegúrate de obtener el usuario autenticado correctamente
      destinatario,
      contenido,
    };

    this.client.publish({
      destination: "/app/enviar/mensajePrivado",
      body: JSON.stringify(nuevoMensaje),
    });
  }
}

export default new WebSocketService();
