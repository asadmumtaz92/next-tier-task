import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import classes from './home.module.css'

const Home = (props) => {

    const router = useRouter();
    const [data, setData] = useState('')
    const [token, setToken] = useState(false)


    const checkLoginStatus = async () => {
        const res = await localStorage.getItem('loginStatus')
        setToken(res)
        if (!res) {
            router.push('/')
        }
    }
    useEffect(() => {
        checkLoginStatus()
    },[])


    return (
        <main className={`${classes.main}`}>
            <h1 className={`${classes.title}`}>Welcome on Home Page</h1>
            <div className={`${classes.myItem}`}>
                <p className={`${classes.itemData}`}>{`Name:`}</p>
                <p className={`${classes.itemData}`}>{data?.name}</p>
            </div>
            <div className={`${classes.myItem}`}>
                <p className={`${classes.itemData}`}>{`Email:`}</p>
                <p className={`${classes.itemData}`}>{data?.email}</p>
            </div>
        </main>
    )
}

export default Home
