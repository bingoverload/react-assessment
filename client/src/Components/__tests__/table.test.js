import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import TableForm from '../Table'

jest.mock("axios")

test('Should render Table component', async () => {
    render(<TableForm/>)
    const taskElement = screen.getByTestId('task')
    expect(taskElement).toBeInTheDocument()
})

test('Check render form', async () => {
    render(<TableForm/>)
    const formElement = screen.getByTestId('form')
    await waitFor(() => expect(formElement).toBeInTheDocument())
})

test('Check table render', async () => {
    render(<TableForm/>)
    const tableElement = screen.getByTestId('table')
    await waitFor(() => expect(tableElement).toBeInTheDocument()) 
})

test('Check if no task added', async () => {
    render(<TableForm/>)
    const checkDiv = screen.getByText(/no task added/i)
    await waitFor(() => expect(checkDiv).toBeInTheDocument())
})

test('Check adding task', async () => {
    const {getByPlaceholderText, getByTestId} = render(<TableForm/>)
    const inputField = getByPlaceholderText(/add tasks/i)
    const getButton = getByTestId('add task')
    fireEvent.change(inputField, {target: {value: 'added task'}})
    fireEvent.click(getButton)
})
