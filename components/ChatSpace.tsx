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
                setMessages(
                    snapshot.docs.map((doc: any) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
            });
    }, []);
    let listDateString: string[] = [];
    let currentDate: any;
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
                {messages.map(
                    ({ id, text, photoURL, uid, displayName, createdAt }) => {
                        let date,
                            hours,
                            minutes,
                            hoursString,
                            minutesString,
                            dateString: string,
                            tanggal,
                            bulan,
                            tahun;

                        if (createdAt) {
                            date = new Date(createdAt["seconds"] * 1000);
                            hours = date.getHours();
                            minutes = date.getMinutes();

                            tanggal = date.getDate().toString();
                            bulan = (date.getUTCMonth() + 1).toString();
                            tahun = date.getFullYear().toString();

                            dateString = tanggal + "/" + bulan + "/" + tahun;
                            currentDate = "";
                            if (!listDateString.includes(dateString)) {
                                listDateString.push(dateString);
                                currentDate = <h5 className={style.singleDate}>{dateString}</h5>;
                            }
                            // console.log(listDateString);

                            hoursString =
                                hours < 10
                                    ? "0" + hours.toString()
                                    : hours.toString();
                            minutesString =
                                minutes < 10
                                    ? "0" + minutes.toString()
                                    : minutes.toString();
                        }

                        return (
                            <div key={id}>
                                <div className={style.dateContainer}>
                                    <div className={style.date}>{currentDate}</div>
                                </div>
                                <div
                                    className={`msg ${
                                        uid === props.auth.currentUser.uid
                                            ? "sent"
                                            : "received"
                                    }`}
                                >
                                    <div>
                                        <img
                                            className={style.profilePict}
                                            src={photoURL}
                                        />
                                    </div>
                                    <div className={style.chatContent}>
                                        <p className={style.displayName}>
                                            {displayName}
                                        </p>
                                        <h5>{text}</h5>
                                        {createdAt && (
                                            <h6>
                                                {hoursString}:{minutesString}
                                            </h6>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                )}
            </div>
            <div className={style.bottomComp}>
                <SendChat
                    db={props.db}
                    auth={props.auth}
                    displayName={props.user.displayName}
                />
            </div>
        </>
    );
}

export default ChatSpace;
