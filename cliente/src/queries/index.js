import gql from 'graphql-tag';

export const OBTENER_ZONAS = gql`
    query {
        obtenerZonas {
            id
            barrios {
                id
            }
            nombre
        }
    }
`;

export const OBTENER_ZONA = gql`
    query obtenerZona($id: ID) {
        obtenerZona(id: $id){
            id
            nombre
            barrios{
            id
            }
        }
    }
`;
export const OBTENER_ID_BARRIO = gql `
    query nameBarrio($nombre: String){
        searchIdBarrio(nombre: $nombre){
            id
            nombre
        }
    }
`;

export const OBTENER_BARRIOS = gql `
    query obtenerBarrios($input: inputBarrio){
        obtenerBarrios(input: $input){
            id
            nombre
            zona
            cantidadVotantes
            estado
            metaVotos
        }
    }
`;

export const TOTAL_BARRIOS_ZONA = gql `
    query totalBarrios($input: inputBarrio){
        totalBarrios(input: $input)
    }
`;

export const OBTENER_BARRIO = gql `
    query obtenerBarrio($id: ID){
        obtenerBarrio(id: $id){
            id
            nombre
            zona
            estado
        }
    }
`;
export const OBTENER_PERSONAS_CUMPLE = gql `
 query obtenerPersonas {
  obtenerPersonasCumple {
    id
    nombre
    apellido
    edad
    celular
  }
}
`;
export const OBTENER_PERSONAS_SUPERIOR = gql `
    query obtenerPersonasSuperior($input: inputQuerySuperior){
        obtenerPersonasSuperior(input: $input){
            id
            nombre
            apellido
            superior{
            id
            nombre
            }
            metaVotos
            lideres{id}
            macros{id}
            multip{ id}
            votantes{ id}
            tipo
            totalPersonas
            totalFidelizados
            totalGeneral{
                totalPersonas
                totalFidelizados
                totalGeneralLideres{
                    totalPersonas
                    totalFidelizados                   
                }
                totalGeneralMacros{
                    totalPersonas
                    totalFidelizados
                }
                totalGeneralVotantes{
                    totalPersonas
                    totalFidelizados
                }
                totalGeneralMultip{
                    totalPersonas
                    totalFidelizados
                }
            }
        }
    }
 `;

export const OBTENER_PERSONAS_CAMPAÑA = gql `
    query obtenerPersonas($input: inputPersona){
        obtenerPersonas(input: $input){
            id
            nombre
            tipo
            apellido
        }
        totalPersonas(input: $input)
    }
`
export const OBTENER_PERSONAS = gql `
    query obtenerPersonas($input: inputPersona, $limite: Int, $offset: Int, $filtro: Boolean, $all : Boolean){
        obtenerPersonas(input: $input, limite:$limite, offset: $offset, filtro: $filtro){
            id
            cedula
            nombre
            edad
            apellido
            fechaCumple
            estadoCivil
            genero
            dinero
            ocupacion
            perfil
            celular
            direccion
            correo
            tipo
            zona
            barrio
            lugarVotacion
            mesaVotacion
            metaVotos
            estadoContacto
            fidelizado
            superior{
                id
                nombre
                tipo
            }
            macros{
                id
            }
            lideres{
                id
            }
            multip{
                id
            }
            votantes{
                id
            }
            totalGeneral{
                totalPersonas
                totalFidelizados
                totalGeneralLideres{
                    totalPersonas
                    totalFidelizados                   
                }
                totalGeneralMacros{
                    totalPersonas
                    totalFidelizados
                }
                totalGeneralVotantes{
                    totalPersonas
                    totalFidelizados
                }
                totalGeneralMultip{
                    totalPersonas
                    totalFidelizados
                }
            }
            tipoVoto
        }
        totalPersonas(input: $input, all: $all)
    }
`;
export const VALIDAR_CEDULA = gql `
    query obtenerPersona($cedula: String){
        validarCedula(cedula: $cedula){
            id
            cedula
            nombre
            apellido
        }
    }
`
export const OBTENER_PERSONA = gql `
    query obtenerPersona($id: ID){
        obtenerPersona(id: $id){
            id
            cedula
            nombre
            apellido
            fechaCumple
            estadoCivil
            ocupacion
            perfil
            celular
            direccion
            correo
            tipo
            zona
            genero
            dinero
            barrio
            lugarVotacion
            mesaVotacion
            metaVotos
            estadoContacto
            fidelizado
            tipoVoto
            macros{
                id
            }
            lideres{
                id
            }
            multip{
                id
            }
            votantes{
                id
            }
            totalGeneral{
                totalPersonas
                totalFidelizados
                totalGeneralLideres{
                    totalPersonas
                    totalFidelizados                   
                }
                totalGeneralMacros{
                    totalPersonas
                    totalFidelizados
                }
                totalGeneralVotantes{
                    totalPersonas
                    totalFidelizados
                }
                totalGeneralMultip{
                    totalPersonas
                    totalFidelizados
                }
            }
        }
    }
`;

export const USUARIO_ACTUAL = gql `
    query obtenerUsuario {
        obtenerUsuario {
            id
            usuario
            nombre
            rol
        }
    }
`;

export const PERSONAS_BARRIO = gql `
    query obtenerPersonasBarrio($barrio: ID) {
        obtenerPersonasBarrio(barrio: $barrio){
            totalPersonasBarrio
            totalPersonasFideBarrio
        }
    }
`

export const TOP_BARRIOS = gql `
    query($zona: ID) {
        topBarrios(zona: $zona){
            nombre,
            id,
            votosFide
            
    }
}
`