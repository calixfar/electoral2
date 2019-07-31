import gql from 'graphql-tag'

export const CREAR_ZONA = gql `
    mutation crearZona($input: inputZona){
        crearZona(input: $input){
            id
            nombre
            barrios {
                id
            }
        }
    }
`;

export const ELIMINAR_ZONA = gql `
    mutation eliminarZona($id : ID){
  	eliminarZona(id: $id)
}
`;
export const ACTUALIZAR_ZONA = gql `
    mutation actualizarZona ($input: inputZona){
        actualizarZona(input: $input){
            id
            nombre
            barrios {
            id
            barrio
            }
        }
    }
`;

export const CREAR_BARRIO = gql ` 
    mutation crearBarrio($input: inputBarrio){
        crearBarrio(input: $input){
            id
            nombre
            cantidadVotantes
            estado
        }
}

`;
export const ELIMINAR_BARRIO = gql ` 
    mutation eliminarBarrio($input: inputEliminarBarrio){
        eliminarBarrio(input: $input)
    }
`;  

export const CREAR_PERSONA = gql `
    mutation crearPersona($input: inputPersona){
	crearPersona(input: $input){
    nombre
    apellido
    celular
    barrio
    tipo
  }  
}
`;
export const ACTUALIZAR_PERSONA = gql `
    mutation actualizarPersona($input: inputPersona){
        actualizarPersona(input: $input){
            id
            nombre
        }
}
`;
export const ENVIAR_SMS = gql `
    mutation enviarSms($input: inputSMS){
        enviarSMS(input: $input)
    }
`;
export const CREAR_PERSONA_MASIVO = gql `
    mutation registroMasivo($input: inputMasivePerson){
        registroMasivoPersonas(input: $input){
            nombre
            cedula
    }
}
`

export const CREAR_USUARIO = gql `
    mutation crearUsuario($usuario: String!, $password: String!, $nombre: String!, $rol: String!){
        crearUsuario(usuario: $usuario, password: $password, nombre: $nombre, rol: $rol)
    }
`;

export const AUTENTICAR_USUARIO = gql`
    mutation aunth($usuario: String!, $password: String!){
		autenticarUsuario(usuario: $usuario, password: $password){
            token
        }
    }

`

