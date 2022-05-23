import React from "react";
import UsersList from "./UsersList";

export default class Users extends React.Component {
    state = {
        loading: true,
        users: null,
    };

    async componentDidMount() {
        const accessToken = sessionStorage.getItem('accessToken');
        const role = sessionStorage.getItem('role')
        var myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };
        const APIurl = 'http://10.5.7.57:3001'; 
        const response =  await fetch(`${APIurl}/users`, requestOptions);
        const data = await response.json();
        this.setState({users: data, role: role, loading: false})
    }
    render() {
        return (
            <div className="content"> 
                {this.state.loading || !this.state.users ? 
                    <div><h2>loading...</h2></div> : this.state.users.length ? 
                        <UsersList users={this.state.users} role={this.state.role}/> 
                         : <div><h2>There are no users...</h2></div>
            }
            </div>
        )
    }
}