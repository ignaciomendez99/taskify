import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../../types'

import React, { useReducer } from 'react';
import alertaReducer from '../alertas/alertaReducer'
import alertaContext from '../alertas/alertaContext'


const AlertaState = props => {
    const initialState = {
        alerta: null
    }

    const [ state, dispatch ] = useReducer(alertaReducer, initialState);

    //Funciones
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });

        //Despues de 5 segundos, la alerta desaparece

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })

        }, 5000);
    }

    return(


        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        
        >
            {props.children}
        </alertaContext.Provider>

    )

}

export default AlertaState;