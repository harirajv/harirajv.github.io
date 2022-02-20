import './intro.css'

const titles = ['Web Developer', 'NLP Enthusiast', 'Music Lover']

const Intro = () => {
    return (
        <div className="intro">
            <div className="intro-left">
                <h2 className='intro-hello'>Hello, My name is</h2>
                <h1 className='intro-name'>Hariraj V</h1>
                <div className='intro-title'>
                    <div className='intro-title-item-wrapper'>
                        {titles.map(title => <div key={title} className='intro-title-item'>{title}</div>)}
                    </div>
                </div>
                <p className="intro-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
            
            <div className="intro-right">
                <div className="intro-image-bg"></div>
                <img src="/spider-man.png" alt="" className="intro-image" />
                {/* Add scroll down animated SVG using CSS transform */}
            </div>
        </div>
    );
}

export default Intro;
