import { useState } from 'react';
import Link from 'next/link'
import classes from './MainNavigation.module.css'

import { useRouter } from 'next/navigation'
function MainNavigation() {

    const [activeTab, setActiveTab] = useState(1)
    const router = useRouter()


    const LinkItem = ({ title, link, val }) => {
        return (
            <li onClick={() => activeTabHandler(val)}>
                <Link href={link} className={`${activeTab === val && classes.active}`}>{title}</Link>
            </li>
        )
    }

    // SE ACTIVE TAB
    const activeTabHandler = async (tab) => {
        setActiveTab(tab)
    }

    // LOGOUT USER
    const logoutFun = () => {
        localStorage.removeItem('loginStatus');
        localStorage.removeItem('user');
        localStorage.clear();
        router.push('/')
        // router.reload()
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}>NextTier Auth</div>
            <nav>
                <ul>
                    <LinkItem title='Home' link='/home' val={1} />
                    <li>
                        <Link onClick={logoutFun} href="/" className={`${classes.logoutBtn}`}>Logout</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation
