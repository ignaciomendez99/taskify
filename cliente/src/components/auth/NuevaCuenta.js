import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../contexts/proyectos/alertas/alertaContext';
import AuthContext from '../../contexts/proyectos/autenticacion/authContext';

const NuevaCuenta = (props) => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext; 

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    //En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        //eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    //state para iniciar sesion

    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    const { nombre, email, password, confirmar } = usuario;


    //cuando el usuario rellena los datos del formulario
    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })

    }
    
    
    //cuando el usuario presiona iniciar sesión
    const handleSubmit = e => {
        e.preventDefault();

        //validar que no haya campos vacios
        if( nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '' ){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //password minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('La contraseña debe contener al menos 6 caracteres', 'alerta-error');
            return;
        }

        //los dos password son iguales

        if(password !== confirmar){
            mostrarAlerta('Ambas contraseñas deben coincidir', 'alerta-error');
            return;
        }

        //Pasarlo al action
        registrarUsuario( { nombre, email, password } );

    }
    return ( 
        <div className="form-usuario">
            {alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) 
            : null}

            <div className="contenedor-form sombra-dark">
                <h1>Crear una cuenta</h1>

                <form
                    onSubmit={handleSubmit}
                >

                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Ingresa tu nombre"
                            onChange={handleChange}
                            value={nombre}
                            

                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Correo electrónico</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingresa tu correo electrónico"
                            onChange={handleChange}
                            value={email}
                            

                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingresa tu contraseña"
                            onChange={handleChange}
                            value={password}
                            

                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Contraseña</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Confirma tu contraseña"
                            onChange={handleChange}
                            value={confirmar}
                            

                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarse"

                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">Login</Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;