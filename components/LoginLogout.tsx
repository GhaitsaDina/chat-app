import React from "react";
import style from "./LoginLogout.module.css";
import ChatSpace from "./ChatSpace";

function LoginLogout(props: any) {
    return (
        <div className={style.welcomeContainer}>
            {props.user ? (
                <ChatSpace
                    style={style}
                    user={props.user}
                    signOut={props.signOut}
                    db={props.db}
                    auth={props.auth}
                />
            ) : (
                <div className={style.signInOut} id="sign_in">
                    <h1>Welcome to ChatSpace</h1>
                    <p>please sign in to proceed</p>
                    <button
                        className={style.actions}
                        onClick={props.signInWithGoogle}
                    >
                        Sign In With Google
                    </button>
                </div>
            )}
        </div>
    );
}

export default LoginLogout;
