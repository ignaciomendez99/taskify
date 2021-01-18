import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../contexts/proyectos/proyectoContext'
import tareaContext from '../../contexts/proyectos/tareas/tareaContext';


const FormTareas = () => {
    

    //extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //obtener la funcion del context de tareas

    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    //effect que detecta si hay una tarea seleccionada

    useEffect(() => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        }
        else{
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada])

    //state del formulario

    const [ tarea, guardarTarea ] = useState({
        nombre: ''

    })

    //extraer el nombre de la tarea

    const { nombre } = tarea;

    //si no hay proyectos seleccionados

    if(!proyecto) return null;

    //array destructuring para extraer el proyecto actual

    const [ proyectoActual ] = proyecto;

    //leer los valores del formulario

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [ e.target.name ] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        // validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        //revisar si es edicion o si es nueva tarea

        if(tareaseleccionada === null){
            //tarea nueva
            //agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        }
        else {
            //actualizar tarea existente
            actualizarTarea(tarea);

            //elimina la tarea seleccionada del state

            limpiarTarea()
        }

        //pasar la validacion
        guardarTarea({
            nombre: ''
        })

        

        //obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id)

        //reiniciar el form
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        name="nombre"
                        placeholder="Nombre de la tarea.."
                        value={nombre}
                        onChange={handleChange}

                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea' }
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">¡El nombre de la tarea es obligatorio!</p> : null}
        </div>
     );
}
 
export default FormTareas;