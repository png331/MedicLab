import React from 'react';
import Header from './Header';
import Users from './Users';
import NoPage from './NoPage';

export default function UsersPage() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const role = JSON.parse(sessionStorage.getItem('role'));
    if(role === "Doctor")
      return (
        <>
            <Header user={user} role={role}/>
            <Users />
        </>
      );
    else {
      return <NoPage />
    }
}