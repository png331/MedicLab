import React from "react";
import ExaminationList from "./ExaminationList";

export default class Examination extends React.Component {
    state = {
        loading: true,
        examination: null,
    };

    async componentDidMount() {
        const accessToken = sessionStorage.getItem('accessToken');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };
        const APIurl = 'http://10.5.7.57:3001'; 
        const response =  await fetch(`${APIurl}/users/${this.props.user.id}/examinations`, requestOptions);
        const data = await response.json();
        this.setState({examination: data, loading: false})
    }
    render() {
        return (
            <div className="content"> 
                {this.state.loading || !this.state.examination ? 
                    <div><h2>loading...</h2></div> : this.state.examination.length ?
                        <ExaminationList examinations={this.state.examination}/> 
                         : <div><h2>This user has no examinations...</h2></div>
            }
            </div>
        )
    }
}