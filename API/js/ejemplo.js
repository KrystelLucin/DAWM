let joke = document.querySelector('.text')
let url = "https://api.chucknorris.io/jokes/random"

let cargarDatos = () => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            joke.innerHTML = data['value']
        })
        .catch(console.error)
}

window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos()
})
