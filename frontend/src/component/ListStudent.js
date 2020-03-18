import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
const ListStudent =()=>{
    const students = useSelector(state => state.student);
    const form = useSelector(state => state.form);
    const dispatch = useDispatch();
     useEffect(() => {
        getStudents()
      }, [])
   
    
    const getStudents = async () => {
        const result = await axios.get(`http://localhost/api/students`)
        
        dispatch({type:'GET_STUDENTS',state: result.data})
        
      }
    const deleteStudent = async (student_no)=>{
        await axios.delete(`http://localhost/api/students/${student_no}`)
         dispatch({type:'DELETE_STUDENT',no: student_no})
        
        getStudents()
    }

    const updateStudent = async (student_no)=>{
        await axios.put(`http://localhost/api/students/${student_no}`, form)
        dispatch({type:'UPDATE_STUDENT', 
    no: student_no,
    student: {...form,no: student_no},
})
getStudents()

    }
    
      const printStudents = ()=>{
        if(students && students.length){
            return students.map((student,index)=>{
                return(
                    <li key={index}>
                            {student.name}  {student.surname  } : 
                            {student.id} Major: {student.Major} GPA:{student.GPA}
                            <button onClick={()=>deleteStudent(student.no)}>DELETE</button>
                            <button onClick={()=>updateStudent(student.no)}>UPDATE</button>
                    </li>
                    
                )
            })
        }
        else{
            return(<h1>No data</h1>)
        }
    }
    
    return (
        <div>
         {printStudents()}
        </div>
    )
}
export default ListStudent