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
        if (!this.state.isEnabled) {
            this.askForNotificationPermission();
        }
        this.setState({
            isEnabled: !this.state.isEnabled
        });
    }

    displayConfirmNotification() {
        var options = {
            body: 'You successfully subscribed to our Notification service!'
        };
        new Notification('Successfully subscribed!', options);
    }

    askForNotificationPermission() {
        const that = this;
        Notification.requestPermission(function (result) {
            console.log('User Choice', result);
            if (result !== 'granted') {
                console.log('No notification permission granted!');
            } else {
                that.displayConfirmNotification();
            }
        });
    }

    render() {
        const onOff = this.state.isEnabled ? "On" : "Off";
        return (
            <div className="dropdown-item"><span onClick={() => this.toggle()}><i className="far fa-bell"></i>{`Notifications ${onOff}`}</span></div>
        );
    }
}

export default NavbarNotification;