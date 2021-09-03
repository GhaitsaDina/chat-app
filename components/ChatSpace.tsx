import style from "./ChatSpace.module.css";
import { useEffect, useState, useRef } from "react";
import SendChat from "./SendChat";

function ChatSpace(props: any) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        props.db
            .collection("messages")
            .orderBy("createdAt")
            .limit(50)
            .onSnapshot((snapshot: any) => {
                setMessages(snapshot.docs.map((doc: any) => ({id: doc.id, ...doc.data()})));
            });
    }, []);



    return (
        <>
            <div className={style.signOut} id="sign_out">
                <img
                    src={props.user.photoURL}
                    className={style.profilePict}
                ></img>
                <h3>You are logged in as {props.user.displayName}</h3>
                <button className={props.style.actions} onClick={props.signOut}>
                    Sign Out
                </button>
            </div>
            <div className={style.midComp}>
                <h3>ChatSpace</h3>
            </div>

            <div className={style.chatComp}>
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div
                        key={id}
                        className={`msg ${
                            uid === props.auth.currentUser.uid
                                ? "sent"
                                : "received"
                        }`}
                    >
                        <img
                            className={style.profilePict}
                            src={photoURL}
                        />
                        <p>{text}</p>
                    </div>
                ))}
            </div>

            <div className={style.bottomComp}>
                <SendChat db={props.db} auth={props.auth} />
            </div>
        </>
    );
}

export default ChatSpace;
