import { useContext } from 'react';
import { ThemeContext } from '../../context';
import './toggle.css'

const Toggle = () => {
    const theme = useContext(ThemeContext);
    
    const handleClick = () => {
        theme.dispatch({ type: 'TOGGLE' });
    }

    const iconLinks = [
        'https://cdn.pixabay.com/photo/2014/04/02/10/19/star-303454_1280.png',
        'https://cdn.pixabay.com/photo/2014/04/02/16/27/moon-307307_1280.png'
    ]

    const toggleIcon = (imgLink => {
        return (
            <img
                key={imgLink}
                src={imgLink}
                alt=''
                className='toggle-icon'
            />
        );
    })

    return (
        <div className="toggle" onClick={handleClick}>
            {iconLinks.map(iconLink => toggleIcon(iconLink))}
            <div
                className="toggle-button"
                style={{left: theme.state.darkMode ? 0 : 25}}
            />
        </div>
    )
}

export default Toggle;
