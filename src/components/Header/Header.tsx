import React from "react";
import styles from './Header.module.scss';

const Header = () => {
    return (
        <nav>
            <div className={styles["navs"]}>
                <span>Home</span>
                <span>About us</span>
                <span>Solutions Built</span>
                <span>Our products</span>
            </div>
            <div className={styles["sections"]}>
                <span>Insights</span>
                <span>Career</span>
                <span>Contact</span>
            </div>
            <span style={{'marginLeft': "96px"}}>support@iqubes.com</span>
        </nav>
    );
}

export default Header;