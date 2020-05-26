const button=document.querySelector('.button')
const username=document.querySelector('.username')
const room=document.querySelector('.room')
const form=document.querySelector('.form')

button.addEventListener('click',()=>{
    if(username.value!=='' && room.value!==''){
        form.action='./chat.html'
    }
    else{
        alert('Fill all fields!')
    }
})

