import PropTypes from 'prop-types'
import React, { Component } from 'react'
import DesktopContainer from './DesktopContainer';
import MobileContainer from './MobileContainer';

class ResponsiveContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {children} = this.props;
        return (
            <div>
                <DesktopContainer>{children}</DesktopContainer>
                <MobileContainer>{children}</MobileContainer>
            </div>
        )
    }
}
ResponsiveContainer.propTypes = {
    children: PropTypes.node,
  }
export default ResponsiveContainer;
