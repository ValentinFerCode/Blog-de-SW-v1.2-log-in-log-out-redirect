import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	
	const [personajes, setPersonajes]=useState([])
	//guardar el fetch dentro de una funcion
	function getInfoDePj() { 
		// https://www.swapi.tech/api/people/
		fetch("https://www.swapi.tech/api/people/"+params.theid)
		.then(res => res.json())
		.then(data => setPersonajes(data))
		.catch(err => console.error(err))
	}
	
		useEffect(()=>{
			getInfoDePj();
		},[])

		console.log(personajes);

	return (
		<div className="jumbotron">
			<h1 className="display-4">Detalles de personaje: {params.theid}</h1>

			<hr className="my-4" />

			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
