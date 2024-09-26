import React from "react";

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            loading: true
        }
    }

componentDidMount() {
        fetch("assets/projects.json")
            .then(response => response.json())
            .then(data => this.setState({ projects: data["projects"], loading: false }))
            .catch(err => {
                console.error('Error message: ', err.message);
                console.error('Stack trace: ', err.stack);
                this.setState({ loading: false });
            })
    }

    render() {
        return (
            <main id="main">
            <section id="portfolio" className="portfolio section-bg">
                <div className="container" data-aos="fade-up">

                    <div className="section-title">
                    <h2>Portfolio</h2>
                        <h4 className="quote"><i>&#8220;The function of good software is to make the complex appear simple.&#8221;</i> – Grady Booch</h4>
                        <p>Over the course of my journey, I've embarked on a myriad of projects spanning the realms of web development, data science, and deep learning. Each endeavor has served as a crucible for refining my skills and expanding my technical acumen. The following projects stand as pivotal milestones in my professional repertoire, each contributing to the augmentation of my arsenal of tools and the cultivation of my expertise.</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-12 d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
                            <ul id="portfolio-flters">
                                <li data-filter="*" className="filter-active">All</li>
                                <li data-filter=".filter-web">Web</li>
                                <li data-filter=".filter-app">AI</li>
                            </ul>
                        </div>
                    </div>

                    <div className="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
                        {/* <ul className="projects-list">
                            {this.state.projects && this.state.projects.map((project, index) => (
                                <li>
                                    <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                                        <div className="portfolio-wrap">
                                            <img src={project["image_src"]} className="img-fluid" alt="" />
                                            <div className="portfolio-info">
                                                <h4>{project["name"]}</h4>
                                                <p>{project["category"]}</p>
                                                <div className="portfolio-links">
                                                    <p>{project["details_txt"]}</p>
                                                    <a href={project["details_link"]} className="portfolio-details-lightbox"><box-icon name="link"/></a>
                                                    <ul>{project["tech_tags"].split(",").map((tag, _) => <li>#{tag}</li>)}</ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul> */}
                        
                        <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                            <div className="portfolio-wrap">
                                <img src="assets/img/portfolio/Cloud-Cost.jpg" className="img-fluid" alt="" />
                                <div className="portfolio-info">
                                    <h4>CSP Cost Optimization</h4>
                                    <p>Web</p>
                                    <div className="portfolio-links">
                                        <p>An Analytic Hierarchy Process powered tool to optimize expenses of cloud service providers to maximize profitability without affecting brand loyalty of paying customers.</p>
                                        <a href="https://github.com/harirajv/CSP-profit-maximisation" className="portfolio-details-lightbox" data-glightbox="type: external" title="Portfolio Details"><box-icon name="link"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                            <div className="portfolio-wrap">
                                <img src="assets/img/portfolio/pedestrian.webp" className="img-fluid" alt="" />
                                <div className="portfolio-info">
                                    <h4>Anchor-free Pedestrian Detection enhanced by FPN</h4>
                                    <p>DS</p>
                                    <div className="portfolio-links">
                                        <p>A pedestrian detection system for autonomous vehicles was developed using advanced techniques like Residual Neural Networks, Anchor-free algorithms, and Feature Pyramid Networks, significantly enhancing accuracy across challenging conditions.</p>
                                        <a href="/#" className="portfolio-details-lightbox" data-glightbox="type: external" title="Portfolio Details"><box-icon name="link"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                            <div className="portfolio-wrap">
                                <img src="assets/img/portfolio/language.png" className="img-fluid" alt="" />
                                <div className="portfolio-info">
                                    <h4>Indian Language Identifier</h4>
                                    <p>DS</p>
                                    <div className="portfolio-links">
                                        <p>An automatic speech recognition system was developed to identify Indian languages, utilizing Mel Frequency Cepstral Coefficients extracted from news clips with Python Speech Features library.</p>
                                        <a href="https://github.com/harirajv/Automatic-Language-Identification" className="portfolio-details-lightbox" data-glightbox="type: external" title="Portfolio Details"><box-icon name="link"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                            <div className="portfolio-wrap">
                                <img src="assets/img/portfolio/credit.jpg" className="img-fluid" alt="" />
                                <div className="portfolio-info">
                                    <h4>Credit Card Fraud Detection</h4>
                                    <p>DS</p>
                                    <div className="portfolio-links">
                                        <p>Developed a Credit Card Fraud Detection system that analyzes transaction data to identify spending anomalies and potential fraud, ensuring the anonymity of financial features.</p>
                                        <a href="/#" className="portfolio-details-lightbox" data-glightbox="type: external" title="Portfolio Details"><box-icon name="link"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                            <div className="portfolio-wrap">
                                <img src="assets/img/portfolio/medical.png" className="img-fluid" alt="" />
                                <div className="portfolio-info">
                                    <h4>Chronic Kidney Disease Detection</h4>
                                    <p>DS</p>
                                    <div className="portfolio-links">
                                        <p>Devised a data-driven model to enable early detection of Chronic Kidney Disease using clinical data such as sugar, albumin, and hemoglobin levels.</p>
                                        <a href="/#" className="portfolio-details-lightbox" data-glightbox="type: external" title="Portfolio Details"><box-icon name="link"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                            <div className="portfolio-wrap">
                                <img src="assets/img/portfolio/news.png" className="img-fluid" alt="" />
                                <div className="portfolio-info">
                                    <h4>HackerNews Mobile Reader</h4>
                                    <p>Web</p>
                                    <div className="portfolio-links">
                                        <p>Developed a responsive Hacker News Mobile Reader app with React JS, featuring article fetching, social media sharing, and single sign-on via Google and Facebook.</p>
                                        <a href="https://github.com/harirajv/hackernews" className="portfolio-details-lightbox" data-glightbox="type: external" title="Portfolio Details"><box-icon name="link"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        

                    </div>

                </div>
            </section>
            </main>
        );
    }
}

export default Portfolio;
