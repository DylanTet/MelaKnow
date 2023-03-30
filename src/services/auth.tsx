import { Auth, getAuth, signInWithEmailAndPassword, User } from 'firebase/auth'

export const login = (email: string, password: string): Promise<User> => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => userCredential.user)
}