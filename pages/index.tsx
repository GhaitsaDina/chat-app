import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useState, useEffect } from "react";
import LoginLogout from "../components/LoginLogout";

const firebaseConfig = {
    apiKey: "AIzaSyCrWBpgJp1l5Kg3UmLrcIPMmvmwQ2qKKc4",
    authDomain: "chat-app-5b9aa.firebaseapp.com",
    databaseURL:
        "https://chat-app-5b9aa-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-app-5b9aa",
    storageBucket: "chat-app-5b9aa.appspot.com",
    messagingSenderId: "924077193530",
    appId: "1:924077193530:web:c481b1f04ad068adf87803",
    measurementId: "G-DB2QLWQ8FN",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const auth = firebase.app().auth();
const db = firebase.firestore();

function Home() {
    const [user, setUser] = useState(() => auth.currentUser);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.useDeviceLanguage();

        try {
            await auth.signInWithPopup(provider);
        } catch (error) {
            console.log(error);
        }
    };

    const signOut = async () => {
        try {
            await firebase.auth().signOut();
        } catch (error:any) {
            console.log(error.message);
        }
    };

    return (
        <div className="container">
            <LoginLogout
                user={user}
                signInWithGoogle={signInWithGoogle}
                signOut={signOut}
                db={db}
                auth={auth}
            />
        </div>
    );
}

export default Home;
