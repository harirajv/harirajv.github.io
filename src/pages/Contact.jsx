import React from "react";
import { Envelope, GeoAlt, Phone } from "react-bootstrap-icons";
import emailjs from "@emailjs/browser";

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.state = { status: 'idle' };
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.setState({ status: 'sending' });

        emailjs.sendForm('service_eniwifa', 'contact_form', this.form.current, { publicKey: 'I-4RM4Z6x02jtxW5Z'})
            .then(
                () => {
                    this.setState({ status: 'success' });
                    this.form.current.reset();
                },
                (_err) => {
                    this.setState({ status: 'error' });
                }
            );
    }

    render() {
        return (
            <main className="page-shell">
                <section id="contact" className="section-block contact">
                    <div className="section-kicker">Contact</div>
                    <h1>Contact</h1>
                    <p className="section-lede">
                        Reach out for software engineering, cloud infrastructure, DevOps, or full-stack opportunities.
                    </p>
                    <div className="contact-grid">
                        <div className="info contact-panel">
                            <div className="contact-method">
                                <a href="https://maps.app.goo.gl/ty7LWwSBRMGaTBSQ8" aria-label="Open location map"><i><GeoAlt/></i></a>
                                <h2>Location</h2>
                                <p>Tempe, AZ</p>
                            </div>
                            <div className="contact-method">
                                <a href="mailto:hvenka17@asu.edu" aria-label="Email Hariraj"><i><Envelope/></i></a>
                                <h2>Email</h2>
                                <p>hvenka17@asu.edu</p>
                            </div>
                            <div className="contact-method">
                                <a href="tel:4808751333" aria-label="Call Hariraj"><i><Phone/></i></a>
                                <h2>Call</h2>
                                <p>+1&nbsp;(480)&nbsp;875&#8209;1333</p>
                            </div>
                        </div>

                        <form className="php-email-form" ref={this.form} onSubmit={this.onSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="user_name" className="form-control" id="name" placeholder="Your Name" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="user_email" id="email" placeholder="Your Email" required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea className="form-control" name="message" id="message" rows="5" placeholder="Message" required></textarea>
                            </div>
                            <div className="form-status">
                                {this.state.status === 'sending' && <div className="loading">Loading</div>}
                                {this.state.status === 'error' && <div className="error-message">Failed to send. Please try again.</div>}
                                {this.state.status === 'success' && <div className="sent-message">Your message has been sent. Thank you!</div>}
                            </div>
                            <button type="submit" disabled={this.state.status === 'sending'}>Send Message</button>
                        </form>
                    </div>
                </section>
            </main>
        );
    }
}
