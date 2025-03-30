import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Table from './components/Table'
import axios from 'axios'
import TodoForm from './components/TodoForm'

function App() {
  const [todos, setTodos] = useState("")
  const [isLoading,setIsLoading]=useState(true)

  const fetchData=async ()=>{
    try {
         const res=await axios("http://127.0.0.1:8000/api/todo/");
         setTodos(res.data);
        //console.log(res.data);
         setIsLoading(false);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
          fetchData()
  },[])
  

  return (
    <><div className='d-flex align-items-center justify-content-center vh-100' >
      <div className=' w-75 alert alert-secondary role="alert  ' >
      <nav className="navbar bg-body-tertiary">
          <div className="container-fluid ">
          <h1 className='mx-auto text-center'>App component</h1>
          </div>
      </nav>

        <TodoForm setTodos={setTodos} fetchData={fetchData} />
        <hr />
       
       <Table todos={todos} setTodos={setTodos} isLoading={isLoading} />

      </div>
      </div>
      
    </>
  )
}

export default App
