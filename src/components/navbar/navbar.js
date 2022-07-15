import React, { useState } from "react";

const navLinks = [
    {navLinkId: 'Home', scrollToId: 'homeContainer'}
]

const NavLink = ({ navLinkId, scrollToId, activeNavLinkId, setActiveNavLinkId }) => {
    const handleClick = () => {
        setActiveNavLinkId(navLinkId);
        document.getElementById(scrollToId).scrollIntoView({
            behavior: "smooth"
        });
    };

    return (
        <span
            id={navLinkId}
            className={activeNavLinkId === navLinkId ? 'activeClass' : ''}
            onClick={handleClick}
        >
            {navLinkId}
        </span>
    );
}

const Nav = () => {
    const [activeNavLinkId, setActiveNavLinkId] = useState('');

    return (
        <nav>
            {navLinks.map(
                (navLinkId, scrollToId) => 
                <NavLink
                    navLinkId={navLinkId}
                    scrollToId={scrollToId}
                    activeNavLinkId={activeNavLinkId}
                    setActiveNavLinkId={setActiveNavLinkId}
                />
            )}
        </nav>
    );
}
