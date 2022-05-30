import React, {useState, useEffect} from 'react'
import {Button, Center, Flex, Input, Table, Thead, Tbody, Tr, Th, Td, TableContainer} from '@chakra-ui/react'
import apiHelper from './API/apiHelper'

const TableForm = () => {
    const [displayTask, setAllDisplayTask] = useState([])
    const [addTask, setAddTask] = useState({
        tasks: '',
    })
    const [changeTask, setChangeTask] = useState('')
    const [completedTask, setCompletedTask] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await apiHelper.getTask()
                setAllDisplayTask(response)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

    const handleChange = (event) => {
        const {name, value} = event.target
        setAddTask({...addTask, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const task = {
                tasks: addTask.tasks,
                completed: false,
                toggle: false
            }
            const newTask = [...displayTask, task]
            setAllDisplayTask(newTask)
            setAddTask({
                tasks: ''
            })
            await apiHelper.addTask(task)
        } catch (error) {
            console.log(error)
            return (
                <div>Error, task not added</div>
            )
        }
       
    }

    const handleCompleted = async (id) => {
        try {
            let completed = displayTask.map(item => {
                if(item._id === id) {
                    item.completed = !item.completed
                    
                }
                return item
            })
            setCompletedTask(task => !task)
            setAllDisplayTask(completed)
            await apiHelper.completeTask(id, {completedTask})
        } catch (error) {
            console.log(error)
            return (
                <div>Error, task not completed</div>
            )
        }
    }

    const handleToggle = async (id) => {
        setAllDisplayTask(displayTask.map(item => {
            if(item._id === id) {
                item.toggle = !item.toggle
            }
            return item
        }))
    }

    const handleSave = async (id) => {
        try {
            let updatedTask = displayTask.map(item => {
                if(item._id === id) {
                    item.tasks = changeTask;
                    item.toggle = false
                }
                return item
            })
            await apiHelper.updateTask(id, {changeTask})
            setAllDisplayTask(updatedTask)
        } catch (error) {
            console.log(error)
            return (
                <div>Error, task not saved</div>
            )
        }
    }

    const handleDelete = async (id) => {
        try {
            setAllDisplayTask(displayTask.filter(item => {
                return item._id !== id
            }))
            await apiHelper.deleteTask(id)
        } catch (error) {
            console.log(error)
            return (
                <div>Error, task not deleted</div>
            )
        }
    }
    

  return (
    <React.Fragment>
        <TableContainer data-testid='task'>
            <h1>Task Tracker</h1>
            <Center>
                <Table variant='simple' data-testid='table'>
                    <Thead>
                        <Tr>
                            <Th>TASK</Th>
                            <Th>COMPLETION</Th>
                            <Th>ACTION</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {displayTask.map((item, index) => (
                            <Tr key={index}>
                                {item.toggle === true ? (
                                    <Input name="tasks" value={changeTask} onChange={(event) => setChangeTask(event.target.value)}/>
                                ) : 
                                    <Td style={{color: item.completed === true ? 'teal' : 'red'}} onClick={() => handleToggle(item._id)}>{item.tasks}</Td>
                                }
                                <Td><Button onClick={() => handleCompleted(item._id)}>Completed?</Button></Td>
                                <Td>
                                    <Button style={{marginRight: '10px'}}onClick={() => handleSave(item._id)} disabled={item.toggle === false || changeTask === ''}>Save</Button>
                                    <Button onClick={() => handleDelete(item._id)}>Delete</Button>
                                </Td>
                
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Center>
        </TableContainer>
        {loading && displayTask.length === 0 && <div>No Task Added</div>}
        <form onSubmit={handleSubmit} data-testid='form'>
            <Flex alignItems='center' justify='center'>
                <Input w="300px" style={{marginTop: '20px'}} name="tasks" value={addTask.tasks} placeholder="Add Tasks" onChange={handleChange}/>
                <Button style={{marginLeft: '10px', marginTop: '20px'}} type='submit' colorScheme='teal' data-testid='add task'>Add Task</Button>
            </Flex>
        </form>
    </React.Fragment>
  )
}

export default TableForm