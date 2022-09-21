import React from "react";
import styles from './Content.module.scss';
import DatePicker from "react-datepicker";
import { format } from 'react-string-format';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import "react-datepicker/dist/react-datepicker.css";
import ModalContent from "../Modal/Modal";
import calendarIcon from '../Images/calendar.svg';
import arrowDown from "../Images/arrow.svg";
import clockIcon from "../Images/clock.svg";

const Content = () => {
    const [scheduleData, setScheduleData] = React.useState([
        {
            id: 0,
            date: new Date(),
            time: "",
            showPlaceHolder: true,
            isOpen: false,
            disabled: false,
            rendered: true,
            showRemove: false
        }
    ]);

    const [value, setValue] = React.useState({
        name: "",
        email: "",
        subject: "",
        description: ""
    });

    const [open, setOpen] = React.useState(false);  
    const closeModal = () => setOpen(false);
  
    const handleClick = (e: { preventDefault: () => void; }, id: number) => {
        e.preventDefault();
        const updateData = scheduleData.map(item => {
            if (item.id === id) {
                return {...item, isOpen: !item.isOpen}
            }
            return item
        })
        setScheduleData(updateData);
    };

    const addNewDateTime = (id: number) => {
        const clear = scheduleData.length === 2 ? true : false;
        const remove = scheduleData.length === 2 ? true : false;
        const newProp = {
            id: id + 1,
            date: new Date(),
            time: "",
            showPlaceHolder: true,
            isOpen: false,
            disabled: clear,
            rendered: true,
            showRemove: remove
        }

        const data = scheduleData.map(item => {
            if (item.id === id) {
                return {...item, disabled: !item.disabled, showRemove: !item.showRemove}
            }
            return item
        });
        setScheduleData(data);
        setScheduleData((state) => [...state, newProp]);
    }

    const removeDateTime = (id: number) => {
        const updateProps = scheduleData.filter((item) => {
            return item.id !== id
        });
        const lastProp = updateProps[updateProps.length - 1];
        const data = updateProps.map(data => {
            if (data.id === lastProp.id && updateProps.length > 1) {
                return {...data, disabled: !data.disabled};
            }
            return data;
        })
        setScheduleData(data);
    }

    const updateScheduleData = (e: React.ChangeEvent<HTMLSelectElement> | React.SetStateAction<Date> | any, id: number, action: string) => {
        switch (action) {
            case 'time':
                const copyData = scheduleData.map(item => {
                    if (item.id === id) {
                        return {...item, time: e.target.value}
                    }
                    return item
                });
            
                setScheduleData(copyData);
                break
            case 'date':
                const data = scheduleData.map(item => {
                    if (item.id === id) {
                        return {...item, date: e, isOpen: !item.isOpen, showPlaceHolder: false}
                    }
                    return item
                })

                setScheduleData(data);
                break
            default:
                break
        }
        
        
    }

    
    const schedules = scheduleData.map(data => {
        return (
            <div key={data.id}><div className={styles['date-time-container']}>
                <div>
                    <div onClick={(e) => handleClick(e, data.id)} className={styles["datepicker"]}>
                        <img src={calendarIcon} alt="calendar icon"></img>
                        <>{data.showPlaceHolder ? (<small>Pick a date</small>) : (<small>{format(data.date.toLocaleDateString(), "d MMMM, yyyy")}</small>)}</>
                        <img src={arrowDown} alt="arrow down icon"></img>
                    </div>
                </div>
                        
                <div className={styles['timepicker']}>
                    <img src={clockIcon} alt="clock icon"></img>
                    <select name="time" value={data.time} onChange={(e) => updateScheduleData(e, data.id, 'time')}>
                        <option value="" disabled selected>Pick a time</option>
                        <option value="9 - 10 AM">9 - 10 am</option>
                        <option value="10 - 11 AM">10 - 11 am</option>
                        <option value="11 - 12 PM">11 - 12 pm</option>
                        <option value="12 - 1 PM">12 - 1 pm</option>
                        <option value="1 - 2 PM">1 - 2 pm</option>
                        <option value="2 - 3 PM">2 - 3 pm</option>
                    </select>
                </div>

                {data.showRemove && (
                    <button className={styles['remove-button']} onClick={() => removeDateTime(data.id)}><i>Remove</i></button>
                )}
                <button className={styles['add-button']} onClick={() => addNewDateTime(data.id)} disabled={data.disabled}>Add new</button>
                        
            </div>
            {data.isOpen && (
                    <DatePicker 
                        selected={data.date} 
                        onChange={(e:Date) => updateScheduleData(e, data.id, 'date')} 
                        dateFormat="d MMMM, yyyy" 
                        inline
                        minDate={new Date()} />   
            )}</div>
        );
    });

    const checkRequiredFields = () => {
        let timeDateState = true;
        let detailState = true;

        for (let i = 0; i < scheduleData.length; i++) {
            if ((scheduleData[i].time === "" || scheduleData[i].showPlaceHolder === true) && scheduleData[i].rendered === true) {
                timeDateState = true;
                break
            }
            timeDateState = false
        }
        
        const keys = Object.values(value);
        
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === "") {
                detailState = true;
                break
            }
            detailState = false
        }

        if (detailState === true || timeDateState === true) {
            return true
        }
        else return false
    }

    return (
        <div className={styles["content"]}>
            <p>Are you looking to build a global standard MVP of your product? 
                You've come to the right place! Reach out to us today and let the journey begin!
            </p>
            <span>Submit a request</span>
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="name">Name</label>
                <input 
                    aria-label="Name"
                    name="name"
                    type="text"
                    value={value.name}
                    onChange={(e) => setValue({...value, name: e.target.value})}
                    placeholder="Enter your name"/>
                <label htmlFor="email">Email Address</label>
                <input 
                    name="email"
                    aria-label="Email"
                    type="text"
                    value={value.email}
                    onChange={(e) => setValue({...value, email: e.target.value})}
                    placeholder="Enter email address"/>
                <label htmlFor="subject">Subject</label>
                <input 
                    name="subject"
                    aria-label="Subject"
                    placeholder="Enter the subject"
                    value={value.subject}
                    onChange={(e) => setValue({...value, subject: e.target.value})} />
                <label htmlFor="description">Description</label>
                <textarea 
                    name="description" 
                    value={value.description} 
                    onChange={e => setValue({...value, description: e.target.value})} 
                    placeholder="Please enter the details of your request. A member of our support staff will respond as soon as possible"
                />
                <label htmlFor="medium">Medium</label>
                <input 
                    name="medium"
                    aria-label="Medium"
                    type="text"
                    value="Online"
                    disabled={true}/>
                <section>
                    <div className={styles['date-time']}>
                        <label htmlFor="scheduled date and time">Schedule your preferred meeting time</label>
                        <i>You can choose up to 3 dates</i>
                    </div>
                    {schedules}
                </section>
                <button className={styles["button"]} disabled={checkRequiredFields()} onClick={() => setOpen(o => !o)}>Submit</button>
                <Popup 
                    lockScroll={true} 
                    contentStyle={
                        {
                            background: 'none', 
                            padding: '0', 
                            border: 'none', 
                            width: 'auto', 
                            maxHeight: 'calc(100vh - 6rem)', 
                            overflowY: 'scroll', 
                        }
                    } 
                    repositionOnResize={true} 
                    overlayStyle={
                        {
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    } 
                    modal 
                    closeOnDocumentClick
                    open={open}
                    onClose={closeModal}
                >
                    <ModalContent value={value} schedule={scheduleData} />
                    
                </Popup>
            </form>
        </div>
    );
}


export default Content;