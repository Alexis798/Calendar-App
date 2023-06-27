export const getEnvVatiables = () => {
    
    //Asi importamos las variables de entorno que creamos .env cuando trabajamos con vite
    //Se comento porque da un problema al construir, en el return se ve como se envia ahora
    //import.meta.env;

    return {
        VITE_API_URL: import.meta.env.VITE_API_URL,
    }
}