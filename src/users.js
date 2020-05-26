const users=[]



//add user function
const addUser=(obj)=>{
    const a=users.find((user)=> {
        return (user.username==obj.username && user.room==obj.room)
    })

    if(a){
        return ({error:obj.username+' is already there in this room'})
        
    }
    if(obj.username==='' || obj.room===''){
        return ({error:'Both fields need to be filled!'})
    }
    else{
        users.push(obj)
        return ({msg:obj.username})
    }
    
}

//get one user by id function
const getUser=(id)=>{
    const a=users.find((user)=>{
        return user.id==id
    })
    return a
}

//get all users in a room
const getAllUsersInRoom=(room)=>{
    const a=users.filter((user)=>{
        return user.room==room
    })

    return a
}

//delete a user by id
const deleteUser=(id)=>{
    const index=users.findIndex((user)=>{
        return user.id==id
    })
    if(index==-1){
        return 'No such socket id exists'
    }
    const deletedobject=users[index]
    users.splice(index,1)
    return deletedobject
}

module.exports={addUser,deleteUser,getAllUsersInRoom,getUser}