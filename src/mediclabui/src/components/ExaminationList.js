const ExaminationList = (props) => {
    const examination = props.examinations;

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
        if('perscription_drugs' in props.examination) {
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
                </div>
                <RenderPerscription examination={examination}/>
                <RenderPerscriptionDrugs examination={examination}/>
        </div> 
        ))        
    );
}
 
export default ExaminationList;