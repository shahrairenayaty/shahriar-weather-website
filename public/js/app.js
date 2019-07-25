const weatherFrom = document.querySelector('form')
const search  = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
messageOne.textContent = ''
messageTwo.textContent = ''

weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const location =search.value
    const url = '/weather?address='+location;
    messageOne.textContent = 'loading...' 
    fetch(url).then((res) => {
    res.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            console.log(data)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecastData
        }
    })
})
})