import { DefaultEventsMap } from "_@socket.io_component-emitter@3.1.0@@socket.io/component-emitter";
import io, { Socket } from "socket.io-client";

export default {
  install: (app: { config: { globalProperties: { $socket: Socket<DefaultEventsMap, DefaultEventsMap>; }; }; provide: (arg0: string, arg1: Socket<DefaultEventsMap, DefaultEventsMap>) => void; }, { connection, options }: any) => {
    let socket = io(connection, options);
    app.config.globalProperties.$socket = socket;
    app.provide("socket", socket);
  },
};
