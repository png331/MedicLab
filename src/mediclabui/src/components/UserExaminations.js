import { useLocation } from "react-router-dom";
import Examination from "./Examination";
import Header from "./Header";
import NewExamination from "./NewExamination";

const UserExaminations = () => {
    const location = useLocation();
    const user = location.state.user;
    const role = location.state.role;
   
    function RenderNewExaminationButton(props) {
        if(props.role === '"Doctor"') {
            return (
                <NewExamination user={user} />
            )
        }
    }

    return ( 
        <>
        <Header user={user} role={role} />
        <div style={{textAlign: 'center'}} className="container mt-5">
            <h2>Patient</h2>
            <h1> <em>{user.first_name} {user.last_name}</em></h1>
            <h2>Examinations</h2>
            <RenderNewExaminationButton role={role} />
        </div>
        <Examination user={user} />
        </>
     );
}
 
export default UserExaminations;