import React from 'react';
import { Container,Row, Col, Badge, Button, FormText} from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import {Link} from 'react-router-dom'
import './table.css'


const dateOption = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const columns = [{
    dataField: 'id',
    text: 'Candidate ID',
    sort: true
  }, {
    dataField: 'firstName',
    text: 'First Name',
    sort: true,
  }, {
    dataField: 'lastName',
    text: 'Last Name',
    sort: true,
  },
  {
    dataField: 'contactedAt',
    text: 'Contacted At'
  },
  {
    dataField: 'interviewedAt',
    text: 'Interviewed At'
  },
];


const expandRow = {
  renderer: row => (
    <Container>
      <Row>
      <Col xs="6" >
            <h5>Companies:</h5> 
              {row.companies.map((object, i) => {
                console.log(object);
                return  <Badge color="warning" pill style={{fontSize: 16, margin:5}}>{`${object.name}`}</Badge> 
              }
              )}
            <h5>Technologies:</h5> 
              {row.technologies.map((object, i) => {
                console.log(object);
                return  <Badge color="info" pill style={{fontSize: 16, margin:5}}>{`${object.name}`}</Badge> 
              }
              )}
              <h5>Resume link:</h5> 
              {`${row.resumeLink}`}
        </Col>
        <Col xs="6" >
        <h5>Feedback:</h5> 
        <FormText color="muted" className = "text">
            {`${row.feedbackAtContact}`}
          </FormText>
          <Badge color="danger" pill style={{fontSize: 20, margin:10}}>{`${row.feedback}`}</Badge> 
        </Col>
      </Row>
    </Container>
  )
};

const downloadXsl = () => {
  fetch('http://localhost:1337/api/candidate/getXls');

  
}


class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates:[],
      technologies: [],
      companies : []
    }
  }
  
  componentWillMount() {
    fetch('http://localhost:1337/api/candidate/')
    .then(res => res.json())
    .then((data)=>{
      let allCandidates = [];
      data.forEach(element => {
        allCandidates.push({
          id : element.id,
          firstName: element.firstName,
          lastName: element.lastName,
          contactedAt : new Date(element.contactedAt).toLocaleDateString("en-US", dateOption),
          interviewedAt : new Date(element.interviewedAt).toLocaleDateString("en-US", dateOption),
          companies: element.companies,
          technologies: element.technologies,
          resumeLink: element.resumeLink,
          feedback : element.feedback,
          feedbackAtContact : element.feedbackAtContact
        });
      });
      this.setState({ candidates: allCandidates });
    })
    
  }
  

  render() {
    return (

            <div className = "table_card">
                <ToolkitProvider
                           keyField='id' 
                           data={ this.state.candidates }
                           columns={ columns } 
                           bootstrap4 ={true}  
                           expandRow={ expandRow }
                           pagination={ paginationFactory() }
                           exportCSV={ {
                            fileName: 'custom.csv',
                            exportAll: true
                          }}
                           >
                 {
                   props => (
                     <div>
                        <BootstrapTable { ...props.baseProps } 
                           bootstrap4 ={true}  
                           expandRow={ expandRow }
                           pagination={ paginationFactory() }
                          ></BootstrapTable>
                           <hr />
                     </div>
                   )
                 }
              </ToolkitProvider>
            <Button color="success"  href = "http://localhost:1337/api/candidate/getXls">Export Xls</Button>{' '}
            </div>

    );
  }
}

export default Table;
