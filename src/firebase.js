import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAZXcbm9OepQMKt6BmFn2KjPJuSK3Ym5K4",
  authDomain: "netflix-clone-df17b.firebaseapp.com",
  projectId: "netflix-clone-df17b",
  storageBucket: "netflix-clone-df17b.firebasestorage.app",
  messagingSenderId: "226337979596",
  appId: "1:226337979596:web:7c18a47a4b890a7a529669",
  measurementId: "G-53GZW3T8WV"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].replaceAll('-',' '));
    }
}
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].replaceAll('-',' '));
    }
}
const logout = () => {
    signOut(auth);
}
export { app, analytics, auth, db, signup, login, logout };