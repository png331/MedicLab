import React from 'react';
import Header from './Header';
import Users from './Users';

export default function UsersPage() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const role = JSON.parse(sessionStorage.getItem('role'));

  return (
    <>
        <Header user={user} role={role}/>
        <Users />
    </>
  );
}