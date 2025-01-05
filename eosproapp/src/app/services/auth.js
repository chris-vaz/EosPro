import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import app from "@/app/config/firebaseConfig";

const auth = getAuth(app);

// Login
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.log("Error with Authentication. Login Issue-", error);
        throw error;
    }
};

// Logout
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log("Error with Authentication. Logout Issue-", error);
        throw error;
    }
};

// Create User
export const createUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.log("Error with Creating User. Creation Issue-", error);
        throw error;
    }
};
