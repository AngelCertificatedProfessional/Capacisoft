export const agregar = async(sRuta,data) => {
    try {
        let config = {
            method: 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        
        let res = await fetch('http://localhost:3000/api/'+sRuta, config);
        let json =  await res.json();

        if(json.data.hasOwnProperty('_id') ){
            return;        
        }else{
            throw('Hubo un error al ingresar la informacion')
        }

    }catch(error) {
        return error;
    }
}

export const listado = async (sRuta) =>{
    try {
        let res = await fetch('http://localhost:3000/api/'+sRuta);
        let data = await res.json();
        return data.data;
    }catch(error) {
        return error;
    }
}

export const consultaById = async (sRuta,nIdRegistro) => {
    try {
        let res = await fetch( 'http://localhost:3000/api/'+sRuta+nIdRegistro );
        let data = await res.json();
        return data.data;
    }catch(error) {
        return error;
    }
}

export const actualizar = async(sRuta,data) => {
    try {
        let config = {
            method: 'PUT',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        
        let res = await fetch('http://localhost:3000/api/'+sRuta, config);
        let json =  await res.json();

        if(json.data.hasOwnProperty('_id') ){
            return;        
        }else{
            throw('Hubo un error al ingresar la informacion')
        }

    }catch(error) {
        return error;
    }
}