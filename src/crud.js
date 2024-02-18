
import { useEffect, useState } from "react"
import { Table, Button } from 'react-bootstrap';
import PopUp from "./popup";

export default function Curd() {
    const [apiData, setApiData] = useState([])
    const [show, setShow] = useState(false);
    const [depvalue, setDepvalue] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = (bca) => {
        console.log(bca, "bca");
        setShow(true);
        setuserData({
            id: bca.id,
            name: bca.name,
            email: bca.email,
            phone: bca.phone,
            location: bca.location,
        })
    }
    const [userData, setuserData] = useState({
        id: null,
        name: null,
        emailId: null,
        phoneNo: null,
        location: null,
    })
    const addUser = () => {
        setShow(true);
        setuserData({
            id: null,
            name: null,
            emailId: null,
            phoneNo: null,
            location: null,
        })
    }


    useEffect(() => {
        fetch('https://659e20e447ae28b0bd3535e4.mockapi.io/apcurd', {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        }).then(res => {

            if (res.ok) {
                return res.json();

            }
            // handle error
        }).then(tasks => {
            setApiData(tasks)
            // Do something with the list of tasks
        }).catch(error => {
            // handle error
        })
    }, [depvalue])
    // console.log(apiData, "ApiData")

    function Delete(xyz) {

        fetch(`https://659e20e447ae28b0bd3535e4.mockapi.io/apcurd/${xyz.id}`, {
            method: 'DELETE',
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(task => {
            // Do something with deleted task
            alert("Delete Successfully 😶‍🌫️ ")
            setDepvalue(!depvalue);
        }).catch(error => {
            // handle error
        })
    }

    return (
        <div className="p-3 text-end ">
            <Button className="px-3 m-3 " variant="warning" onClick={() => addUser()}>ADD NEW USERS</Button>
            <Table striped bordered hover variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th className="fs-3">S.No</th>
                        <th className="fs-3">Name</th>
                        <th className="fs-3">Email</th>
                        <th className="fs-3">Phone.No</th>
                        <th className="fs-3">Location</th>
                        <th className="fs-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {apiData.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td className="p-3">{i + 1}</td>
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.email}</td>
                                <td className="p-3">{item.phone}</td>
                                <td className="p-3">{item.location}</td>
                                <td >
                                    <Button onClick={() => handleShow(item)} className="m-1">Edit</Button>
                                    <Button variant="danger" onClick={() => Delete(item)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <PopUp popupshow={show} close={handleClose} formData={userData} setformData={setuserData} depvalue={depvalue} setDepvalue={setDepvalue} />
        </div>)
}
