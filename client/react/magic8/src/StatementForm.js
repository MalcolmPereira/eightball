import React from 'react';
import Container from 'react-bootstrap/Container';

import Form from 'react-bootstrap/Form';

export default class StatementForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            statement: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.resetStatement = this.resetStatement.bind(this);
    }

    handleChange(event) {
        this.setState({
            statement: event.target.value,
        });
        this.props.setStatementValue(event.target.value);
    }

    resetStatement() {
        this.setState({
            statement: '',
        });
    }

    render() {
        return (
            <Container fluid="true">
                <Form>
                    <Form.Group controlId="statement">
                        <Form.Control type="text" value={this.state.statement} onChange={this.handleChange} placeholder="Ask what you may....shake magic 8 ball...get your prediction..." minLength="10" maxLength="150" required />
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}

