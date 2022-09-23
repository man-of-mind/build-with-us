import React from "react";
import styles from "./Services.module.scss";
import iQubeLogo from '../Images/iqube.svg';
import ellipse from '../Images/ellipse.svg';

const Services = () => {
    return (
        <div className={styles['services']}>
            <figure>
                <img src={iQubeLogo} alt="iQube logo" />
            </figure>
            <div className={styles['categories']}>
                <span><img src={ellipse} alt="dot sign"/>SOFTWARE DEVELOPMENT</span>
                <img src={ellipse} alt="dot sign"/>
                <span><img src={ellipse} alt="dot sign"/>DATA SCIENCE CONSULTANCY</span>
                <img src={ellipse} alt="dot sign"/>
                <span><img src={ellipse} alt="dot sign"/>IVAS &#40;INTELLIGENT VALUE ADDED SERVICES&#41;</span>
            </div>
            
        </div>
    );
}

export default Services;