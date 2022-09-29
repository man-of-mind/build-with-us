import React from "react";
import styles from './Modal.module.scss';
import openedMessage from '../Images/opened-env.svg';
import iQubeLogo from '../Images/iqube.svg';
import { format } from 'react-string-format';
import axios from 'axios';
import emailjs from '@emailjs/browser';


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
    let userData: { time: string; date: string; }[] = [];
    schedule.map(item => {
        userData.push({
            date: item.date.toDateString(),
            time: item.time
        });
        return item
    });

    const formData = {
        name: value.name,
        email: value.email,
        subject: value.subject,
        medium: "online",
        scheduledDateAndTime: userData,
        description: value.description
    }

    const template_schedule = userData.map(timeDate => {
        return Object.values(timeDate).join(" at ");
    }).join(" or ");
    
    const [buttonStyle, setButtonStyle] = React.useState({});
    const [text, setText] = React.useState("Confirm meeting");

    const [show, setShow] = React.useState(true);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const style = {
            opacity: '0.5',
            cursor: "not-allowed",
        };
        setButtonStyle(style);
        setText("loading...");
        axios.post("https://bwuiqube.herokuapp.com/api/v1/users", formData).then((res) => {
            if (res.status === 201) {
                setShow(!show);
            }
            emailjs.send('service_f3jbqhl','template_vl3asn6', {...formData, scheduleDateAndTime: template_schedule}, 'kskHrrj2hiTMCfMxY')
	        .then((response) => {
	            console.log('SUCCESS!', response.status, response.text);
	        }, (err) => {
	            console.log('FAILED...', err);
	        });
        }).catch((err) => {
            setButtonStyle({});
            setText("Confirm meeting")
            alert("Oops, something went wrong...")
        });
        
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
                    <b>Time</b>: <time>{item.time}</time>
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
                    <h1>Meeting summary with iQubes Labs</h1>
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
                        <p>A member of our support staff will respond via email within 24 hours with further details of the meeting. Talk to you soon. </p>
                    </div>
                </>)
            }
            {show ? (<button onClick={(e) => handleClick(e)} style={buttonStyle}>{text}</button>) : null}
            
            {!show && (<button><a href="/build-with-us">Back home</a></button>)}
        </div>
    );
}

export default ModalContent;