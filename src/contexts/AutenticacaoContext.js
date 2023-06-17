import { createContext, useState } from 'react'

export const AutenticacaoContext = createContext({})

export function AutenticacaoProvider( {children} ) {
  const [usuario,setUsuario]=useState({})
  function login(email,senha){
    if(email=='dell@gmail.com' 
    && senha == 123){
        setUsuario({
            nome: "wendell",
            email : email,
            endereco:'Rua del',
            telefone:'(92_99318-8317'
        }) 
        return 'ok'
    }
    else{
        return 'Email ou senha incorretos';
    }
  }

  return (

    <AutenticacaoContext.Provider value={{
    usuario,
    login
    }}>
      {children}
    </AutenticacaoContext.Provider>
  )
}