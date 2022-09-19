import React from "react";
import styles from './Modal.module.scss';
import openedMessage from '../Images/opened-env.svg';
import iQubeLogo from '../Images/iqube.svg';
import { format } from 'react-string-format';

interface value {
    name: string,
    email: string,
    subject: string,
    description: string
}
interface schedule {
    time: string,
    date: Date
}
interface prop {
    value: value,
    schedule: schedule[]
}
const ModalContent:React.FC<prop> = ({ value, schedule }) => {
    const [show, setShow] = React.useState(true);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setShow(!show);
    } 

    const filterSchedule = schedule.filter(data => {
        return data.time !== ""
    });

    const dateTime = filterSchedule.map(item => {
        return (
            <>
                <span>
                    {format(item.date.toLocaleDateString(), "d MMMM, yyyy")}
                </span>
                <span>
                    Time: <time>{item.time}</time>
                </span>
            </>
        );
    })
    
    return (
        <div className={styles['modal']}>
            <div className={styles['header']}>
                Confirm booking.
            </div>

            
            {show ? (
            <>
                <div className={styles['booking-icon-status']}>
                    <img src={iQubeLogo} alt="iQube logo" />
                    <h1>Meeting summary with iQubes lab</h1>
                </div>
                <section>
                    <div className={styles['detail']}><span className={styles['para']}>Subject: </span><span>{value.subject}</span></div>
                    <div className={styles['detail']}>
                        <span className={styles['para']}>Date: </span>
                        <div className={styles['time-date']}>
                            {dateTime}
                        </div>
                    </div>
                    
                    <div className={styles['description']}>
                        <h3>Description</h3>
                        <p>
                            {value.description}
                        </p>
                    </div>
                </section></>) : 
                (
                <>
                    <div className={styles['booking-confirmed']}><img src={openedMessage} alt="booking sent"/></div>
                    <div className={styles['confirm-booking']}>
                        <p>Our member of our support staff will respond via email within 24 hours with further details of the meeting. Talk to you soon. </p>
                    </div>
                </>)
            }
            {show ? (<button onClick={(e) => handleClick(e)}>Confirm meeting</button>) : null}
            
            {!show && (<button><a href="/build-with-us">Back home</a></button>)}
        </div>
    );
}

export default ModalContent;