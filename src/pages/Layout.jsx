import React from "react";
import { Link } from "react-router-dom";
import 'boxicons';

class Layout extends React.Component {
	header_items = [
		// "Home",
		"About",
		"Resume",
		"Portfolio",
		"Contact"
	]

	header_icons = {
		// "Home": "user",
		// "Home": "home",
		"About": "user",
		"Resume": "file-blank",
		"Portfolio": "book-content",
		"Contact": "envelope"
	}

    render() {
        return (
            <>
				{/* TODO Mobile Nav toggle button pending */}

				<header id="header" className="d-flex flex-column justify-content-center">
					<nav id="navbar" className="navbar nav-menu">
						<ul>
							{this.header_items.map(item => {
								const identifier = item.toLowerCase()
								const href_value = item === "About" ? "/" : identifier
								const icon_value = this.header_icons[item]
								
								return (
									<li key={item}>
										<Link to={href_value} className={item === "Home" ? "nav-link scrollto" : "nav-link scrollto"}>
											<box-icon name={icon_value}/><span>{item}</span>
										</Link>
									</li>
								)
							})}
						</ul>
					</nav>
				</header>

				{this.props.children}

            </>
        );
    }
}

export default Layout;
