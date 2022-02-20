import './about.css'

const About = () => {
    return (
        <div className='about'>
            <div className="about-left">
                <div className="about-card bg"></div>
                <div className="about-card">
                    <img
                        src="https://image.shutterstock.com/image-photo/magician-illusionist-showing-magic-trick-600w-1079848193.jpg"
                        alt=""
                        className="about-img"
                    />
                </div>
            </div>
            
            <div className="about-right">
                <h1 className='about-title'>About Me</h1>
                <p className="about-subtitle">
                    Some unknown facts about me
                </p>
                <p className="about-description">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <div className="about-award">
                    <img
                        src="https://media.istockphoto.com/vectors/old-broom-witchs-with-long-handle-accessory-for-halloween-vector-id807295100?s=612x612"
                        alt=""
                        className="about-award-image"
                    />
                    <div className="about-award-texts">
                        <h4 className="about-award-title">Quidditch of Hogwarts</h4>
                        <p className="about-award-description">
                            Lorem Ipsum is simply dummy text
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
