import React, { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    User,
    AuthErrorCodes,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Navigate } from "react-router-dom";

interface data {
    email: string;
    password: string;
}

const initData: data = {
    email: "",
    password: "",
};

const SignUp = () => {
    const [data, setData] = useState(initData);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
        ).catch((e) => {
            const errorCode = e.code;
            if (errorCode === AuthErrorCodes.EMAIL_EXISTS) {
                alert("そのメールアドレスは使用されています");
            } else if (AuthErrorCodes.INVALID_EMAIL) {
                alert("メールアドレスの形式が正しくありません");
            } else if (AuthErrorCodes.WEAK_PASSWORD) {
                alert("パスワードは6文字以上で入力してください");
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
    }, []);

    return (
        <>
            {user ? (
                <Navigate to={"/mypage"} />
            ) : (
                <>
                    <h1>sign up</h1>
                    <form onSubmit={(e) => handleSubmit(e)}>
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
                                minLength={6}
                                onChange={(e) => handleChangePass(e)}
                            />
                        </div>
                        <button>sign up</button>
                    </form>
                    <a href="/signin">sign in</a>
                </>
            )}
        </>
    );
};

export default SignUp;
