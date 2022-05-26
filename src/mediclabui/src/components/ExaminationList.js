import { Button } from 'react-bootstrap';
import swal from 'sweetalert';

const ExaminationList = (props) => {
    const examination = props.examinations;
    const APIurl = 'http://localhost:3001';
    const loggedUser = JSON.parse(sessionStorage.getItem('user'));
    
    const handleDelete = async (user, examination, e) => {
        e.preventDefault();
        const response =  await DeleteExamination(user, examination);
        if (response) {
          swal("Success", "success", {
            buttons: false,
            timer: 2000,
          });
          window.location.reload(false);
        } else {
          swal("Failed", response.status.message, "error");
        }
    }

    async function DeleteExamination(user,examination) {
        const accessToken = sessionStorage.getItem('accessToken');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        myHeaders.append('Content-Type', 'application/json');
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,

        };
        return fetch(APIurl+`/users/${user.id}/examinations/${examination.id}`,requestOptions)
    }

    function RenderCreated(props) {
        const date = props.created_at.substring(0,10);
        return (
            <p>
            <strong>Created: </strong>
            {date}
            </p>
        )
    }

    function RenderPerscription(props) {
        if('perscription' in props.examination) {
            return (
                <div className="child">
                    <h2>Perscription</h2>
                    <p>
                    <strong>Description: </strong>
                    {props.examination.perscription.description}
                    </p>
                </div>
            )
        }
    }

    function RenderPerscriptionDrugs(props) {
        if('perscription' in props.examination && 
        'perscription_drugs' in props.examination.perscription && 
        props.examination.perscription.perscription_drugs.length !== 0) {
            return (
                <div className="child">
                <h2>Perscriped drugs</h2>
                    <table>
                        <thead>
                            <tr>
                                <td><strong>Description Usage</strong></td>
                                <td style={{paddingLeft: '10px'}}><strong>Drug</strong></td>
                            </tr>
                        </thead>
                        <tbody>
                        {props.examination.perscription.perscription_drugs.map( (perscriptionDrug) => (
                            <tr key={perscriptionDrug.id}>
                                <td>{perscriptionDrug.usageDescription}</td>
                                <td style={{paddingLeft: '10px'}}>{perscriptionDrug.drug.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    return ( 
        examination.map( (examination) => (
            <div className="blog-preview" key={examination.id}>
                <div className="child">
                    <h2>Examination</h2>
                    <p>
                    <strong>Weight (kg): </strong>
                    {examination.weightKg}
                    </p>

                    <p>
                    <strong>Height (cm): </strong>
                    {examination.heightCm}
                    </p>

                    <p>
                    <strong>Anamnesis: </strong>
                    {examination.anamnesis}
                    </p>
                    <RenderCreated created_at={examination.created_at} />
                </div>
                <RenderPerscription examination={examination}/>
                <RenderPerscriptionDrugs examination={examination}/>
                {
                    loggedUser.id === props.user.id ? <div></div> 
                    : <Button variant="danger" className='w-auto h-25 ms-auto mt-auto' onClick={(e) => handleDelete(props.user,examination, e)}>Delete</Button>  
                }
                
        </div>
        ))        
    );
}
 
export default ExaminationList;