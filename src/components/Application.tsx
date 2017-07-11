import * as React from 'react'

import * as styls from './Application.scss'

interface ApplicationPropTypes {
    files: string[];
}

export default class Application extends React.Component<ApplicationPropTypes> {

    render () {
        return (
            <ul>
                {this.props.files.map(f => <li>{f}</li>)}
                <li>yoma</li>
            </ul>
        );
    }

}

