import React from "react";
import style from "./TopChatSpace.module.css";
function TopChatSpace(props:any) {
    return (
        <>
            <div className={style.signOut} id="sign_out">
                <img
                    src={props.user.photoURL}
                ></img>
                <h3>You are logged in as {props.user.displayName}</h3>
                <button className="actions" onClick={props.signOut}>
                    Sign Out
                </button>
            </div>
            <div className={style.midComp}>
                <h3>ChatSpace</h3>
            </div>
        </>
    );
}

export default TopChatSpace;
