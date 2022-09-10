import React from "react";
import styles from './Hero.module.scss';

const Hero = () => {
    return (
        <div className={styles["hero"]}>
            <h1>Build With Us</h1>
            <p>Drop your information and we would get back to you</p>
        </div>
    );
}

export default Hero;