import React, { useState } from 'react'
import { MdDeleteOutline,MdEditNote,MdCheckBoxOutlineBlank ,MdCheckBox   } from "react-icons/md";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'


const Table = ({todos,setTodos,isLoading }) => {

  const [editText, setEditText] = useState({
    'body': ''
  })

  const handleChange = (e) => {
    console.log(e.target.value);
    setEditText(prev => ({
      ...prev,
      'body': e.target.value
    }))
    console.log(editText);
  }

  const handleClick = () => {
    handleEdit(editText.id, editText)
    setEditText({
      'body': ""
    })
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
      // const newList = todos.filter(todo => todo.id !== id)
       setTodos(todos.filter(todo => todo.id !== id))
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value)
      console.log(response.data);
      const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
      setTodos(newTodos)
    } catch (error) {
      console.log(error);
    }
  }

  const handleCheckbox = (id, value) => {
    console.log(value.completed);
    handleEdit(id, {
      'completed': !value
    })
  }

  return (
    <div>
    <table className="table table-striped cursor-pointer table-primary">
<thead>
 <tr>
   <th scope="col">Checkbox</th>
   <th scope="col">To Do</th>
   <th scope="col">Date Created</th>
   <th scope="col">Status</th>
   <th scope="col">Action</th>
 </tr>
</thead>
<tbody >
    {isLoading ? <tr><td>isloading</td></tr> : <> 

        {todos.map((item)=>(

       
         
          <tr key={item.id}>
        
        <td  > <span role='button' onClick={()=>handleCheckbox(item.id,item.completed)} > {item.completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank /> }  </span>  </td>
        <td  > {item.body}  </td>
        <td > {new Date( item.created).toLocaleString()}  </td>
        <td className="text-center" > <span className={`p-2 rounded  ${ item.completed ? 'badge bg-success' : 'badge bg-danger'}`}> {item.completed? 'Done':'Incomplete'} </span> </td>
        <td  > <span role='button' >
        <lable type="button"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">

          <MdEditNote onClick={() => setEditText(item)} />
          </lable>
          
          </span> | <span role='button' ><MdDeleteOutline onClick={()=>handleDelete(item.id)} /></span> </td>
       
        </tr>
    ))}



    </>}
</tbody>
</table>


<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <input onChange={handleChange} type="text" value={editText.body}  />

      </div>
      <div class="modal-footer">
        <button onClick={handleClick} type="button" class="btn btn-primary" data-bs-dismiss="modal">Edit</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>


{/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button> */}





    </div>
  )
}

export default Table