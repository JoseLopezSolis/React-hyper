import React, {useState, useEffect} from 'react'
import axios from 'axios'
import "./UseCrud.css"

export default function UseCrud() {
  const [users, setUsers] = useState([])
  const [nombre, setNombre] = useState()
  const [apellido, setApellido] = useState()
  const [edad, setEdad] = useState()

  useEffect(() => {
    fetchUsers()
  },[])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/userapi/user/')
      setUsers(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const createUser = async (nombre, apellido, edad) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/userapi/user/',{nombre, apellido, edad})
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const modifyUser = async (id, nombre, apellido, edad) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/userapi/user/${id}/`,{nombre, apellido, edad})
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/userapi/user/${id}/`)
      fetchUsers();
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleChangeNombre = (event) => setNombre(event.target.value)
  const handleChangeApellido = (event) => setApellido(event.target.value)
  const handleChangeEdad = (event) => setEdad(event.target.value)

  const handleEdit = (user) =>{
    setNombre(user.nombre)
    setApellido(user.apellido)
    setEdad(user.edad)
  }


  return (
    <div>
      <form>
        <input type='text' name='nombre' value={nombre}  onChange={handleChangeNombre} placeholder='Ingresa tu nombre'required/>
        <input type='text' name='apellido' value={apellido} onChange={handleChangeApellido} placeholder='Ingresa tu apellido'required/>
        <input type='number' name='edad' value={edad} onChange={handleChangeEdad} placeholder='Ingresa tu edad'required/>
        <button>Enviar</button>
      </form>

      <div className='list-information'>
        <table>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.edad}</td>
              <td>
                <button onClick={ () => deleteUser(user.id)}>Eliminar</button>
                <button onClick={ () => handleEdit(user)}>Modificar</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}
