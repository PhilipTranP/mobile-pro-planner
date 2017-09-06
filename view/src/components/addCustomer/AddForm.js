import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Panel,
  InputGroup
} from 'react-bootstrap';

const AddForm = props => (
  <Panel header="Add Customer" bsStyle="default">
    <form onSubmit={props.onSubmitCustomer}>
      <FormGroup controlId="name">
        <ControlLabel>
          Customer Name
        </ControlLabel>
        <InputGroup>
          <FormControl type="text"
                       onChange={props.onChangeName}
                       value={props.name} />
          <InputGroup.Button>
            <Button type="submit">Add Customer</Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </form>
  </Panel>
);

AddForm.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onSubmitCustomer: PropTypes.func.isRequired
};

export default AddForm;
