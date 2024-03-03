const button = document.querySelector('#button')
const h1 = document.querySelector('h1')
const url = ''

const socket = new WebSocket(url)

socket.onopen = (event) => {
    console.log(`Соединение ${url} открыто`, event)
}

socket.onerror = (event) => {
    console.error('Ошибка: ', event)
}

socket.onmessage = (event) => {
    console.log('Сообщение: ', event)
    h1.textContent = event.data
}

socket.onclose = (event) => {
    console.log(`Соединение ${url} закрыто`, event)
}

const data = {

}

button.onclick = () => {
    const str = JSON.stringify(data)
    socket.send(str)
    console.log(str)
}