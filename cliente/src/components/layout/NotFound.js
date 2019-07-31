import React from 'react'

const NotFound = () => (
    <div class="middle-box text-center animated fadeInDown">
        <h1>404</h1>
        <h3 class="font-bold">Página no encontrada</h3>

        <div class="error-desc">
            La página a la que intenta acceder no ha sido encontrada.
            <form class="form-inline m-t d-flex justify-align-center" role="form">
                
                <button type="submit" class="btn btn-primary">Ir a la página de Login</button>
            </form>
        </div>
    </div>
)

export default NotFound;