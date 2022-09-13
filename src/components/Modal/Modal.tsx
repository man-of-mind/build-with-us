import React from "react";
import styles from './Modal.module.scss';
import envelop from '../Images/Group.svg';
import { format } from 'react-string-format';

interface value {
    date: Date,
    name: string,
    email: string,
    subject: string,
    time: string
}

interface prop {
    value: value
}
const ModalContent:React.FC<prop> = ({ value }) => {
    const [show, setShow] = React.useState(true);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setShow(!show);
    } 
    
    return (
        <div className={styles['modal']}>
            <div className={styles['header']}>
                Confirm booking.
            </div>
            <div className={styles['booking-icon-status']}>
                <img src={envelop} alt="opened envelop" style={{width: '100%', height: '100%'}}/>
            </div>
            {show ? (<section>
                <p>Meeting summary</p>
                <div className={styles['detail']}><span className={styles['para']}>Subject: </span><span>{value.subject}</span></div>
                <hr/>
                <div className={styles['detail']} style={{paddingTop: '24px'}}><span className={styles['para']}>Date: </span><span>{format(value.date.toLocaleDateString(), "d MMMM, yyyy")}</span></div>
                <hr/>
                <div className={styles['detail']} style={{paddingTop: '24px'}}><span className={styles['para']}>Time: </span><span>{value.time}</span></div>
                <hr/>
                <div className={styles['detail']} style={{paddingTop: '24px'}}><span className={styles['para']} style={{width: '130px'}}>Medium: </span><span>Onsite meeting visit us at: 194, Herbert Macaulay Road, Yaba, Lagos.</span></div>
                
            </section>) : (<div className={styles['confirm-booking']}>
                <p className={styles['head']}>Booking confirmed</p>
                <p className={styles['body']}>Thank you for reaching out to Iqube labs, A member of our support staff will respond within 24 hours.</p>
            </div>)}
            {show ? (<button onClick={(e) => handleClick(e)}>Confirm meeting</button>) : null}
            
            {!show && (<button><a href="/build-with-us">Back home</a></button>)}
        </div>
    );
}

export default ModalContent;