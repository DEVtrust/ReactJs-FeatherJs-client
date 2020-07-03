import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";


class SubscriptionPage extends React.Component {
    static get propTypes() {
        return {
            user: PropTypes.object,
        };
    }
    render(){ 
        const { user } = this.props;

        if(user) {
            return <SubScription user={user} />;
        } else {
            return <span>Loading...</span>;
        }
    }
}

class SubScription extends React.PureComponent {
    static get propTypes() {
        return {
            user: PropTypes.object,
        };
    }
    componentDidMount(){
        (function () { var s = document.createElement("script"); s.src = "https://js.servicebot.io/embeds/servicebot-billing-settings-embed.js"; s.async = true; s.type = "text/javascript"; var x = document.getElementsByTagName("script")[0]; x.parentNode.insertBefore(s, x) })();
    }
    
    render(){
        const { user } = this.props;
        if(user) {
            window.servicebotSettings = {
                "servicebot_id": "bhx4dRcqRzdO",
                "email": user.email,
                "service": "SB_DEMO",
                "type": "portal",
                "integration": "html"
            };
        }
        return (
            <div>
                <div id="servicebot-subscription-portal"></div>
            </div>
        );
    }
}

const matchStateToEventProps = state => {
  return {
    user: state.userReducer.user
  };
};


const SubScriptionReux = connect(matchStateToEventProps)(SubscriptionPage);

export default SubScriptionReux;