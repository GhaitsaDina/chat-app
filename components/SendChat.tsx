import firebase from "firebase";
import { useState } from "react";
import style from "./SendChat.module.css";

function SendChat(props: any) {
    const [msg, setMsg] = useState("");

    async function sendMessage(e: any) {
        e.preventDefault();
        const { uid, photoURL } = props.auth.currentUser;
        if (msg.replace(/\s/g, "") !== "") {
            await props.db.collection("messages").add({
                text: msg,
                photoURL,
                uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                displayName: props.displayName,
            }
            );
        }
        setMsg("");

        const chatComp =
            document.querySelector(".ChatSpace_chatComp__k8_LM") ||
            document.createElement("div");

        setTimeout(() => {
            chatComp.scrollTo({
                top: chatComp.scrollHeight,
                left: 0,
                behavior: "smooth",
            });
        }, 500);
    }
    return (
        <form className={style.containerInputChat} onSubmit={sendMessage}>
            <input
                className={style.inputChat}
                placeholder="Type your message here..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
            ></input>
            <button className={style.sendChat} type="submit">
                Send
            </button>
        </form>
    );
}

export default SendChat;
