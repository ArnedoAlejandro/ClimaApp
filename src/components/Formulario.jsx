import { useState } from "react"
import useClima from "../hooks/useClima"



const Formulario = () => {
  
  const [ alerta, setAlerta ] = useState("")

  const { busqueda, datosBusqueda, consutarCLima } = useClima()

  const { ciudad, pais } = busqueda
  

  const handleSubmit = e => {
    e.preventDefault()

    if(Object.values(busqueda).includes("")){
      setAlerta("Todos los campos son Obligatorios")
      return
    }
    setAlerta("")
    consutarCLima(busqueda)
  }
  
  return (
    <div className="contenedor">

        { alerta && <p>{alerta}</p>}

        <form  onSubmit={handleSubmit}>

            <div className="campo"> 
                <label>Ciudad</label>
                <input  
                    type="text" 
                    id="ciudad" 
                    name="ciudad"
                    onChange={datosBusqueda}
                    value= {ciudad}
                    />
                    
            </div> 
                
            <div className="campo"> 
                <label htmlFor="pais">Pais</label>
                <select
                    id="pais"    
                    name="pais"
                    onChange={datosBusqueda}
                    value= {pais}
                >

                <option value=""> --Seleccione un País-- </option>
                <option value="US">EEUU</option>
                <option value="MX">Mexico</option>
                <option value="AR">Argentina</option>
                <option value="CO">Colombia</option>
                <option value="CR">Costa Rica</option>
                <option value="ES">España</option>
                <option value="PE">Peru</option>
                </select>
            </div> 
            
            <input type="submit"  value="Consultar Clima"/>
            </form>
    </div>
  )
}

export default Formulario
