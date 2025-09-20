import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Nav } from "react-bootstrap";
import SearchBar from "./searchbar";
import axios from "axios";

export default function AddEmployeeForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:5000/users", formData);
    console.log("User Added:", response.data);

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
     
    });

    alert("Employee added successfully!");
  } catch (err) {
    console.error("Error adding employee:", err);
    alert("Failed to add employee");
  }
};

  return (
    <Container fluid className="bg-light min-vh-100">
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-white shadow-sm p-3">
          <div className="text-center mb-4">
            <img
              src="../person-circle.svg"
              alt="profile"
              className="rounded-circle mb-2"
            />
            <h6>Steven</h6>
          </div>
          <Nav defaultActiveKey="/employees" className="flex-column">
            <Nav.Link href="#">Dashboard</Nav.Link>
            <Nav.Link href="#">Inbox</Nav.Link>
            <Nav.Link href="#" active>
              Employees
            </Nav.Link>
            <Nav.Link href="#">Settings</Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}

        <Col md={10} className="p-4">
          <div className="search-bar mb-4">
            <SearchBar />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Add New Employee</h4>
            <Button variant="primary">Add Employee</Button>
          </div>

          <Card className="p-4 shadow-sm">
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter First Name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter Last Name"
                    />
                  </Form.Group>
                </Col>
              </Row>

        
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Work Email"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Phone Number"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
               
                
              </Row>

              <div className="d-flex gap-3">
                <Button type="submit" variant="primary">
                  Save
                </Button>
                <Button variant="success">Save & Add Another</Button>
                <Button variant="danger">Cancel</Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

