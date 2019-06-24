import React, {Fragment} from 'react'
import FormMarco from './forms.js'
import { TitleContent } from '../layout/TitleContent.js';
import { WrapperContent } from '../layout/WrapperContent.js';



export const Registro = () => {
    let content = () => <FormMarco agregar="Persona"/>
    return (
        <Fragment>
            <TitleContent title="Registrar persona" subtitle="registro"/>
            <WrapperContent content={content}/>
        </Fragment>
    )
}