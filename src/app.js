const express=require('express')
const path=require('path')
const app=express()
const http=require('http').createServer(app)
const io=require('socket.io')(http)
const port=process.env.PORT || 3000
const users=require('./users')

//Directory path
const publicDirectoryPath=path.join(__dirname,'../public')

let count=0;
io.on('connection',(socket)=>{

    socket.on('message',(message)=>{
        const user=users.getUser(socket.id)
        socket.to(user.room).broadcast.emit('message', {user:user.username,message:message})
        
    })

    socket.on('disconnect',()=>{
        
        const deletedobject= users.deleteUser(socket.id)   
        if(deletedobject.username){
            io.to(deletedobject.room).emit('adminmessage',deletedobject.username +' has left the room')
            io.to(deletedobject.room).emit('deleteuserfromlist',deletedobject.username)
        }  
        
    })


    socket.on('join',(user,callback)=>{
        user.id=socket.id
        const message =users.addUser(user)
        if(message.error){
            callback({error:message.error})
            
        }
        else{
            socket.emit('adminfirstmessage','Welcome to the chat room!')
            socket.join(user.room)
            socket.to(user.room).broadcast.emit('adminmessage',message.msg+ ' has joined the room!')
            const userslist=users.getAllUsersInRoom(user.room)
            socket.emit('updatelist',userslist)
            socket.to(user.room).broadcast.emit('updatelist',[user])
        }
    })



})


app.use(express.static(publicDirectoryPath));

http.listen(port,()=>{
    console.log("port "+port+" is up")
})