
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function PopUp(props) {

    const saveChanges = () => {
        props.close();
        fetch(`https://659e20e447ae28b0bd3535e4.mockapi.io/apcurd/${props.formData.id}`, {
            method: 'PUT', // or PATCH
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(props.formData)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(task => {
            // Do something with updated task
            alert("Edit Succussfully 😁👍")
            props.setDepvalue(!props.depvalue)
        }).catch(error => {
            // handle error
        })
    }

    const addUser = () => {
        if (props.formData.name != null && props.formData.email != null && props.formData.phone != null && props.formData.location != null) {
            fetch('https://659e20e447ae28b0bd3535e4.mockapi.io/apcurd', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                // Send your data in the request body as JSON
                body: JSON.stringify(props.formData)
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                // handle error
            }).then(task => {
                // do something with the new task
                alert("Add user Succussfully 😁👍")
                props.setDepvalue(!props.depvalue)
            }).catch(error => {
                // handle error
            })
            props.close();
        } else {
            alert("Please fill all box 👨‍💻👽")
        }
    }


    return (
        <>
            <Modal show={props.popupshow} onHide={props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your Name..."
                                defaultValue={props.formData.name}
                                onChange={(e) => props.setformData({ ...props.formData, name: e.target.value })}
                                autoFocus
                            />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                defaultValue={props.formData.email}
                                onChange={(e) => props.setformData({ ...props.formData, email: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Phone.no</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter your phone number..."
                                defaultValue={props.formData.phone}
                                onChange={(e) => props.setformData({ ...props.formData, phone: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your Location..."
                                defaultValue={props.formData.location}
                                onChange={(e) => props.setformData({ ...props.formData, location: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.close}>
                        Close
                    </Button>
                    {props.formData.id == null ? <Button variant='success' onClick={addUser}> Add User</Button> : <Button variant="primary" onClick={saveChanges}>
                        Save Changes
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default PopUp;