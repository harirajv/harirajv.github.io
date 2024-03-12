import React from "react";
import Typed from "typed.js";

class Home extends React.Component {

    componentDidMount() {
        const options = {
            strings: [
                "Designer",
                "Developer",
                "Data Scientist"
            ],
            typeSpeed: 75,
            backSpeed: 75,
            loop: true
        };

        this.typed = new Typed(this.el, options);
    }

    componentWillUnmount() {
        this.typed.destroy();
    }

    render() {
        return (
            <section id="hero" className="d-flex flex-column justify-content-center">
                {/* <div className="container" data-aos="zoom-in" data-aos-delay="100"> */}
                <div className="container">
                    <p>My name is</p>
                    <h1>Hariraj Venkatesan</h1>
                    <p>I'm a <span ref={(el) => { this.el = el; }} /></p>
                    <div className="social-links">
                        <a href="mailto:hvenka17@asu.edu" className="email"><box-icon type='solid' name="envelope"/></a>
                        <a href="tel:4808751333" className="phone"><box-icon type='solid' name='phone'/></a>
                        <a href="https://www.linkedin.com/in/hariraj-venkatesan/" className="linkedin"><box-icon type='logo' name="linkedin"/></a>
                        <a href="https://github.com/harirajv" className="github"><box-icon type='logo' name="github"/></a>
                    </div>
                </div>
            </section>
        );
    }
}

export default Home;
