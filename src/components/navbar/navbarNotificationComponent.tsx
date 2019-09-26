import * as React from 'react';
import { DropdownItem } from 'reactstrap';

interface Props {
    userId?: number;
}

interface State {
    isEnabled: boolean;
}

class NavbarNotification extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isEnabled: false
        }
    }

    toggle() {
        this.setState({
            isEnabled: !this.state.isEnabled
        });
        this.forceUpdate();
    }

    render() {
        const onOff = this.state.isEnabled ? "On" : "Off";
        return (
            <div className="dropdown-item"><span onClick={() => this.toggle()}><i className="far fa-bell"></i>{`Notifications ${onOff}`}</span></div>
        );
    }
}

export default NavbarNotification;