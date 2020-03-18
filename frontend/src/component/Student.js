import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import ListStudent from './ListStudent'

const Student =()=>{
    const dispatch = useDispatch();
    const form = useSelector(state => state.form)
    const students = useSelector(state => state.student)

   
    const addStudent = async () => {
        await axios.post(`http://localhost/api/students`, form)
        dispatch({
            type: 'ADD_STUDENT', student: {
                no: students.length > 0 ? students[students.length-1].no+1 : 0,
                ...form
            }
        })
    }

 


    return (
        <div>
            <ListStudent/>
            {form.name}  {form.surname} {form.id} {form.Major} {form.GPA} 
            <br/>
            <input
            type="text"
            placeholder="enter name"
            onChange={(e) => dispatch({ type: 'CHANGE_NAME', name: e.target.value })}
            /><br/>
             <input
            type="text"
            placeholder="enter surname"
            onChange={(e) => dispatch({ type: 'CHANGE_SURNAME', surname: e.target.value })}
            /><br/>
             <input
            type="text"
            placeholder="enter Id"
            onChange={(e) => dispatch({ type: 'CHANGE_ID', id: e.target.value })}
            /><br/>
             <input
            type="text"
            placeholder="enter major"
            onChange={(e) => dispatch({ type: 'CHANGE_MAJOR', Major: e.target.value })}
            /><br/>
             <input
            type="number"
            placeholder="enter GPA"
            onChange={(e) => dispatch({ type: 'CHANGE_GPA', GPA: e.target.value })}
            /><br/>
            <button onClick ={addStudent}>ADD</button>
           

        </div>
    )
}
export default Student