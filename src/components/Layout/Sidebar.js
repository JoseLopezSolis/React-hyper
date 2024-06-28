import React from 'react'
import "./sidebar.scss"
import UseCrud from './UseCrud' 
import ProfilePhoto from '../imgs/logo-hyper.png'

export default function Sidebar() {
  return (
    <div class="d-flex sidebar">
      <div id="sidebar" className='sidebar-background '>
        <div class="text-center mt-5 ">
           API - usuarios
        </div>

        <div className='container mt-5'>
          <img src={ProfilePhoto} className='profile-photo rounded mx-auto d-block' />
          <p className='text-center mt-4 label-administrator'>Administrator</p>
        </div>
    </div>


    <div class="content w-100 ">
      <nav class="navbar navbar-expand-lg navbar-dark navbar-background">
        <div class="container-xl">
          <p class="navbar-brand my-auto mx-5 title-section" href="#">
          Lista de usuarios
          </p>
          {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07XL" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button> */}
      
          <div class="collapse navbar-collapse mx-5" id="navbarsExample07XL">
            {/* <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdown07XL" data-toggle="dropdown" aria-expanded="false">Dropdown</a>
                <div class="dropdown-menu" aria-labelledby="dropdown07XL">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
            </ul> */}
            {/* <form class="form-inline my-2 my-md-0">
              <input class="form-control" type="text" placeholder="Buscar usuario" aria-label="Search" />
            </form>  */}
         </div>
        </div>
      </nav>
      <section class="p-3">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <UseCrud/>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  )
}
