import {initializeApp} from 'firebase/app';
import firebaseConfig from "./config";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile} from "@firebase/auth";
import "firebase/firestore";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from '@firebase/storage';

class Firebase {
    constructor() {
        const app = initializeApp(firebaseConfig);
        this.auth = getAuth();
        this.db = getFirestore(app);
        this.storage = getStorage(this.app);
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