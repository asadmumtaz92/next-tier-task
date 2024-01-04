import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import classes from './home.module.css'
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import Link from 'next/link';

const Home = (props) => {

    const router = useRouter();
    const [data, setData] = useState(null)


    const checkLoginStatus = async () => {
        const res = await localStorage.getItem('loginStatus')
        if (!res) {
            router.push('/')
        }
    }
    const getUserData = async () => {
        const res = await localStorage.getItem('user')
        if (res) {
            setData(JSON.parse(res))
        }
    }
    useEffect(() => {
        checkLoginStatus();
        getUserData();
    }, [])
    // LOGOUT USER
    const logoutFun = () => {
        localStorage.removeItem('loginStatus');
        localStorage.removeItem('user');
        localStorage.clear();
        router.push('/')
        // router.reload()
    }


    return (
        <>
            <Head>
                <title>Home {data?.name}</title>
                <meta name='description' content='User auth systen for NextTier.' />
            </Head>
            <main className={`${classes.main}`}>
                <h1 className={`${classes.title}`}>Welcome back {data?.name}.</h1>
                <div className={`${classes.myItem}`}>
                    <p className={`${classes.itemData}`}>{`Name:  `}</p>
                    <p className={`${classes.itemData2}`}>{data?.name}</p>
                </div>
                <div className={`${classes.myItem}`}>
                    <p className={`${classes.itemData}`}>{`Email:`}</p>
                    <p className={`${classes.itemData2}`}>{data?.email}</p>
                </div>
                <div className='mt-5'>
                    <Link onClick={logoutFun} href='/' className={`${classes.logoutBtn}`}>LOGOUT</Link>
                </div>
            </main>
        </>
    )
}

export const getStaticProps = async () => {

    // Connect Data Base
    const client = await MongoClient.connect('mongodb+srv://asadmumtaz92:XQwAH5NF4ESIWyd0@cluster0.heyeael.mongodb.net/userAuthNextTier?retryWrites=true&w=majority');
    const db = client.db();

    // // Create Collection/table
    const userCollections = db.collection('users');
    // const userFind = await userCollections.findOne({ email: data?.email });
    client.close();

    return {
        props: {
            // userdata: { name: userFind?.name, email: userFind?.email},
        },
        revalidate: 10,
    }
}

export default Home
