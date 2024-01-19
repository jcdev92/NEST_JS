import { Manager, Socket } from 'socket.io-client';
let socket: Socket;
export const connectToServer = (token: string) => {
    const manager = new Manager("http://localhost:3000/socket.io/socket.io.js", {
        extraHeaders: {
            authentication: token
        }
    });
    socket?.removeAllListeners();
    socket = manager.socket("/");
    addListerner();
}

const addListerner = () => {
    const servertSatatusLabel = document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#clients-list')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-list')!;
    socket.on('connect', () => {
        servertSatatusLabel!.innerHTML = 'online';
    });
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
        servertSatatusLabel!.innerHTML = 'offline';
    });
    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(clientId => {
            clientsHtml += `<li>${clientId}</li>`
        })
        clientsUl.innerHTML = clientsHtml;
    })
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (messageInput.value.trim().length <= 0) return;
        socket.emit('message-from-client', {
            id: '123',
            message: messageInput.value
        })
        messageInput.value = '';
    })
    socket.on('message-from-server', (payload: { message: string, fullName: string }) => {
        const newMessage = `<li>
        <strong>${payload.fullName}: </strong>
        <span>${payload.message}</span>
        </li>`
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li);
    })
}