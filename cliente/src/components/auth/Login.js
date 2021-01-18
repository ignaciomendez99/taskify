import React, { useState, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../contexts/proyectos/alertas/alertaContext';
import AuthContext from '../../contexts/proyectos/autenticacion/authContext';

const Login = (props) => {

    

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext; 

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    //En caso de que el password o el usuario no exista
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
        email: '',
        password: ''
    });

    const { email, password } = usuario;


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
        if(email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //Pasarlo al action
        iniciarSesion({ email, password });
    }
    return ( 
        <div className="form-usuario">
            {alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Login</h1>

                <form
                    onSubmit={handleSubmit}
                >
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
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"

                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">Crear cuenta</Link>
            </div>
        </div>
     );
}
 
export default Login;