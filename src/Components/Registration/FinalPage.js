import React, {Component} from "react";

class FinalPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.prev ? this.props.prev.firstName : '',
            lastName: this.props.prev ? this.props.prev.lastName : '',
            phone: this.props.prev ? this.props.prev.phone : '',
            email: this.props.prev ? this.props.prev.email : '',
            password: this.props.prev ? this.props.prev.password : '',
            ageGroup: this.props.prev ? this.props.prev.ageGroup : '',
            industry: this.props.prev ? this.props.prev.industry : '',
            industry_tags: this.props.prev ? this.props.prev.industry_tags : [],
            title: this.props.prev ? this.props.prev.title : '',
            company: this.props.prev ? this.props.prev.company : '',
            education: this.props.prev ? this.props.prev.education : '',
            province: this.props.prev ? this.props.prev.province : '',
            country: this.props.prev ? this.props.prev.country : '',
            states: this.props.prev ? this.props.prev.states : '',
            resumeURL: this.props.prev ? this.props.prev.resumeURL : '',
            profilePicURL: this.props.prev ? this.props.prev.profilePicURL : '',
        }
    }
    render() {
        return(
            <h1> HAHAHA YOU MADE IT </h1>
        );
    }
}

export default FinalPage;