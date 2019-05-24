import React from 'react';

// ssreactstrap components
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Table from '../components/Table/Table';
import CandidateForm from '../components/CandidateForm/CandidateForm';
import './frontpage.css'
// import './react-bootstrap-table2.min.css'



class FrontPage extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <Row>
      <Col xs ="3"/>
      <Col xs="6">
      <div className = "card">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '1' })}
            onClick={() => { this.toggle('1'); }}
          >
            Table
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '2' })}
            onClick={() => { this.toggle('2'); }}
          >
            Add Candidate
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
              <Table></Table>
        </TabPane>
        <TabPane tabId="2">
              <CandidateForm></CandidateForm>
        </TabPane>
      </TabContent>
    </div>
    </Col>
    </Row>
    );
  }
}

export default FrontPage;
