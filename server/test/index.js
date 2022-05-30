const chai = require('chai')
const chaiHttp = require("chai-http")
const mongoose = require('mongoose')
require('dotenv').config()
const taskRoutes = require('../routes/taskRoutes')

chai.use(chaiHttp)

describe('Test connection to mongoose', () => {
    before((done) => {
        mongoose.connect(process.env.MONGOKEY || 'mongodb://localhost/projectHR')
        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'Connection error'))
        db.once('Open', () => {
            console.log('Connected to database')
        })
        done()
    })
})

describe('Should connect to express port', () => {
    it('GET', (done) => {
        chai.request('http://localhost:4000')
        .get('/')
        .end((error, res) => {
            if(error) {
                console.log(error)
            } else {
                chai.assert.equal(res.status, 200, 'Port connected')
                console.log('Passed')
                return
            }
            done()
        })
    })
})

describe('Should get all tasks in database', () => {
    it('Get Tasks', (done) => {
        chai.request(taskRoutes)
        .get('getTask')
        .end((error, res) => {
            if(error) {
                console.log(error)
            } else {
                chai.assert.equal(res.status, 200, 'Got all tasks')
                console.log('Passed')
                return
            }
            done()
        })
    })
})

describe('Should create task in database', () => {
    it('Create Task', (done) => {
        chai.request(taskRoutes)
        .put('addTask')
        .send({task: 'Test Task', completed: false, toggle: false})
        .end((error, res) => {
            if(error) {
                console.log(error)
            } else {
                chai.assert.equal(res.status, 200, 'Added new task')
                console.log('Passed')
                return
            }
            done()
        })
    })
})

describe('Should complete task in database', () => {
    it('Create Task', (done) => {
        chai.request(taskRoutes)
        .put('completeTask/:id')
        .send({id: '62928482fc39a89809b11591', completed: true})
        .end((error, res) => {
            if(error) {
                console.log(error)
            } else {
                chai.assert.equal(res.status, 200, 'Completed Task')
                console.log('Passed')
                return
            }
            done()
        })
    })
})


describe('Should update task in database', () => {
    it('Create Task', (done) => {
        chai.request(taskRoutes)
        .put('updateTask/:id')
        .send({id: '62928482fc39a89809b11591', tasks: 'Changed'})
        .end((error, res) => {
            if(error) {
                console.log(error)
            } else {
                chai.assert.equal(res.status, 200, 'Completed Task')
                console.log('Passed')
                return
            }
            done()
        })
    })
})


describe('Should delete task in database', () => {
    it('Create Task', (done) => {
        chai.request(taskRoutes)
        .put('completeTask/:id')
        .send({id: '629288e367d70ec7037e5471'})
        .end((error, res) => {
            if(error) {
                console.log(error)
            } else {
                chai.assert.equal(res.status, 200, 'Deleted Task')
                console.log('Passed')
                return
            }
            done()
        })
    })
})