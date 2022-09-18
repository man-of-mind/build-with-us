import React, { MutableRefObject, useState } from "react";
import styles from './Content.module.scss';
import DatePicker from "react-datepicker";
import { format } from 'react-string-format';
import {Editor, EditorState} from 'draft-js';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import "react-datepicker/dist/react-datepicker.css";
import ModalContent from "../Modal/Modal";
import calendarIcon from '../Images/calendar.svg';
import arrowDown from "../Images/arrow.svg";
import clockIcon from "../Images/clock.svg";

const Content = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [showPlaceHolder, setShowPlaceHolder] = React.useState(true);
    const [stateEditor, setStateEditor] = useState(EditorState.createEmpty());
    const [value, setValue] = useState({
        name: "",
        email: "",
        date: startDate,
        subject: "",
        time: "9:00AM-10:00AM"
    });
    const editor = React.useRef() as MutableRefObject<Editor>;
 
    function focusEditor() {
        editor.current.focus();    
    }
   
    React.useEffect(() => {
      focusEditor()
    }, []);
    
    const handleChange = (e: React.SetStateAction<Date>) => {
        setIsOpen(!isOpen);
        setStartDate(e);
        setShowPlaceHolder(false)
    };
    const handleClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };


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
                    type="email"
                    value={value.email}
                    onChange={(e) => setValue({...value, email: e.target.value})}
                    placeholder="Enter email address"/>
                <label htmlFor="subject">Subject</label>
                <select name="subject">
                    <option value="enquires">Enquries</option>
                </select>
                <label htmlFor="desciption">Description</label>
                <div onClick={focusEditor} style={{
                    border: '1px solid gray',
                    minHeight: '350px',
                    marginRight: '452px',
                    borderRadius: '4px',
                    padding: '4px'
                }}>
                    <Editor
                        ref={editor}
                        editorState={stateEditor}
                        onChange={(e) => setStateEditor(e)}
                    />
                </div>
                <h3>Please enter the details of your request. A member of our support staff will respond as soon as possible.</h3>
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
                        <i>You can chose up to 3 dates</i>
                    </div>
                    <div className={styles['date-time-container']}>
                        <div>
                            <div onClick={handleClick} className={styles["datepicker"]}>
                                <img src={calendarIcon} alt="calendar icon"></img>
                                <>{showPlaceHolder ? (<small>Pick a date</small>) : (<small>{format(startDate.toLocaleDateString(), "d MMMM, yyyy")}</small>)}</>
                                <img src={arrowDown} alt="arrow down icon"></img>
                            </div>
                        </div>
                        
                        <div className={styles['timepicker']}>
                            <img src={clockIcon} alt="clock icon"></img>
                            <select name="time">
                                <option value="" disabled selected>Pick a time</option>
                                <option value="9 - 10 AM">9 - 10 am</option>
                                <option value="10 - 11 AM">10 - 11 am</option>
                                <option value="11 - 12 PM">11 - 12 pm</option>
                                <option value="12 - 1 PM">12 - 1 pm</option>
                                <option value="1 - 2 PM">1 - 2 pm</option>
                                <option value="2 - 3 PM">2 - 3 pm</option>
                            </select>
                        </div>

                        <button>Add new</button>
                        
                    </div>
                    {isOpen && (
                            <DatePicker selected={startDate} onChange={(e:Date) => handleChange(e)} dateFormat="d MMMM, yyyy" inline />   
                    )}
                </section>
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
                    closeOnDocumentClick={false}
                    trigger={<button className={styles["button"]} onClick={(e) => e.preventDefault()}>Submit</button>}
                    className={styles['my-popup']} 
                >
                    <ModalContent value={value}/>
                    
                </Popup>
            </form>
        </div>
    );
}


export default Content;