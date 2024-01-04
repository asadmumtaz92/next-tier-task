import classes from './index.module.css'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head';


const Home = () => {


    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loader, setLoader] = useState(false)

    const emailHandler = (event) => {
        setEmail(event?.target?.value)
    }
    const passwordHandler = (event) => {
        setPassword(event?.target?.value)
    }

    const loginHandler = async (event) => {
        event.preventDefault();
        setError('')

        if (disabled) {
            setError('All input field are required.')
        }
        else {
            try {
                setLoader(true)
                const bodyData = {
                    email: email,
                    password: password,
                }

                const response = await fetch(`api/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bodyData),
                });

                const res = await response.json();
                // console.log('res', res);
                if (res?.status) {
                    setLoader(false)
                    const loginStatus = true;
                    localStorage.setItem('loginStatus', JSON.stringify(loginStatus))
                    localStorage.setItem('user', JSON.stringify(res?.user))
                    router.push('/home');
                }
                else {
                    setLoader(false)
                    setError(res?.message);
                }
            }
            catch (error) {
                console.log('Error =', error)
                setLoader(false)
            }
        }
    }

    const disabled = (!email || !password) ? true : false;

    const checkLoginStatus = async () => {
        const res = await localStorage.getItem('loginStatus')
        if (res) {
            router.push('/home')
        }
    }
    useEffect(() => {
        checkLoginStatus()
    }, [])


    return (
        <>
            <Head>
                <title>Log In</title>
                <meta name='description' content='User auth systen for NextTier.' />
            </Head>
            <main className={`${classes.main}`}>
                <div className={`${classes.box}`}>
                    <h1 className={`${classes.title}`}>Sign In</h1>
                    <form method='POST' action=''>
                        {/* EMAIL */}
                        <div className={`${classes.ipBox}`}>
                            <input type="email" className={`${classes.ip}`} placeholder='Enter email' value={email} onChange={emailHandler} />
                        </div>
                        {/* PASSWORD */}
                        <div className={`${classes.ipBox}`}>
                            <input type="password" className={`${classes.ip}`} placeholder='Enter password' value={password} onChange={passwordHandler} />
                        </div>
                        {/* LOGIN BTN */}
                        <div className={``}>
                            <button onClick={!loader && loginHandler} className={`${classes.loginBtn}`}>
                                {loader ? 'Loading...' : 'LOG IN'}
                            </button>
                        </div>
                    </form>
                    {/* ERROR */}
                    {error && (
                        <p className={`${classes.error}`}>{error}</p>
                    )}
                    {/* SIGN UP LINK */}
                    <p className={`${classes.linkBotm}`}>
                        You don't have an account? <Link href='/register' className={`${classes.link}`}>Sign Up</Link>
                    </p>
                </div>
            </main>
        </>
    )
}


// API
// export const getStaticProps = async () => {
//     // fetch data from an API
//     // Connect Data Base
//     const client = await MongoClient.connect('mongodb+srv://asadmumtaz92:XQwAH5NF4ESIWyd0@cluster1.csldcdq.mongodb.net/userAuthNextTier?retryWrites=true&w=majority');
//     const db = client.db();

//     // Collection/table
//     const userCollections = db.collection('users');
//     const users = await userCollections.find().toArray();
//     client.close();

//     return {
//         props: {
//             products: users.map((item) => {
//                 return {
//                     id: item?._id.toString(),
//                     name: item?.name,
//                     email: item?.email,
//                 }
//             })
//         },
//         revalidate: 10, // get leatest data after every 10 second (use for production)
//     };
// }

export default Home
