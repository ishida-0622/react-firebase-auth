import React, { useState, useEffect } from "react";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    User,
    AuthErrorCodes,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Navigate, useNavigate } from "react-router-dom";

interface data {
    email: string;
    password: string;
}

const initData: data = {
    email: "",
    password: "",
};

const SignIn = () => {
    const [data, setData] = useState(initData);
    const navigate = useNavigate();
    const login = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                navigate("/mypage");
            })
            .catch((e) => {
                const errorCode = e.code;
                if (
                    errorCode === AuthErrorCodes.USER_DELETED ||
                    errorCode === AuthErrorCodes.INVALID_PASSWORD
                ) {
                    alert("メールアドレスもしくはパスワードが間違っています");
                } else {
                    alert(`Error\n${errorCode}`);
                }
            });
    };
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setData({ ...data, email: val });
    };
    const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setData({ ...data, password: val });
    };

    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
    });

    return (
        <>
            {user ? (
                <Navigate to={"/mypage"} />
            ) : (
                <>
                    <h1>sign in</h1>
                    <form onSubmit={(e) => login(e)}>
                        <div>
                            <label>e-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={(e) => handleChangeEmail(e)}
                            />
                        </div>
                        <div>
                            <label>password</label>
                            <input
                                type="password"
                                name="pass"
                                id="pass"
                                onChange={(e) => handleChangePass(e)}
                            />
                        </div>
                        <button>sign in</button>
                    </form>
                    <a href="/signup">sign up</a>
                </>
            )}
        </>
    );
};

export default SignIn;
