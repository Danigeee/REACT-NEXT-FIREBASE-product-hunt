// import app from "firebase/app";
import app from "firebase/compat/app";
import firebaseConfig from "./config";
import { createUserWithEmailAndPassword ,getAuth, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";


class Firebase {
    constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = getAuth();
    }

    //registrar usuario
    async registrar(nombre,email,password){
        const nuevoUsuario = await createUserWithEmailAndPassword(this.auth,email,password)
        
        //Actualizar el usuario creado, añadiendo el nombre del usuario
        return await updateProfile(nuevoUsuario.user,{
            displayName: nombre
        })
    }
    
    //iniciar sesion del usuario
    async login(email,password){
        return signInWithEmailAndPassword(this.auth,email,password)
    }

    //cierra la sesion del usuario
    async cerrarSesion(){
        await signOut(this.auth)
    }
}

const firebase = new Firebase();
export default firebase;