import { useContext } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { ThemeContext } from '../../context';
import './contact.css'

const contactItems = [
    {
        infoText: 'harirajv@gmail.com',
        imgLink: 'https://cdn.pixabay.com/photo/2016/01/26/17/15/gmail-1162901_1280.png'
    },
    {
        infoText: '@evanoOruvan',
        imgLink: 'https://cdn.pixabay.com/photo/2014/04/03/11/53/twitter-312464_1280.png'
    }
]

const contactInfoItem = ({infoText, imgLink}) => {
    return (
        <div key={infoText} className='contact-info-item'>
            <img
                src={imgLink}
                alt=''
                className='contact-icon'
            />
            {infoText}
        </div>
    )
}

const Contact = () => {
    const [formState, handleSubmit] = useForm("mbjwgybg");

    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;

    return (
        <div className="contact">
            <div className="contact-bg"></div>
            <div className="contact-wrapper">
                <div className="contact-left">
                    <h1 className="contact-title">Let's talk</h1>
                    <div className="contact-info">
                        {contactItems.map(item => contactInfoItem(item))}
                    </div>
                </div>

                <div className="contact-right">
                    <p className="contact-description">
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input
                            id='email'
                            type='email'
                            placeholder='Email'
                            name='email'
                            style={{backgroundColor: !darkMode && 'black'}}
                        />
                        <ValidationError 
                            prefix="Email" 
                            field="email"
                            errors={formState.errors}
                        />
                        <textarea
                            id='message'
                            rows='5'
                            placeholder='Message'
                            name='message'
                            style={{backgroundColor: !darkMode && 'black'}}
                        />
                        <ValidationError 
                            prefix="Message" 
                            field="message"
                            errors={formState.errors}
                        />
                        <button type='submit' disabled={formState.submitting}>
                            Submit
                        </button>
                        {formState.succeeded && <span>Thank you!</span>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
