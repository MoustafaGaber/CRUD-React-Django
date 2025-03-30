import React, { useState } from 'react'
import axios from 'axios'

const TodoForm = ({setTodos,fetchData}) => {
    const [newTodo, setNewTodo] = useState({
        'body': ''
    })

    const handleChange = (e) => {
        setNewTodo(prev => ({
            ...prev,
            'body': e.target.value
        }))
        console.log(newTodo.body);
        
    }
    const postTodo = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/todo/',newTodo)
            setNewTodo({ 'body': '' })
            fetchData()
        } catch (error) {
            console.log(error);
            
        }
    }


  return (
    <div>
        <h1>TodoForm</h1>
        <input type="text"  onChange={handleChange} value={newTodo.body}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                postTodo();
            }
        }}
        />
        <button onClick={postTodo} 
        
        className='d-inline-block m-3 btn btn-primary' type="button"> Add Todo</button>
        
        </div>
  )
}

export default TodoForm