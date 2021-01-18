import React, { useContext, useEffect } from 'react';
import SideBar from '../layout/SideBar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';
import AuthContext from '../../contexts/proyectos/autenticacion/authContext'

const Proyectos = () => {

    // Extraer información de autenticación
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();

        //eslint-disable-next-line
    }, [])

    return ( 
        <div className="contenedor-app">
            <SideBar />

            <div className="seccion-principal">

                <Barra />


                <main>

                    <FormTarea />

                    <div className="contenedor-tareas">

                        <ListadoTareas />

                    </div>

                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;