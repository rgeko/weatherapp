//FETCH IS CLIENT-SIDE -> CAN BE RUN ONLY ON BROWSER AND NOT IN NODEJS



//  how to target elements: if NAME -> put NAME, if CLASS -> put .CLASS, if ID -> put #ID
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.querySelector(' #paragraph_1')
const p2 = document.querySelector('#paragraph_2')

//CALLBACK FUNCTIONS GETS AND EVENT (e) AS INPUT AND WITH PREVENT DEFAULT WE PREVENT
//THE PAGE FROM REFRESHING EVERY TIME WE PRESS THE BUTTON SEARCH
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    p1.textContent = 'Loading...'
    p2.textContent = ' '

    
    //EXTRACT WHATEVER VALUE IS IN THE SEARCH FIELD WHEN I PRESS THE SEARCH BUTTON
    const location = search.value
    fetch('/weather?location=' + location).then((response) => {
    response.json().then(({error, location, forecast} = {}) => {
        if(error) {
            p1.textContent = 'Error: ' + error
            p2.textContent = ' '
        } else {
            p1.textContent = location
            p2.textContent = forecast
        }
    })
})
})


