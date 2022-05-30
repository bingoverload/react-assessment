import Axios from 'axios'

const getTask = async () => {
    const {data: allTask} = await Axios.get('http://localhost:4000/getTask')
    return allTask
}

const addTask = async (task) => {
    const {data: addTask} = await Axios.post('http://localhost:4000/addTask', task, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return addTask
}

const completeTask = async (id, payload) => {
    const {data: completeTask} = await Axios.put(`http://localhost:4000/completeTask/${id}`, payload, {
        headers: {
            'Content-Type': 'application/json'
        }
    }) 
    return completeTask
}

const updateTask = async (id, payload) => {
    console.log(id, payload)
    const {data: updatedTask} = await Axios.put(`http://localhost:4000/updateTask/${id}`, payload, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return updatedTask
}

const deleteTask = async (id) => {
    const {data: deletedTask} = await Axios.delete(`http://localhost:4000/deleteTask/${id}`)
    return deletedTask
}

export default {getTask, addTask, completeTask, updateTask, deleteTask}