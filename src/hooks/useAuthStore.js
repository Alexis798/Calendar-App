//? este es otro metodo de thunks, crear hooks

import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch()

    const startLogin = async({ email, password }) => {
        dispatch( onChecking() );

        try {
            
            //asi llegamos a la url usando axios importamos el calendarApi.(protocolo de peticion en este caso post)(url adicional { y los datos que enviaremos})
            const { data } = await calendarApi.post('/auth', { email, password })

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch( onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {
            dispatch( onLogout('Crendeciales Incorrectas'))
            setTimeout(() => {
                dispatch( clearErrorMessage())
            }, 10)
        }
    }

    const startRegister = async({ email, password, name }) => {

        dispatch( onChecking() );

        try {
            
            //asi llegamos a la url usando axios importamos el calendarApi.(protocolo de peticion en este caso post)(url adicional { y los datos que enviaremos})
            const { data } = await calendarApi.post('/auth/new', { email, password, name })

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch( onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {
            console.log(error)
            dispatch( onLogout( error.response.data?.msg || '---'))
            setTimeout(() => {
                dispatch( clearErrorMessage())
            }, 10)
        }
    }

    const checkAuthToken = async () => {
        
        const token = localStorage.getItem('token')
        if (!token) return dispatch( onLogout() )

        try {
            
            const { data } = await calendarApi.get('auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch( onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }


    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogoutCalendar() );
        dispatch( onLogout() );
    }

    return {
        //* Propiedades
        errorMessage,
        status,
        user,

        //*Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}