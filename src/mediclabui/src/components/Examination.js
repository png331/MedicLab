import React from "react";
import ExaminationList from "./ExaminationList";

export default class Examination extends React.Component {
    state = {
        loading: true,
        examination: null,
    };

    async componentDidMount() {

        const accessToken = sessionStorage.getItem('accessToken');
        const user = JSON.parse(sessionStorage.getItem('user'));
        var myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        const response =  await fetch(`http://localhost:3001/users/${user.id}/examinations`, requestOptions);
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