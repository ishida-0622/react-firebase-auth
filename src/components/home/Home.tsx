import React, { useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { Navigate } from 'react-router-dom';



const Home = () => {
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
                <h1>Home</h1>
                <a href="/signin">sign in page</a><br />
                <a href="/signup">sign up page</a>
                <p>
                    送信されたメールアドレスは保存され、制作者が閲覧できる状態になります。<br />
                    悪用するつもりはありませんが、ダミーのものを使用することを推奨します。<br />
                    例 : dummy001@example.com
                </p>
                </>
            )}
        </>
    )
}

export default Home;
