import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const UsersList = (props) => {
    const users = props.users;
    const role = props.role;
    function RenderUsersTable() {
        return (
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Dateofbirth</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
        )
    }

    function RenderUsers() {
        return (
            users.map( (user) => ( 
                <tr key={user.id}>
                    <th scope="row">{ user.id}</th>
                    <td>{user.first_name}</td>
                    <td>{ user.last_name }</td>
                    <td>{ user.address }</td>
                    <td>{ user.dob }</td>
                    <td>{ user.username }</td>
                    <td>{ user.email }</td>
                    <td><Link to='/examinations' state={{user: user,role: role}}>View Examinations</Link></td>
                </tr> 
            ))  
        )
    }
    
    return (
      <Table striped bordered hover>
            <thead className="table-dark">
                <RenderUsersTable />
            </thead>
            <tbody>
                <RenderUsers />
            </tbody> 
      </Table>
    );
}
 
export default UsersList;