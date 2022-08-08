
import { useState, createContext } from "react";
import axios from "axios"

const ClimaContext = createContext()


const ClimaProvider = ( {children} ) => {
    
    //INICIALIZACION DE LOS DATOS DE LA BUSQUEDA
    const [ busqueda, setBusqueda ] = useState({
        ciudad : "",
        pais : ""
    })

    const [ resultado, setResultado ] = useState({})

    const [ cargando, setCargando ] = useState(false)

    const [ error, setError ] = useState("")

//FUNCION QUE CAPTURA EL CAMBIO DE ESTADO DE NUESTROS PAISES Y CIUDADES
    const datosBusqueda = (e) => {
        setBusqueda({
            ...busqueda,
            [e.target.name] : [e.target.value]

        })   
    }

    //FUNCION DE CONSULTA CON LA API
    const consutarCLima = async datos =>{

        setCargando(true)
        setError(false)

        try {
            
        const { ciudad , pais } = datos

        const appiId = import.meta.env.VITE_API_KEY
        
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appiId}`
      
        
        const { data } = await axios(url)
      
        const { lat, lon } = data[0]

        const urlCLima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appiId}`

//RENOMBRAMOS LA CONST data Y LE DAMOS EL VALOR DE CLIMA
        const { data : clima } = await axios(urlCLima)
        setResultado(clima)

        } catch (error) {
            setError("No se encuentran resultados")            
        }finally{
            setCargando(false)
        }
        
    }

  
    return (

        <ClimaContext.Provider
            value={{ 
                busqueda,
                datosBusqueda,
                consutarCLima,
                resultado,
                cargando,
                error
            }}
        >
            {children}
        </ClimaContext.Provider>

  )
}

export {
    ClimaProvider
}

export default ClimaContext
