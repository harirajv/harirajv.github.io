import React from "react";

class Resume extends React.Component {
    render() {
        return (
            <main id="main">
            <section id="resume" className="resume">
                <div className="container" data-aos="fade-up">

                    <div className="section-title">
                        {/* <h2>Resume</h2> */}
                        <h2>About Me</h2>
                        <p>Catch a glimpse of my academic and professional career below. Download my resume: <a href="/assets/Hariraj_Venkatesan_2.pdf" target="_blank"><box-icon type='solid' name='file-pdf'/></a></p>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <h3 className="resume-title">Sumary</h3>
                            
                            <div className="resume-item pb-0">
                                <h4>Hariraj Venkatesan</h4>
                                <p><em>Innovative and business-driven Software Engineer with 3+ years of experience in designing and developing user-centered scalable web applications on AWS from initial prototype to final deliverable and maintaining cloud infrastructure for unhindered customer experience.</em></p>
                                
                                <ul>
                                    <li>Tempe, AZ</li>
                                    <li>(480) 875-1333</li>
                                    <li>hvenka17@asu.edu</li>
                                </ul>
                            </div>

                            <h3 className="resume-title">Education</h3>
                            <div className="resume-item">
                                <h4>Master of Science &#8208; Software Engineering</h4>
                                <h5>2022 - 2024</h5>
                                <p><em>Arizona State University, Tempe, AZ</em></p>
                                <p>Focussed study in areas of Advanced Data Structures and Algorithms, Data Science, Data Visualizations and Paradigms in Programming.</p>
                            </div>
                            <div className="resume-item">
                                <h4>Bachelor of Technology &#8208; Computer Science</h4>
                                <h5>2015 - 2019</h5>
                                <p><em>SASTRA University, India</em></p>
                                <p>My exploration of Computer Science with courses in Design and Analysis of Algorithms, Data Warehousing, Machine Learning Techniques and Natural Language Processing.</p>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <h3 className="resume-title">Professional Experience</h3>
                            <div className="resume-item">
                                <h4>Graduate Student Assistant</h4>
                                <h5>2022 - Present</h5>
                                <p><em>Arizona State University, Tempe, AZ </em></p>
                                <ul>
                                    <li>Taught Data Science - exploratory data analysis, data visualization and machine learning algorithms for a diverse class of undergrad and grad students.</li>
                                    <li>Devised Python problems for pattern detection with Pandas and data-driven decision making with Matplotlib.</li>
                                    <li>Evaluated assignments and exam submissions for appropriate usage of data structures and optimized design of algorithms</li>
                                </ul>
                            </div>
                            <div className="resume-item">
                                <h4>Senior Software Engineer</h4>
                                <h5>2019 - 2022</h5>
                                <p><em>Freshworks, Chennai, India</em></p>
                                <ul>
                                    <li>Created REST API for admin operations backed by Memcached for 60% faster response time.</li>
                                    <li>Developed JWT authorization system for role-based API access between Spring Boot microservices.</li>
                                    <li>Created fault-tolerant CI/CD pipeline on AWS Spot EC2 with dynamic scalability of Kubernetes pods.</li>
                                    <li>Built containerized test suites with Jenkins and reduced execution time from 2hrs to 30min - 75% faster.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            </main>
        );
    }
}

export default Resume;
