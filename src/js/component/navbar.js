import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";


export const Navbar = () => {
	// console.log(store.favorite);
	const {store, actions}=useContext(Context);

	// const [contadorLikes, setContadorLikes] = useState("")
	
	// console.log(store.favorites);

	// function contarLikes() {
    //     setContadorLikes(store.likesGuardados?.length)
    // }


	// useEffect(() => {
    //     contarLikes()
    // }, [store.likesGuardados])



	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Star_wars2.svg/1200px-Star_wars2.svg.png" style={{width:"80px"}} alt="" />
			</Link>
				<div className="ml-auto">	
					<div className="btn-group">
						<button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
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


