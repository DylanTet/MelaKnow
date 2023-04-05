import { Auth, getAuth, signInWithEmailAndPassword, User } from 'firebase/auth'
import firebaseApp from './firebase';

export const login = (email: string, password: string): Promise<User> => {
    const auth = getAuth(firebaseApp);
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => userCredential.user)
}