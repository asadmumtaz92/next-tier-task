import React, { useEffect, useState } from 'react'
import classes from './index.module.css'
import MainNavigation from './MainNavigation'
import Footer from './footer'

const Layout = (props) => {

    const [userStatus, setUserStatus] = useState(false)

    const checkLoginStatus = async () => {
        // set user status
        // await localStorage.setItem('loginStatus', JSON.stringify(userStatus));

        // get user status
        const res = await localStorage.getItem('loginStatus')
        setUserStatus(res)
    }

    useEffect(() => {
        // get user login status from local storage
        checkLoginStatus();
    }, [])


    return (
        <>
            {!!userStatus
                ? <>
                    <MainNavigation />
                    <main className={`${classes.main} flex min-h-screen bg-white`}>{props.children}</main>
                    <Footer />
                </>
                : <main className={`${classes.main} flex min-h-screen items-center justify-center bg-white`}>{props.children}</main>
            }
        </>
    )
}

export default Layout
