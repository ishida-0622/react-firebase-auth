import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Navigate } from "react-router-dom";



interface data {
    email: string,
    password: string
}
const initData: data = {
    email: "",
    password: ""
}
const SignIn = () => {
    const [data, setData] = useState(initData);
    const login = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {
            alert("Error");
            console.log(error);
        }
    }
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setData({...data, email: val});
    }
    const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setData({...data, password: val});
    }

    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
    });

    return (
        <>
            {user ? (
                <Navigate to={"/mypage"}/>
            ) : (
                <>
                    <h1>sign in</h1>
                    <form onSubmit={(e) => login(e)}>
                        <div>
                            <label>e-mail</label>
                            <input type="email" name="email" id="email" onChange={(e) => handleChangeEmail(e)} />
                        </div>
                        <div>
                            <label>password</label>
                            <input type="password" name="pass" id="pass" onChange={(e) => handleChangePass(e)} />
                        </div>
                        <button>sign in</button>
                    </form>
                    <a href="/signup">sign up</a>
                </>
            )}
        </>
    );
}

export default SignIn;
