import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';

export default function NewExamination() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const APIurl = 'http://10.5.7.57:3001';
    const [loading, setLoading] = useState(true);
    //Examination input
    const [weightKg, setWeightKg] = useState();
    const [heightCm, setHeightCm] = useState();
    const [anamnesis, setAnamnesis] = useState();
    //Perscription_attributes input
    const [description, setDescription] = useState();
    //Perscription_drugs_attributes input
    const [drug_id, setDrug_id] = useState(); 
    const [usageDescription, setUsageDescription] = useState();
    //GET drugs
    const [drugs, setDrugs] = useState();
    //RenderDrugs
    function RenderDrugs(props) {
        return (
            props.drugs.map( (drug) => (
                <option>{drug.name}</option>
            ))
        )
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
          <Modal.Header closeButton>
            <Modal.Title>Create Examination</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
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
                />
                </FloatingLabel>
            </Form.Group>
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
                placeholder="Please write the description usage here..." 
                rows={2} 
                />
                </FloatingLabel>
                <Form.Select>
                {loading || !drugs ? 
                    <div><h2>loading...</h2></div> : <RenderDrugs drugs={drugs}/> } 
                </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
            <Button className="button" variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary">Submit</Button>
        </Modal.Footer>
        </Modal>
      </>
    );
  }