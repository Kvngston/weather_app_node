console.log('loaded')

// fetch api


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading';
    messageTwo.textContent = '';

    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
        response.json().then((data)=>{
           if (data.code === '01'){
               messageOne.textContent = data.message
           }else{
               messageTwo.textContent = '';
               messageOne.textContent = data.temp + data.humidity + data.description + data.name;
           }
        })
    })
    
})