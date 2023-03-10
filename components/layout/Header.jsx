import Link from 'next/link'
import React, { useContext } from 'react'
import Buscar from '../UI/Buscar'
import { css,} from '@emotion/react'
import styled from '@emotion/styled'
import Navegacion from './Navegacion'
import Boton from '../UI/Boton'
import { FirebaseContext } from '../../firebase'


const ContenedorHeader = styled.div`
  max-width:1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;
const Logo = styled.p`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab",serif;
  margin-right: 2rem;
`;

const Header = () => {

  const {usuario, firebase} = useContext(FirebaseContext)

  return (
    <header 
      css={css`
        border-bottom: 2px solid var(--gris3);
        padding: 1rem 0;
      `}
    >

      <ContenedorHeader >
        <div 
          css={css`
            display:flex;
            align-items: center;
          `}
        >
          <Link href="/">
            <Logo>DAG</Logo>
          </Link>
          
            <Buscar/>

            <Navegacion/>
        </div>
        <div
          css={css`
            display:flex;
            align-items:center;
          `}
        >
          {usuario ? (
            <div>
              <p
              css={css`
                margin-right: 2rem;
              `}
              >Hola: {usuario.displayName}</p>

              <Boton 
                bgColor='true'
                onClick={() => firebase.cerrarSesion()}
              >Cerrar sesión</Boton>
            </div>
          ):(
            <div>
              <Link href="/login">
                <Boton bgColor="true">Login</Boton>
              </Link>
              <Link href="/crear-cuenta">
                <Boton>Crear cuenta</Boton>
              </Link>
            </div>
          )}
          

        </div>
      </ContenedorHeader>
    </header>
  )
}

export default Header