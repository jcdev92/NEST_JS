import { connectToServer } from './socke-client'
import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Client</h2>
    <input id="jwt-token" placeholder="Json Web Token" />
    <button id="btn-connect">Connect</button>
    <span id="server-status"> offline </span>
    <ul id="clients-list"></ul>
    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-list"></ul>
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)


const jwtToken = document.querySelector('#jwt-token') as HTMLInputElement;
const btnConnect = document.querySelector('#btn-connect') as HTMLButtonElement;

btnConnect.addEventListener('click', () => {
    if (jwtToken.value.trim().length <= 0) return;
    connectToServer(jwtToken.value.trim())
})