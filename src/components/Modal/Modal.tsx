import React from "react";
import styles from './Modal.module.scss';
import openedMessage from '../Images/opened-env.svg';
import iQubeLogo from '../Images/iqube.svg';
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

            
            {show ? (
            <>
                <div className={styles['booking-icon-status']}>
                    <img src={iQubeLogo} alt="iQube logo" />
                    <h1>Meeting summary with iQubes lab</h1>
                </div>
                <section>
                    <div className={styles['detail']}><span className={styles['para']}>Subject: </span><span>Build an app</span></div>
                    <div className={styles['detail']}>
                        <span className={styles['para']}>Date: </span>
                        <div className={styles['time-date']}>
                            <span>
                                {format(value.date.toLocaleDateString(), "d MMMM, yyyy")}
                            </span>
                            <span>
                                Time: <time>9 - 10 AM</time>
                            </span>
                            <span>
                                {format(value.date.toLocaleDateString(), "d MMMM, yyyy")}
                            </span>
                            <span>
                                Time: <time>9 - 10 AM</time>
                            </span>
                        </div>
                    </div>
                    
                    <div className={styles['description']}>
                        <h3>Description</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Morbi eget eleifend odio sollicitudin. In non est, urna at. 
                            Ac suspendisse id nam amet praesent ultrices sollicitudin. 
                            Morbi tellus, mauris sollicitudin dignissim enim sem pharetra urna. 
                            Eu id in orci, at. Adipiscing integer tincidunt nulla urna nisl morbi 
                            sed leo. Convallis porttitor pulvinar tellus in elementum euismod. 
                            Dapibus tellus aliquam gravida lobortis bibendum sapien felis, eu. 
                            Auctor dictum fermentum cras condimentum gravida et, commodo. 
                            Diam diam gravida semper cras nunc urna sit. Suspendisse elementum 
                            aliquam vivamus praesent netus donec.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Morbi eget eleifend odio sollicitudin. In non est, urna at. 
                            Ac suspendisse id nam amet praesent ultrices sollicitudin. 
                            Morbi tellus, mauris sollicitudin dignissim enim sem pharetra urna. 
                            Eu id in orci, at. Adipiscing integer tincidunt nulla urna nisl morbi sed leo. 
                            Convallis porttitor pulvinar tellus in elementum euismod. Dapibus tellus aliquam 
                            gravida vivamus praesent netus donec.
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