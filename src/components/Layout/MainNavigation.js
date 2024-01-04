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
        // await localStorage.setItem('activePage', JSON.stringify(tab));
        setActiveTab(tab)
    }

    // LOGOUT USER
    const logoutFun = () => {
        localStorage.removeItem('loginStatus');
        localStorage.clear();
        router.push('/')
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}>USer Auth</div>
            <nav>
                <ul>
                    <LinkItem title='Home' link='/home' val={1} />
                    <li>
                        <button onClick={logoutFun} className={`${classes.logoutBtn}`}>Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation
