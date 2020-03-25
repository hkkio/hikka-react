import PropTypes from "prop-types";
import React, { useEffect } from "react";
import {
	Player
} from "../../components";
import { withRouter } from "react-router-dom";

const Component = ({getRelease, releases, match}) => {
	useEffect(initialize, []);

	function initialize() {
		getRelease({id: match.params.id});
	}

	return (
		<div>
			{releases.currentRelease != null && <Player release={releases.currentRelease} />}
			
		</div>
	);
}

Component.propTypes = {

};

export default withRouter(Component);