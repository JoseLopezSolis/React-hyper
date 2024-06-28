import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CloseIcon from "../imgs/crosses.png" 
import "./UseCrud.css"
import Button from "../UI/Button"
import EditUserIcon from "../imgs/editar (1).png"
import DeleteUserIcon from "../imgs/borrar.png"

export default function UseCrud() {
  const [users, setUsers] = useState([])
  const [nombre, setNombre] = useState()
  const [apellido, setApellido] = useState()
  const [edad, setEdad] = useState()
  const [editMode, setEditMode] = useState(false)
  const [userId, setUserId] = useState(null)
  const [hide, setHide] = useState("hide")

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
    setUserId(user.id)
    setNombre(user.nombre)
    setApellido(user.apellido)
    setEdad(user.edad)
    setEditMode(true)
    setHide("show")
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(editMode) {
      await modifyUser(userId, nombre, apellido, edad)
    } else{
      await createUser(nombre, apellido, edad)
    }

    setNombre("")
    setApellido("")
    setEdad("")
    fetchUsers()
    setEditMode(false)
    setHide("hide")
  }
  
  const handleCloseButton = async (event) => {
    event.preventDefault();
    setHide("hide")
    setEditMode(false)
    setNombre("")
    setApellido("")
    setEdad("")
  }

  const handleShowForm = async (event) => {
    event.preventDefault();
    setHide("show")
  }

  const handleDeleteUser = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      deleteUser(id)
    }
  };

  return (
    <div className='container'>
      <div className='add-button-container'>
        <Button onClickHandler={handleShowForm} className="float-end" content="Agregar nuevo"/>
      </div>
      <div className='center-modal'>
        <div className={`modal-add-user mt-3 modal-styles p-4 ${hide}`}>
          <img src={CloseIcon} className='close-icon' onClick={handleCloseButton}/>
            <h2 className='text-center mb-4 fw-bold title-modal-section'> {editMode ? "Editar usuario" : "Añadir usuario"}</h2>
          <form onSubmit={handleSubmit} >
              <div className="row mb-1">
                <div className="col">
                  <div data-mdb-input-init className="form-outline mb-2">
                    <input  type='text' name='nombre' value={nombre}  onChange={handleChangeNombre} required  className="form-control" placeholder='Nombre'/>
                    {/* <label className="form-label fw-bolder" for="form6Example1">Nombre</label> */}
                  </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init className="form-outline mb-2">
                    <input type='text' name='apellido' value={apellido} onChange={handleChangeApellido} required className="form-control" placeholder='Apellido' />
                    {/* <label className="form-label fw-bolder" for="form6Example2">Apellido</label> */}
                  </div>
                </div>
              </div>

              <div data-mdb-input-init className="form-outline mb-2">
                <input type='text' name='edad' value={edad} onChange={handleChangeEdad} required className='form-control' placeholder='Edad' id="edad-input"/>
                {/* <label className="form-label fw-bolder" for="form6Example3">Edad</label> */}
              </div>

              <div className='button-container mt-4'>
              <Button onClickHandler={null} className=" w-100 " content={editMode ? "Actualzar" : "Crear usuario"}/>
                {/* <button  className="btn btn-primary btn-block styled-button">{editMode ? "Actualzar" : "Crear usuario"}</button> */}
              </div>
            </form>
          </div>
        </div>

      <div className='container mt-5 container-table'>
    <table className="table table-hover text-center table-light">
          <thead >
            <tr>
              <th scope="col" className="fw-bold">#</th>
              <th scope="col" className="fw-bold">Nombre</th>
              <th scope="col" className="fw-bold">Apellido</th>
              <th scope="col" className="fw-bold">Edad</th>
              <th scope="col" className="fw-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="fw-light">{user.id}</td>
                <td className="fw-light">{user.nombre}</td>
                <td className="fw-light">{user.apellido}</td>
                <td className="fw-light">{user.edad}</td>
                <td className="fw-light">
                  <a onClick={() => handleDeleteUser(user.id)}>
                    <img src={DeleteUserIcon} className='icon mx-2'/>
                  </a>
                  <a onClick={() => handleEdit(user)}>
                  <img src={EditUserIcon}  className='icon mx-2'/>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 ? (<p className="text-center mt-5">Nada que mostrar...</p>) : null}
      </div>
    </div>
  )
}
