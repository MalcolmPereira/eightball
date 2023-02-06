import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

import StatementForm from './StatementForm';

import Ball from './Ball';
import Container from 'react-bootstrap/esm/Container';

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/magic8/predict";

export default class Prediction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statement: '',
            result: '',
            processing: false,
            shaking: false,
            iserror: false,
            error: '',
        };
        this.handleStatement = this.handleStatement.bind(this);
        this.handleShake = this.handleShake.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    handleStatement(statementValue) {
        this.setState({ statement: statementValue });
    }

    handleShake() {
        if (this.state.statement && this.state.statement.length >= 10) {
            document.getElementById("magic8").className = "cirlce shake-hard";
            this.setState({ shaking: true });
        }
    }

    handleSubmit() {
        if (this.state.shaking) {

            document.getElementById("magic8").className = "cirlce";
            document.getElementById("ballloader").className = "ballloader";

            this.fetchData().then((data) => {
                this.ballRef.setResult(data.result, data.outcome);
            }).catch((error) => {
                this.setState({ iserror: true, error: "Error invoking magic8 ball prediction service, Service not available." })
                console.log('Error processing prediction request: ' + error);
            });
            this.statementRef.resetStatement();
            this.setState({ shaking: false, statement: '', processing: false });
            document.getElementById("ballloader").className = "";

        } else {
            this.ballRef.resetResult();
            this.setState({ iserror: false, error: "" })
        }
    }

    async fetchData() {
        console.log("apiURL is ", API_URL);
        const response = await axios.post(API_URL, { statement: this.state.statement })
        return response.data;
    }

    render() {
        return (
            <Container fluid>
                <Container className="p-1">
                    <Alert show={this.state.iserror} variant="danger"><p>{this.state.error}</p></Alert>
                </Container>
                <Container>
                    <StatementForm ref={statementRef => this.statementRef = statementRef} setStatementValue={this.handleStatement}></StatementForm>
                    <Ball ref={ballRef => this.ballRef = ballRef} onShake={this.handleShake} onSubmit={this.handleSubmit}></Ball>
                </Container>
            </Container>
        );

    }
}