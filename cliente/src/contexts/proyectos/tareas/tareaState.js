import React, { useReducer } from 'react';
import TareaContext from '../tareas/tareaContext';
import TareaReducer from '../tareas/tareaReducer';
import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA, LIMPIAR_TAREA } from '../../../types/index';
import clienteAxios from '../../../config/axios';

const TareaState = props => {
    const initialState = {
        
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    //crear state y dispatch

    const [ state, dispatch ] = useReducer(TareaReducer, initialState);

    //CREAR LAS FUNCIONES

    //OBTENER LAS TAREAS DE UN PROYECTO

    const obtenerTareas = async proyecto => {
        console.log(proyecto);
        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } });
            console.log(resultado);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
            
        } catch (error) {
            console.log(error);
        }
    }


    //AGREGAR UNA TAREA AL PORYECTO SELECCIONADO

    const agregarTarea = async tarea => {
        console.log(tarea);
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    //valida y muestra un error en caso de que sea necesario

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //eliminar tarea por id
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } })
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    // cambia el estado de cada tarea

    const actualizarTarea = async tarea => {

        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            console.log(resultado);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        }
            
        catch (error) {
            console.log(error);
        }
    }
    
        
    //extrae una tarea para edición

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    

    //elimina la tarea seleccionada

    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea

            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;
