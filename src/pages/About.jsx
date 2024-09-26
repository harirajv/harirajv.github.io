import React from "react";
// import { Waypoint } from 'react-waypoint';

class About extends React.Component {
    handleWaypointEnter() {
        let skilsContent = document.getElementsByClassName("skills-content");// document.querySelectorAll(["classname=skills-content"]);
        if (skilsContent) {
            let progress = document.getElementsByClassName("progress-bar"); //document.querySelectorAll(["classname=.progress .progress-bar"]);
            Array.from(progress).forEach((el) => {
                el.style.width = el.getAttribute('aria-valuenow') + '%'
            });
        }
    }

    render() {
        return (
            <main id="main">
                <section id="about" className="about">
                    <div className="container" data-aos="fade-up">

                        <div className="section-title">
                            <h2>About</h2>
                            <h4><i>&#8220;The function of good software is to make the complex appear simple.&#8221;</i> – Grady Booch</h4>
                        </div>

                        <div className="row">
                            <div className="col-lg-4">
                                <img src="assets/img/profile-img.jpg" className="img-fluid" alt=""/>
                            </div>

                            <div className="col-lg-8 pt-4 pt-lg-0 content">
                                <h3>UI/UX Designer &amp; Web Developer.</h3>
                                <p className="fst-italic">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.
                                </p>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <ul>
                                            <li><box-icon name='chevron-right'/> <strong>Birthday:</strong> <span>1 May 1995</span></li>
                                            <li><box-icon name='chevron-right'/> <strong>Website:</strong> <span>www.example.com</span></li>
                                            <li><box-icon name='chevron-right'/> <strong>Phone:</strong> <span>+123 456 7890</span></li>
                                            <li><box-icon name='chevron-right'/> <strong>City:</strong> <span>New York, USA</span></li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-6">
                                        <ul>
                                            <li><box-icon name='chevron-right'/> <strong>Age:</strong> <span>30</span></li>
                                            <li><box-icon name='chevron-right'/> <strong>Degree:</strong> <span>Master</span></li>
                                            <li><box-icon name='chevron-right'/> <strong>PhEmailone:</strong> <span>email@example.com</span></li>
                                            <li><box-icon name='chevron-right'/> <strong>Freelance:</strong> <span>Available</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <p>
                                    Officiis eligendi itaque labore et dolorum mollitia officiis optio vero. Quisquam sunt adipisci omnis et ut. Nulla accusantium dolor incidunt officia tempore. Et eius omnis.
                                    Cupiditate ut dicta maxime officiis quidem quia. Sed et consectetur qui quia repellendus itaque neque. Aliquid amet quidem ut quaerat cupiditate. Ab et eum qui repellendus omnis culpa magni laudantium dolores.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        );
    }
}

export default About;
