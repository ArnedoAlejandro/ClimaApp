import Resultado from "./Resultado"
import Formulario from "./Formulario"
import Spiner from "./Spiner"
import useClima from "../hooks/useClima"

const AppClima = () => {

    const { resultado, cargando, error } = useClima()

    console.log(cargando)
    return (
    <>
        <main className="dos-columnas">
            <Formulario />


            {
            error ? <p>{error}</p> : 
            cargando ? <Spiner /> :
            resultado?.name ? <Resultado /> 
            : <p>Ingresar Clima</p>
            }

        </main>
    </>
  )
}

export default AppClima