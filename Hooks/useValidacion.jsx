import React, { useEffect, useState } from 'react'



const useValidacion = (stateInicial, validar, fn) => {

  const [valores, setvalores] = useState(stateInicial);
  const [errores, setErrores] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if(submitForm){
      const noErrores = Object.keys(errores).length === 0;
      if(noErrores){
        fn() // FN = funcion que se ejecuta en el componente
      }
      setSubmitForm(false)
    }
  }, [errores])
  
  //funcion que se ejecuta conforme el usuari esta escribiendo algo
  const handleChange = e =>{
    setvalores({
      ...valores, 
      [e.target.name]: e.target.value
    })
  }

  //funcion que se ejecuta cuando el usuario hace sbmit
  const handleSubmit = e =>{
    e.preventDefault();
    const erroresValidacion = validar(valores)
    setErrores(erroresValidacion)
    setSubmitForm(true)
  }

  //cuando el usuario entra y sale del campo
  const handleBlur = () => {
    const erroresValidacion = validar(valores);
    setErrores(erroresValidacion);
  }

  return {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur
  }
}

export default useValidacion