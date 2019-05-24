import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';
import './candidate.css'

class CandidateForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const jsonData = {
      "firstName": data.get('firstName'),
      "lastName": data.get('lastName'),
      "resumeLink": data.get('resumeLink'),
      "contactedAt":data.get('contactedAt'),
      "interviewedAt":data.get('interviewedAt'),
      "feedbackAtContact": data.get('feedback'),
      "feedback": data.get('fb'),
      "companies":data.getAll('companies'),
      "technologies": data.getAll('technologies')
  }
  if(jsonData.firstName!== null)
  fetch('http://localhost:1337/api/candidate/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json()); 
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <Form className = "form_card" >
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input type="text" name="firstName" id="firstName" placeholder="First Name" />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input type="text" name="lastName" id="lastName" placeholder="Last Name" />
        </FormGroup>
        <FormGroup>
          <Label for="resumeLink">ResumeLink</Label>
          <Input type="text" name="resumeLink" id="resumeLink" placeholder="resume link...." />
        </FormGroup>
        <FormGroup>
          <Label for="contactedAt">Contacted At</Label>
          <Input type="date" name="contactedAt" id="contactedAt"/>
        </FormGroup>
        <FormGroup>
          <Label for="interviewedAt">Interviewed At</Label>
          <Input type="date" name="interviewedAt" id="interviewedAt"  />
        </FormGroup>

        <FormGroup>
          <Label for="companies">Companies</Label>
          <Input type="select" name="companies" id="companies" multiple>
            <option>Google</option>
            <option>Adobe</option>
            <option>Twinnings</option>
            <option>Microsoft</option>
            <option>Ubisoft</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="technologies">Technologies</Label>
          <Input type="select" name="technologies" id="technologies" multiple>
            <option>NodeJs</option>
            <option>ReactJs</option>
            <option>Mysql</option>
            <option>Bootstrap</option>
            <option>JavaScript</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="feedback">Feedback</Label>
          <Input type="textarea" name="feedback" id="feedback" />
        </FormGroup>
        <FormGroup>
          <Label for="fb">Feedback by:</Label>
          <Input type="select" name="fb" id="fb">
            <option>HR</option>
            <option>Management</option>
            <option>Technic</option>
          </Input>
        </FormGroup>
        <Button type = "submit">Submit</Button>
      </Form>
      </form>

    );
  }
}

export default CandidateForm;
