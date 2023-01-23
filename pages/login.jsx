import Layout from "../components/layout/Layout"
import { css } from "@emotion/react"
import Router from "next/router"
import { Formulario, Campo, InputSubmit, Error} from "../components/UI/Formulario"
import useValidacion from "../Hooks/useValidacion"
import validarIniciarSesion from "../validacion/validarIniciarSesion"

import firebase from "../firebase"
import { useState } from "react"

const STATE_INICIAL = {
  email: "",
  password: "",
}

function Login() {

  const [error, setError] = useState(false)

  const {valores, errores, handleSubmit, handleChange, handleBlur} = useValidacion(STATE_INICIAL,validarIniciarSesion,iniciarSesion)

  const { email, password} = valores;

  async function iniciarSesion(){
    try {
      const usuario =  await firebase.login(email,password)
      Router.push("/")
    } catch (error) {
        console.log("El usuario no existe o la contraseña es incorrecta",error.message);
        setError("El usuario no existe o la contraseña es incorrecta")   
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
          >Iniciar sesión</h1>
          <Formulario onSubmit={handleSubmit} noValidate >

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
            {error && <Error>{error}</Error>}

            <InputSubmit 
              type="submit"
              value="Iniciar sesión"
            />
          </Formulario>
        </div>
      </Layout>
    </div>
  )
}
export default Login