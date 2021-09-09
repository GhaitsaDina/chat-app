import style from "./ChatSpace.module.css";
import { useEffect, useState, useRef } from "react";
import SendChat from "./SendChat";
import TopChatSpace from "./TopChatSpace";

function ChatSpace(props: any) {
    const [messages, setMessages] = useState([]);
    // messages = [object1, object2]
    const [dateStringList, setdateStringList] = useState<string[]>([]);
    //dateStringList = [date1, date2]
    const [messageDataList, setmessageDataList] = useState<any[]>([]);
    // messageDataList = [{date:xx, messages:[object1, object2]}]

    /** To fetch the message object */
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

    /**
     * List berisi tanggal yang unik untuk dipakai di div nanti
     * @param arr
     * @returns
     */
    function getUniqueArray(arr: any) {
        var a = [];
        for (var i = 0; i < arr.length; i++)
            if (a.indexOf(arr[i]) === -1 && arr[i] !== "") a.push(arr[i]);
        return a;
    }

    /**
     * To update dateStringList so that it has unique and new element
     */
    const updatedateStringList = () => {
        let listOfDates: any = []; //complete list of all dates
        messages.forEach((msg) => {
            let { createdAt } = msg; // destructure createdAt from object msg
            if (createdAt) {
                const date = new Date(createdAt["seconds"] * 1000);
                const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                listOfDates.push(dateString);
            }
        });
        setdateStringList(getUniqueArray(listOfDates));
    };

    /**To update dateStringList when a new message came in*/
    useEffect(() => {
        updatedateStringList();
    }, [messages]);


    /** To put messages with the same date in one group when dateStringList updated */
    useEffect(() => {
        // tempArray = [{date: xx, messages: [obj1, ob2]}]
        let tempArray: any = [];
        
        // pengecekan untuk kondisi loading
        if (dateStringList.length > 0) {
            // dateStringList berisi tanggal unik
            dateStringList.forEach((dateString) => {
                // tempObject is soon to be added to messageDataList
                let tempObject = { date: dateString, messages: [] };

                messages.forEach((msg) => {
                    let { createdAt } = msg; //destructure to get createdAt
                    if (createdAt) {
                        const date = new Date(createdAt["seconds"] * 1000);
                        const messageDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                        
                        if (messageDate === dateString) {
                            tempObject.messages.push(msg)
                            // tempObject = {
                                //     ...tempObject,
                                //     messages: [...tempObject.messages, msg],
                                // };
                            }
                        }
                    });
                    tempArray = [...tempArray, tempObject];
            });
        }
        if (tempArray.length > 0) {
            setmessageDataList(tempArray);
        }
    }, [dateStringList]);

    return (
        <>
            <TopChatSpace user={props.user} signOut={props.signOut} />

            <div className={style.chatComp}>
                {messageDataList.length > 0 &&
                    // map through each date
                    messageDataList.map((msgData: any) => {
                        let { date, messages } = msgData; // msgData = {date: '...', messages: [...]}
                        return (
                            <div key={date}>
                                <div className={style.dateContainer}>
                                    <h5 className={style.singleDate}>{date}</h5>
                                </div>
                                {/* map through each string of messages */}
                                {messages.map((msg: any) => {
                                    let {
                                        id,
                                        text,
                                        photoURL,
                                        uid,
                                        displayName,
                                        createdAt,
                                    } = msg;
                                    
                                    let date,
                                        hours,
                                        minutes,
                                        hoursString,
                                        minutesString,
                                        dateString;
                                        
                                    if (createdAt) {
                                        date = new Date(
                                            createdAt["seconds"] * 1000
                                        );

                                        hours = date.getHours();
                                        minutes = date.getMinutes();

                                        dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
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
                                            <div
                                                className={`msg ${
                                                    uid ===
                                                    props.auth.currentUser.uid
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
                                                    <h6>{hoursString}:{minutesString}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
            </div>

            <div className={style.bottomComp}>
                <SendChat
                    db={props.db}
                    auth={props.auth}
                    displayName={props.user.displayName}
                    scroll={scroll}
                />
            </div>
        </>
    );
}

export default ChatSpace;
