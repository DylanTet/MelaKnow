import { getAuth, signInWithEmailAndPassword, User, createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseApp } from './firebase';

export const login = (email: string, password: string): Promise<User> => {
    const auth = getAuth(firebaseApp);
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => userCredential.user);
}

export const createNewAccount = (email: string, password: string): Promise<User> => {
    const auth = getAuth(firebaseApp);
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => userCredential.user)
}