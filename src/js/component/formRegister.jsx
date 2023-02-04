//Acá llamamos la funcion a la vista del formulario, necesitamos consumirlo en la view
//1er paso es importar el hook useContext
//2do paso llamar al componente propiamente dicho
import React, {useState, useContext} from "react";
import {Context} from "../store/appContext.js";
//Consumimos Navigate que nos permite crear una vista condicional
import {Navigate} from "react-router-dom"



const Formreg = () => {
   
  const[email,setEmail]=useState("")
  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  const {store, actions}=useContext(Context)

  function enviarDatos(e) {
      e.preventDefault()
      actions.register(email, username, password)
      setEmail("")
      setUsername("")
      setPassword("")
      console.log(email, username, password)
  }

  return (<> {store.auth === true ? <Navigate to="/"/>:
  <form className='container w-25 text-center' onSubmit={enviarDatos}>
      <h4 className='m-5'>Creación de nuevo usuario</h4>
<div className="mb-3">
<label htmlFor="exampleInputEmail1" className="form-label">Dirección de email</label>
<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} 
onChange={(e)=>setEmail(e.target.value)}/>
<div id="emailHelp" className="form-text">Nunca compartiremos tu email con nadie más</div>
</div>
<div className="mb-3">
<label htmlFor="exampleInputUserName" className="form-label">Nombe de usuario</label>
<input type="text" className="form-control" id="exampleInputUserName" aria-describedby="userNameHelp" value={username} 
onChange={(e)=>setUsername(e.target.value)}/>
<div id="userNameHelp" className="form-text">Elija un nombre de usuario</div>
</div>
<div className="mb-3">
<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
<input type="password" className="form-control" id="exampleInputPassword1" aria-describedby="passwordHelp" value={password} 
onChange={(e)=>setPassword(e.target.value)}/>
<div id="passwordHelp" className="form-text">Elija una clave segura</div>
</div>
<button type="submit" className="btn btn-primary">Submit</button>
</form>}
</>)
};

export default Formreg;