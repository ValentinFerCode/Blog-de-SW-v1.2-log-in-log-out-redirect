const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            //const [personajes, setPersonajes]=useState([])
            likesGuardados: [],
            personajes: [],
            personaje: {},
            favorites: [],
            auth: false

        },
        actions: {
            // Use getActions to call a function within a fuction
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            //             function obtenerInfoPersonajes() {
            //                 fetch("https://www.swapi.tech/api/people/")
            //                 .then(res => res.json())
            //                 .then(data => setPersonajes(data.results))
            //                 .catch(err => console.error(err))
            // }
            //fetch de la vista home, para obtener la info de todos los pj
            obtenerInfoPersonajes: () => {
                /**
                	fetch().then().then(data => setStore({ "foo": data.bar }))
                */
                fetch("https://www.swapi.tech/api/people/") //traemos info de personajes
                    .then(res => res.json())
                    // .then(data => console.log(data.results));
                    .then(data => setStore({
                        personajes: data.results
                    }))
                    .catch(err => console.error(err))
            },

            //fetch de la vista single, para obtener info de un pj
            getInfoDePj: () => {
                // https://www.swapi.tech/api/people/
                fetch("https://www.swapi.tech/api/people/")
                    .then(res => res.json())
                    .then(data => setInfoPersonaje(data.result)) //es result porque hace referencia a solo 1 personaje
                    .catch(err => console.error(err))
            },



            agregarFavoritos: (name) => {
                console.log(name);
                const store = getStore();
                setStore({
                    favorites: [...store.favorites, name]
                })
                console.log(store.favorites);
            },
            auth: false,
            //Creamos los parametros que serían los recipientes donde almacenamos los datos y luego los llamamos en el valor de las propiedades en el body
            login: (userEmail, userPassword) => {
                // //Realizamos fetch para solicitar la info. Luego necesitamos llevar al flux la respuesta que nos está dando para que se lea en toda la app y no solo en esta vista. Debido a que con el token podremos saber en cualquier vista si mi usuario esta logueado, si esta logueado lo dejo mantenerse en una vista protegida y sino, lo redirecciono. Si expira o se cierra la sesion en alguna vista lo que sucede es que nos redirije al login

                //Empieza el fetch que nos permite conectar con el BackEnd
                //Lo siguiente es llamar a la funcion a la vista del formulario, necesitamos consumirlo en la view

                // //La URL es la testeada en el Postman
                fetch('https://3000-valentinfer-flaskstarwa-8rxr6xqa8nz.ws-us85.gitpod.io/login', {
                        //Para el method necesitamos header y body    
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        //En los parentesis va el tipo de dato JSON. Luego colocamos lo que se ingreso en el input dentro de una variable (email y password)
                        body: JSON.stringify({
                            "email": userEmail,
                            "password": userPassword
                        }) // body data type must match "Content-Type" header
                    })
                    .then((response) => {

                        //Queremos saber que estatus tiene la response. Manejos de errores, debemos devolver los codigos necesarios como backenders, nos llegará 401
                        console.log(response.status);
                        if (response.status === 200) {
                            //Llamamos a setStore para actualizar el estado auth a true
                            setStore({
                                //El auth es la creacion de un estado que se mantiene en falso, cuando aún no se corrobora con el if. Si hay una respuesta positiva cuando nosotros enviemos informacion al servidor al decirle ¿el user existe en la base de datos? si existe tiene permiso para darle un token y devolverá un código 200. Entonces si devuelve un 200 significa que la persona sí está autenticada y cambia el valor del auth a true (sí esta autenticada)
                                auth: true
                            })
                        }
                        //Sacamos el else y lo trabajamos más abajo
                        // } else if (response.status === 401) {
                        //     console.log(response.text());
                        // }
                        //Y le vamos a retornas la respuesta para que cuando llegue a localStorage.setItem setee esa informacion en el navegador
                        return response.json()
                    })
                    .then((data) => {
                        // localStorage.setItem("token", data.access_token)
                        console.log(data)
                        if (data.msg === "Bad email or password") {
                            alert(data.msg)
                        }
                        localStorage.setItem("token", data.access_token)
                    })
                    //El catch con la arrow function nos avisa si algo sale mal
                    .catch((err) => console.log(err))
            },
            //Termina el fetch que nos permite conectar con el BackEnd

            logout: () => {
                // console.log("Funciona");
                localStorage.removeItem('token');
                setStore({
                    auth: false
                })
            },


            // changeColor: (index, color) => {
            //     //get the store
            //     const store = getStore();

            // //     //we have to loop the entire demo array to look for the respective index
            // //     //and change its color
            //     const demo = store.demo.map((elm, i) => {
            //         if (i === index) elm.background = color;
            //         return elm;
            //     });

            // //     //reset the global store
            //     // setStore({
            //     //     demo: demo
            //     // });
            // }
        }
    };
};

export default getState;