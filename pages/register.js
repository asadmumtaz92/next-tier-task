import React, { useEffect, useState } from 'react'
import classes from './index.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'


const Register = () => {

    const router = useRouter();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [token, setToken] = useState('')

    const nameHandler = (event) => {
        setName(event?.target?.value)
    }
    const emailHandler = (event) => {
        setEmail(event?.target?.value)
    }
    const passwordHandler = (event) => {
        setPassword(event?.target?.value)
    }

    const signUpHandler = async (event) => {
        event.preventDefault();
        setError('')

        if (disabled) {
            setError('All input fields are required.')
        }
        else {
            try {
                const bodyData = {
                    name: name,
                    email: email,
                    password: password
                };
                // console.log('Body data', bodyData)

                
                const response = await fetch(`api/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bodyData),
                });

                console.log('response', response);
                const res = await response.json();
                if (res?.status) {
                    // const loginStatus = true;
                    // localStorage.setItem('loginStatus', JSON.stringify(loginStatus))
                    console.log('success respomse', res);
                    alert(res.message)
                    router.push('/');
                }
            }
            catch (error) {
                console.log('Error = ', error)
            }
        }
    }

    const disabled = (!name || !email || !password) ? true : false;

    const checkLoginStatus = async () => {
        const res = await localStorage.getItem('loginStatus')
        setToken(res)
        if (res) {
            router.push('/home')
        }
    }
    useEffect(() => {
        checkLoginStatus()
    }, [])


    return (
        <main className={`${classes.main}`}>
            <div className={`${classes.box}`}>
                <h1 className={`${classes.title}`}>Create account</h1>
                <form method='POST' action=''>
                    {/* FULL NAME */}
                    <div className={`${classes.ipBox}`}>
                        <input type="text" className={`${classes.ip}`} placeholder='Enter full name' value={name} onChange={nameHandler} />
                    </div>
                    {/* EMAIL */}
                    <div className={`${classes.ipBox}`}>
                        <input type="email" className={`${classes.ip}`} placeholder='Enter email' value={email} onChange={emailHandler} />
                    </div>
                    {/* PASSWORD */}
                    <div className={`${classes.ipBox}`}>
                        <input type="password" className={`${classes.ip}`} placeholder='Enter password' value={password} onChange={passwordHandler} />
                    </div>
                    {/* SIGN UP BTN */}
                    <div className={``}>
                        <button onClick={signUpHandler} className={`${classes.loginBtn}`}>SIGN UP</button>
                    </div>
                </form>
                {/* ERROR */}
                {error && (
                    <p className={`${classes.error}`}>{error}</p>
                )}
                {/* LOGIN LINK */}
                <p className={`${classes.linkBotm}`}>Already have an account? <Link href='/' className={`${classes.link}`}>Log In</Link></p>
            </div>
        </main>
    )
}

export default Register
