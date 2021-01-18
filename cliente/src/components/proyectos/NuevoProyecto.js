import React, { Fragment, useContext, useState } from 'react';
import proyectoContext from '../../contexts/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    //state para el proyecto

    const [ proyecto, setProyecto ] = useState({
        nombre: '',

    });

    const { nombre } = proyecto;

    const handleChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmitProyecto = e => {
        e.preventDefault();
        
        //validar el proyecto

        if(nombre === ''){
            mostrarError();
            return;
        }

        //agregar al state
        agregarProyecto(proyecto)

        //reiniciar el form

        setProyecto({
            nombre: ''
        });
        
    }

    


    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block boton-primario"
                onClick={ () => mostrarFormulario() }

            >Nuevo Proyecto</button>


            {
                formulario ? 
                (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={handleSubmitProyecto}

                    >

                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Nombre del Proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={handleChangeProyecto}

                        />

                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar"
                        />


                    </form>
                )

                :

                null}

                {errorformulario ? <p className="mensaje error">¡El nombre del proyecto es obligatorio!</p>: null}
            
        </Fragment>
     );
}
 
export default NuevoProyecto;