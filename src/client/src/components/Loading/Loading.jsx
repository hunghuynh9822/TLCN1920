import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import ReactDelayRender from 'react-delay-render';

class Loading extends Component{
    render(){
        return(
            <Loader active size="massive" />
        )
    }
}
export default ReactDelayRender({ delay: 300 })(Loading);