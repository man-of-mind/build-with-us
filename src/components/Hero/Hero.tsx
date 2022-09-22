import React from "react";
import styles from './Hero.module.scss';

const Hero = () => {
    return (
        <div className={styles["hero"]}>
            <h1>Build With Us</h1>
            <p>Are you looking to build a global standard MVP of your product? 
                You've come to the right place! Reach out to us today and let the journey begin!</p>
        </div>
    );
}

export default Hero;