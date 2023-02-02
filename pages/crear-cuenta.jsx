import Layout from "../components/layout/Layout"
import { css } from "@emotion/react"
import Router from "next/router"
import { Formulario, Campo, InputSubmit, Error} from "../components/UI/Formulario"
import useValidacion from "../Hooks/useValidacion"
import validarCrearCuenta from "../validacion/validacionCrearCuenta"

import firebase from "../firebase"
import { useState } from "react"

const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
}

function CrearCuenta() {

  const [error, setError] = useState(false)

  const {valores, errores, handleSubmit, handleChange, handleBlur} = useValidacion(STATE_INICIAL,validarCrearCuenta,crearCuenta)

  const {nombre, email, password} = valores;

  async function crearCuenta (){
    try {
      await firebase.registrar(nombre,email,password);  
      console.log("1");
      Router.push("/")  
    } catch (error) {
        console.log("ya existe un usuario asi",error.message);
        setError("Ya Existe un usuario con este correo")   
    }  
  }

  return (
    <div>
      <Layout>
        <div>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >Crear Cuenta</h1>
          <Formulario onSubmit={handleSubmit} noValidate >
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input 
                type="text"
                id="nombre"
                placeholder="Nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                // onBlur={handleBlur}

              />
            </Campo>
            {errores.nombre && <Error>{errores.nombre}</Error>}

            <Campo>
              <label htmlFor="email">Email</label>
              <input 
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Campo>
            {errores.email && <Error>{errores.email}</Error>}
            {error && <Error>{error}</Error>}

            <Campo>
              <label htmlFor="password">Password</label>
              <input 
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                // onBlur={handleBlur}

              />
            </Campo>
            {errores.password && <Error>{errores.password}</Error>}

            <InputSubmit 
              type="submit"
              value="Crear Cuenta"
            />
          </Formulario>
        </div>
      </Layout>
    </div>
  )
}
export default CrearCuenta