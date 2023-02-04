//Acá llamamos la funcion a la vista del formulario, necesitamos consumirlo en la view
//1er paso es importar el hook useContext
//2do paso llamar al componente propiamente dicho
import React, {useState, useContext} from "react";
import {Context} from "../store/appContext.js";
//Consumimos Navigate que nos permite crear una vista condicional
import {Navigate} from "react-router-dom"



const Formlog = () => {
   // //Declaracion de estados
   const[email,setEmail]=useState("")
   const[password,setPassword]=useState("")
   //Activamos el contexto y desestructuramos actions que es donde tenemos guardado el metodo login
   //Consumimos Navigate a la par colocamos store
   const {store, actions}=useContext(Context)

   function enviarDatos(e) {
    //Antes de colocar lo de abajo, sucedía que al tocar submit se vaciaban los campos(por default), pero se debe colocar esto ya que el default behavior entorpece la lógica creada. Los inputs son componentes controlados y no dejarselo al elemento HTML según su default behavior para que haga las cosas. Se deben controlar de principio a fin
    e.preventDefault() 
    //Vemos en la consola lo que sucede
    // console.log(email, password);
    //Para poder utilizar a la funcion login la debemos llamar así: (le pasamos los valores email y password y nos va a llegar lo que se captura en los recipientes)
    actions.login(email,password)
    //Para limpiar o vaciar los inputs usamos:
    setEmail("")
    setPassword("")
   }
    // //Realizamos fetch para solicitar la info. Luego necesitamos llevar al flux la respuesta que nos está dando para que se lea en toda la app y no solo en esta vista. Debido a que con el token podremos saber en cualquier vista si mi usuario esta logueado, si esta logueado lo dejo mantenerse en una vista protegida y sino, lo redirecciono. Si expira o se cierra la sesion en alguna vista lo que sucede es que nos redirije al login

    // //La URL es la testeada en el Postman
    // fetch('https://3000-valentinfer-flaskstarwa-8rxr6xqa8nz.ws-us85.gitpod.io/login',{

    // //Para el method necesitamos header y body    
    //     method:'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    // //En los parentesis va el tipo de dato JSON. Luego colocamos lo que se ingreso en el input dentro de una variable (email y password)
    //     body: JSON.stringify({"email":email,"password":password}) // body data type must match "Content-Type" header
    // })
    // .then((response) => response.json())
    // .then((data) => console.log(data))
    // //El catch con la arrow function nos avisa si algo sale mal
    // .catch((err)=>console.log(err))
   


//    if (condition) {//true
//     //bloque de codigo
//    }else{//false
// //bloque de codigo
//    }

// condition ? bloque de codigo si es true : bloque de codigo si es false

// store.auth === true ? <Navigate to="/ruta hacia donde ir"/> : <Formulario/>



//if (condition){//true
//  //bloque de codigo
//}else{//false
//  //bloque de codigo
//}
//El ternario es una version más corta del if o menos verbosa, simplificando en una sola linea
// condition ? bloque de codigo si es true : bloque de codigo si es false 


    return (
    <>
    {/* Creamos un ternario a la par usamos Navigate, si es === a true, vete hacia una ruta por ej:home o /, sino que siga mostrando el form */}
    {store.auth === true ? <Navigate to="/"/>:
    // //Añadimos un evento al form (onSubmit)
    <form className="w-50 mx-auto" onSubmit={enviarDatos}> 
        <div className="mb-3 container">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>}
    </>
    
  );
};

export default Formlog;