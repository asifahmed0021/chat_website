const socket=io()

//getting url params
const params = new URLSearchParams(window.location.search)
const username=params.get('username')
const room=params.get('room')

//html query selectors
const msginput=document.querySelector('.msg')
const sendbtn=document.querySelector('.sendbtn')
const content=document.querySelector('.content')
const list=document.querySelector('.list')
const innerlist=document.querySelector('.l')



//joining the room
socket.emit('join',{username:username,room:room},(msg)=>{
    if(msg.error){
        location.href='/'
        alert(msg.error)
    }
})

//on entry update list
socket.on('updatelist',(msg)=>{
    for(let i=0;i<msg.length;i++){
        let htmlString='<li id="'+msg[i].username + '" class="member">' +msg[i].username+'</li>'
        innerlist.insertAdjacentHTML('beforeend',htmlString)
        
    }
})

//on delete update user list
socket.on('deleteuserfromlist',(username)=>{
    document.getElementById(username).remove()
})

//message
socket.on('message',(message)=>{
    let htmlString= '<div class="msgdiv"><p class="message">%%Message%%</p><p class="sender">%%Sender%%</p><p class="time">%%time%%</p></div>'
    const date = new Date();
    const lastChild= content.lastChild
    const time = date.toTimeString().split(' ')[0].split(':');
    const tim= time[0] + ':' + time[1] +':' +time[2]
    htmlString=htmlString.replace('%%Message%%',message.message)
    htmlString=htmlString.replace('%%Sender%%',message.user)
    htmlString=htmlString.replace('%%time%%',tim)
    content.insertAdjacentHTML('beforeend',htmlString)



    //taking care of automatic scrolling
    const firstChild=content.firstChild
    const rect = lastChild.getBoundingClientRect()
    const viewPort= content.getBoundingClientRect()
    if(rect.bottom-viewPort.bottom<=rect.height){
        lastChild.scrollIntoView()
    }

})

//welcome messge by admin
socket.on('adminmessage',(message)=>{
    let htmlString= '<div class="msgdiv"><p class="message">%%Message%%</p><p class="sender">%%Sender%%</p><p class="time">%%time%%</p></div>'
    const date = new Date();
    const lastChild= content.lastChild
    const time = date.toTimeString().split(' ')[0].split(':');
    const tim= time[0] + ':' + time[1] +':' +time[2]
    htmlString=htmlString.replace('%%Message%%',message)
    htmlString=htmlString.replace('%%Sender%%','Admin')
    htmlString=htmlString.replace('%%time%%',tim)
    content.insertAdjacentHTML('beforeend',htmlString)

    //taking care of automatic scrolling
    const firstChild=content.firstChild
    const viewPort= content.getBoundingClientRect()
    const rect = lastChild.getBoundingClientRect()
    if(rect.bottom-viewPort.bottom<=rect.height){
        lastChild.scrollIntoView()
    }    
})

socket.on('adminfirstmessage',(message)=>{
    let htmlString= '<div class="msgdiv"><p class="message">%%Message%%</p><p class="sender">%%Sender%%</p><p class="time">%%time%%</p></div>'
    const date = new Date();
    const time = date.toTimeString().split(' ')[0].split(':');
    const tim= time[0] + ':' + time[1] +':' +time[2]
    htmlString=htmlString.replace('%%Message%%',message)
    htmlString=htmlString.replace('%%Sender%%','Admin')
    htmlString=htmlString.replace('%%time%%',tim)
    content.insertAdjacentHTML('beforeend',htmlString)
   
})

//On send button click
sendbtn.addEventListener('click',()=>{
    const message=msginput.value
    msginput.value=''
    msginput.focus()
    if(message!==''){
        socket.emit('message',message)
        let htmlString=    '<div class="msgdiv"><p class="message_self">%%Message%%</p></p><p class="time">%%time%%</p></div>'
        const date = new Date();
        const time = date.toTimeString().split(' ')[0].split(':');
        const tim= time[0] + ':' + time[1] +':' +time[2]
        htmlString=htmlString.replace('%%Message%%',message)
        htmlString=htmlString.replace('%%time%%',tim)
        content.insertAdjacentHTML('beforeend',htmlString)

        //automatic scrolling
        const lastChild= content.lastChild
        lastChild.scrollIntoView()
    }
    
    
})


