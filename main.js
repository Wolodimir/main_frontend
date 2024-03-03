const button = document.querySelector('#button')
const h1 = document.querySelector('h1')
const url = 'http://localhost:8080/ws'

const socket = new SockJS(url)
const stompClient = Stomp.over(socket)

stompClient.connect({}, () => {
    stompClient.subscribe('/topic/public', (payload) => {
        console.log(payload)
    });
})


stompClient.onopen = (event) => {
    console.log(`Соединение ${url} открыто`, event)
}

stompClient.onerror = (event) => {
    console.error('Ошибка: ', event)
}

stompClient.onmessage = (event) => {
    console.log('Сообщение: ', event)
    h1.textContent = event.data
}

stompClient.onclose = (event) => {
    console.log(`Соединение ${url} закрыто`, event)
}

const data = {
    health: 100,
    stamina: 1984,
    name: 'mda',
    id: 1231313
}

button.onclick = () => {
    const str = JSON.stringify(data)
    stompClient.send('/backend/character.sendMessage', {}, str)
    console.log(str)
}