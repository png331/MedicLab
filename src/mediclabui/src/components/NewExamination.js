import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import swal from 'sweetalert';

export default function NewExamination(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const APIurl = 'http://localhost:3001';

    const [loading, setLoading] = useState(true);
    //Examination input
    const [weightKg, setWeightKg] = useState("");
    const [heightCm, setHeightCm] = useState("");
    const [anamnesis, setAnamnesis] = useState("");
    //Perscription_attributes input
    const [description, setDescription] = useState("");
    //Perscription_drugs_attributes input
    const [perscription_drugs, setPerscription_drugs] = useState([{drug_id: "", usageDescription: ""}]);

    //GET drugs
    const [drugs, setDrugs] = useState();

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...perscription_drugs];
        list[index][name] = value;
        setPerscription_drugs(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...perscription_drugs];
        list.splice(index, 1);
        setPerscription_drugs(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setPerscription_drugs([...perscription_drugs, { drug_id: "", usageDescription: "" }]);
    };

    // handle submit
    const handleSubmit = async e => {
        e.preventDefault();
        const response =  await postExamination({
            weightKg,
            heightCm,
            anamnesis,
            perscription_attributes: {
                description,
                perscription_drugs_attributes: perscription_drugs
            }
        });
        if (response) {
          swal("Success", "success", {
            buttons: false,
            timer: 2000,
          });
          window.location.href = '/examinations';
        } else {
          swal("Failed", response.status.message, "error");
        }
      }

    async function postExamination(credentials) {
        const accessToken = sessionStorage.getItem('accessToken');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        myHeaders.append('Content-Type', 'application/json');
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(credentials)

        };
        return fetch(APIurl+`/${props.user.id}/examinations/detailed`,requestOptions)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            swal("Failed", res.statusText ,"error");
          }
        })
      }

    useEffect(() => {
        async function fetchData() {
            const accessToken = sessionStorage.getItem('accessToken');
            var myHeaders = new Headers();
            myHeaders.append("Authorization", accessToken);
    
            var requestOptions = {
                method: 'GET',
                headers: myHeaders
            };
            const res = await fetch(`${APIurl}/drugs`, requestOptions);
            const data = await res.json();
            setDrugs(data);
            setLoading(false);
        }
        // fetchData();
        if (show){
            fetchData();
        }
    }, [show]);
  
    return (
      <>
        <Button className="w-auto" variant="primary" onClick={handleShow}>
          New Examination
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
            <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Create Examination</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className='mb-3'>
                    <FloatingLabel
                        controlId="floatingInputWeight"
                        label="Weight in KG"
                    >
                    <Form.Control
                        required
                        type="number"
                        min={0}
                        max={500}
                        step={0.5}
                        autoFocus
                        placeholder="Please add patient weight in KG"
                        value={weightKg}
                        onChange={e => setWeightKg(e.target.value)}
                    />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInputHeight"
                        label="Height in CM"
                    >
                    <Form.Control
                        required
                        type="number"
                        min={0}
                        max={250}
                        placeholder="Please add patient height in CM"
                        value={heightCm}
                        onChange={e => setHeightCm(e.target.value)}
                    />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingTextAreaAnamnesis"
                        label="Anamnesis here..."
                    >
                    <Form.Control 
                        required
                        as="textarea"
                        rows={2} 
                        placeholder="Please write the anamnesis here..." 
                        value={anamnesis}
                        onChange={e => setAnamnesis(e.target.value)}
                    />
                    </FloatingLabel>
                </Form.Group>
                <h3 style={{fontWeight: '405'}}>Create Perscription</h3>
                <Form.Group className="mb-3">
                    <FloatingLabel
                    controlId="floatingTextAreaDescription"
                    label="Description here..."
                    >
                    <Form.Control 
                    required
                    as="textarea"
                    placeholder="Please write the description here..." 
                    rows={2} 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                    </FloatingLabel>
                </Form.Group>
                {perscription_drugs.map((key, index) => {
                    return (
                        <div key={index}>
                            <h3 style={{fontWeight: '405'}}>Create Perscription Drug</h3>
                            <Form.Group className="mb-3">
                                <FloatingLabel
                                controlId="floatingTextAreaUsageDescription"
                                label="Description Usage here..."
                                className='mb-3'
                                >
                                <Form.Control 
                                required
                                as="textarea"
                                name="usageDescription"
                                placeholder="Please write the description usage here..." 
                                rows={2}
                                value={key.usageDescription} 
                                onChange={e => handleInputChange(e, index)}
                                />
                                </FloatingLabel>
                                <FloatingLabel
                                controlId="SelectDrugOption"
                                label="Select a drug"
                                className='mb-3'
                                >
                                <Form.Select 
                                value={key.drug_id} 
                                required
                                onChange={e => handleInputChange(e, index)} 
                                className={'mb-3'}
                                name="drug_id"
                                >
                                <option value={"default"} >Choose drug</option>
                                {loading || !drugs ? <option>Loading...</option> : drugs.map( (drug) => (
                                        <option key={drug.id} value={drug.id}>{drug.name}</option> 
                                ))
                                }
                                </Form.Select>
                                </FloatingLabel>
                                {perscription_drugs.length !== 1 && <Button className={'w-auto me-3'}  variant="danger" onClick={() => handleRemoveClick(index)}>-</Button>}
                                {perscription_drugs.length - 1 === index && <Button className={'w-auto'} onClick={handleAddClick}>+</Button>}
                            </Form.Group>
                        </div>
                    )
                })}
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <Button className="button" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
      </>
    );
  }