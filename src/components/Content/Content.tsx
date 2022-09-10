import React from "react";
import styles from './Content.module.scss';

const Content = () => {
    return (
        <div className={styles["content"]}>
            <p>Are you looking to build a global standard MVP of your product? 
                You've come to the right place! Reach out to us today and let the journey begin!
            </p>
            <span>Submit a request</span>
            <form>
                <label htmlFor="name">Name</label>
                <input 
                    aria-label="Name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"/>
                <label htmlFor="email">Email Address</label>
                <input 
                    name="email"
                    aria-label="Email"
                    type="email"
                    placeholder="Enter email address"/>
                <label htmlFor="subject">Subject</label>
                <input 
                    name="subject"
                    aria-label="Subject"
                    type="text"
                    placeholder="Enter subject"/>
                <label htmlFor="medium">Medium</label>
                <select name="medium">
                    <option value=""></option>
                    <option value="on-site visit">On-site visit</option>
                    <option value="virtual meeting">Virtual meeting</option>
                </select>
                <span>Our address is at: 194, Herbert Macaulay Road, Yaba, Lagos.</span>
                <label htmlFor="date">Schedule date</label>
                <input 
                    name="date"
                    aria-label="Subject"
                    type="text"
                    value="16 July, 2022"/>
                <label htmlFor="time">Available time slots</label>
                <select name="time">
                    <option value="9:00AM-10:00AM">9:00 AM - 10:00 AM</option>
                    <option value="10:00AM-11:00AM">10:00 AM - 11:00 AM</option>
                    <option value="11:00AM-12:00PM">11:00 AM - 12:00 PM</option>
                    <option value="12:00PM-1:00PM">12:00 PM - 1:00 PM</option>
                    <option value="1:00PM-2:00PM">1:00 PM - 2:00 PM</option>
                    <option value="2:00PM-3:00PM">2:00 PM - 3:00 PM</option>
                </select>
            </form>
        </div>
    );
}

export default Content;