
import feathers from "@feathersjs/client";
import io from "socket.io-client";
const client = feathers();
const socket = io("http://localhost:3030");
client.configure(feathers.socketio(socket));
client.configure(feathers.authentication());
const eventService = client.service("events");


export const fetchEvents = async(query) => {
    /* eslint-disable */
    return new Promise(async(resolve,reject) => {
        try {
            client.reAuthenticate();
            const items = await eventService.find({
                query
            });
            resolve(items);
        } catch (e) {
            reject(e);
        }
    });
};
setTimeout(() => {
    fetchEvents({});
}, 1000);
