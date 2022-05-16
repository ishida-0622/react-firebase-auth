import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User, signOut, deleteUser } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";



const MyPage = () => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
    }, []);

    const navigate = useNavigate();
    const logout = async () => {
        await signOut(auth).then(() => {
            navigate("/");
        });
    }

    const userDelete = async () => {
        if (!window.confirm("削除しますか？")) {
            return;
        }
        if (!user) {
            alert("Error");
            throw new Error("user is undefined");
        }
        await deleteUser(user);
        navigate("/");
    }

    return (
        <>
            <h1>my page</h1>
            <p>{user?.email}</p>
            <button onClick={logout}>sign out</button>
            <button onClick={userDelete}>delete user</button>
        </>
    );
};

export default MyPage;
