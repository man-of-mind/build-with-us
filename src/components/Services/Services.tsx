import React from "react";
import styles from "./Services.module.scss";
import iQubeLogo from '../Images/iqube.svg';

const Services = () => {
    return (
        <div className={styles['services']}>
            <figure>
                <img src={iQubeLogo} alt="iQube logo" />
            </figure>
            <span>SOFTWARE DEVELOPMENT</span>
            <span>DATA SCIENCE CONSULTANCY</span>
            <span>IVAS&#40;INTELLIGENT VALUE ADDED SERVICES&#41;</span>
        </div>
    );
}

export default Services;