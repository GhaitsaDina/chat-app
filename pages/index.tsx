import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCrWBpgJp1l5Kg3UmLrcIPMmvmwQ2qKKc4",
    authDomain: "chat-app-5b9aa.firebaseapp.com",
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
    return (
        <div className="container">
            <div>
                <h1>Chat App</h1>
            </div>
            <div>
                <button>Login with Google Account</button>
            </div>
        </div>
    );
}

export default Home;
