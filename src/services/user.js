
import feathers from "@feathersjs/client";
import io from "socket.io-client";
const client = feathers();
const socket = io("http://localhost:3030");
client.configure(feathers.socketio(socket));
client.configure(feathers.authentication());
const userServices = client.service("subscription");


export const setUser = async() => {
    return new Promise((resolve,reject) => {
        try{ 
            client.reAuthenticate().then(res => {
                resolve(res.user);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        } catch (e) {   
            reject(e);
        }
    });
};

export const fetchUserSubScription = async() => {
    /* eslint-disable */
    return new Promise(async(resolve,reject) => {
        try {
            client.reAuthenticate();
            let user = await userServices.find();
            resolve(user);
        } catch (e) {
            reject(e);
        }
    });
};