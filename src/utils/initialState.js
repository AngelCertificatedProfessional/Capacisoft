// import moment from 'moment';
export default {
    alumno:{
        nombreAlumno:'',
        apellidoAlumno:'',
        edad:18,
        infoAcademico:{
            universidadId: '',
            carrerId: '',
            matricula: '',
            semestre: 1,
            cargaAcademica: 6,
            estadoAlumno: 1
        },
        contacto:{
            correo:'',
            github:'',
            linkedIn:''
        }
    },
    universidad:{
        nombre:'',
        abreviacion:''
    },
    carrera:{
        nombreCarrera:'',
        nombreCoordinador:'',
        apellidoCoordinador:'',
        cantidadSemestres:8
    },
    curso:{
        nombreCurso:'',
        proveedor:1,
        nombreInstructor:'',
        descripcion:'',
        detalleCurso:{
            urlCurso:'',
            precio:0,
            horas:0,
            herramientas:'',
            proveeCertificado:true
        },
        temaCurso:[]
    },
    temaCurso:{
        temaCurso:''
    },
    usuario:{
        usuario:'',
        contrasena:'',
        nombre:'',
        apellido:'',
        tipoUsuario:1
    },
    periodo:{
        periodo:'',
        fechaInicio:'',
        fechaFinal:'',
        alumnos:[]
    }
}