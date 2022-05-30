import Axios from 'axios'

const getTask = async () => {
    const {data: allTask} = await Axios.get('http://localhost:4000/getTask')
    return allTask 
}

const addTask = async (task) => {
    try {
        const {data: addTask} = await Axios.post('http://localhost:4000/addTask', task, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return addTask
    } catch (error) {
        console.log(error + ' Add task failed')
    }
}

const completeTask = async (id, payload) => {
    try {
        const {data: completeTask} = await Axios.put(`http://localhost:4000/completeTask/${id}`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        }) 
        return completeTask
    } catch (error) {
        console.log(error + ' Task did save completed')
    }
}

const updateTask = async (id, payload) => {
    try {
        const {data: updatedTask} = await Axios.put(`http://localhost:4000/updateTask/${id}`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return updatedTask
    } catch (error) {
        console.log(error + ' Task did not update error')
    }
}

const deleteTask = async (id) => {
    try {
        const {data: deletedTask} = await Axios.delete(`http://localhost:4000/deleteTask/${id}`)
        return deletedTask
    } catch (error) {
        console.log(error + 'Task did not get deleted')
    }
}

export default {getTask, addTask, completeTask, updateTask, deleteTask}