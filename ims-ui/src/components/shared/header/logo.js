import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../logo.svg'
import whiteLogo from '../../../white-logo.svg'

class Logo extends React.Component {

	render() {
		const divStyle = {
			display:this.props.enabled?'block':'none'
		};

		const logoValue = this.props.white ? whiteLogo : logo;

		return (
			<div className="logo" style={divStyle}>
				<Link to="/">
					<img src={logoValue} title="IMS" alt="IMS" />
				</Link>
			</div>
		);
	}
}

export default Logo;