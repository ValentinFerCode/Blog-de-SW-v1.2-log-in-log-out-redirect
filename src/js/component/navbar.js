import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
//Queremos utilizar auth para el logout, entonces importamos Context
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom"; //Importamos el hook useNavigate para redireccionar desde una funcion

export const Navbar = () => {
	// console.log(store.favorite);
	const {store, actions}=useContext(Context);
	const navigate = useNavigate() //Activamos useNavigate

	//1ra de las cosas por hacer es desloguearse
	//2da cosa es redirigir la vista, no podemos hacerlo con Navigate entonces usaremos useNavigate. Porque si tenemos que hacer varias acciones y no podemos colocar esa condición en el ternario, tendremos que complejizar la lógica. Y si debemos complejizar o escribir más lineas de codigo no podemos llevar a cabo la funcion actions.logout(), eso no existira y lo ataremos a handleLogout().
function handleLogout(){
	actions.logout() //Le diremos a la función que cierre sesión
	//Lo redirigiremos no del código HTML sino del código JS, para llevar a cabo eso usaremos un hook de React-Router que se llama useNavigate
	navigate("/") //Usamos Navigate para redireccionar
}

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Star_wars2.svg/1200px-Star_wars2.svg.png" style={{width:"80px"}} alt="" />
			</Link>
				<div className="ml-auto">	
					<div className="btn-group">
						{/* Uso la etiqueta link para enviarlo a la vista login */}
						<Link to="/login">
						{/* Usamos el operador ternario para crear la condición para que desaparezca el boton si estamos log, sino no*/}
						{store.auth === false? <button className="btn btn-primary rounded mx-1">Login</button> : null}
						</Link>

						{/* Usamos el operador ternario para crear la condición para que aparezca el logout si estamos log, sino no */}
						{store.auth === true? <button className="btn btn-primary rounded mx-1" onClick={()=>actions.logout()}>Logout</button> : null}

						<button type="button" className="btn btn-danger dropdown-toggle rounded me-2" data-bs-toggle="dropdown" aria-expanded="false">
							Favorites
							
							{/* <span className="text-danger">
                            {
                            " " + contadorLikes
                        	}</span> */}

						</button>
						<ul className="dropdown-menu dropdown-menu-end">
							
						{store.favorites.map((element, index) =><li key={index} ><button className="dropdown-item" type="button" key={index}>{element} </button></li>)}
							
						</ul>
					</div>
			</div>
		</nav>
	);
};


