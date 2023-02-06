import React from 'react';
import Container from 'react-bootstrap/Container';
import './Ball.css';

export default class Ball extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            result: 'Ask and shake magic8 ball',
        };
        this.doShake = this.doShake.bind(this);
        this.doSubmit = this.doSubmit.bind(this);
        this.resetResult = this.resetResult.bind(this);
        this.setResult = this.setResult.bind(this);
    }

    resetResult() {
        this.setState({
            result: 'Ask and shake magic8 ball',
        });
        document.getElementById("polygon").style.background = "linear-gradient(#9275c4, #360492)";
    }

    setResult(resultValue, outcomeValue) {
        this.setState({
            result: resultValue,
        });
        if (outcomeValue === 1) {
            document.getElementById("polygon").style.background = "linear-gradient(#8ae832, #065235 )";
        } else if (outcomeValue === 0) {
            document.getElementById("polygon").style.background = "linear-gradient(#e34848, #f41505)";
        } else if (outcomeValue === -1) {
            document.getElementById("polygon").style.background = "linear-gradient(#71e8d6, #10c4e4)";
        } else {
            document.getElementById("polygon").style.background = "linear-gradient(#9275c4, #360492)";
        }
    }

    doShake() {
        this.props.onShake();
    }

    doSubmit() {
        this.props.onSubmit();
    }

    render() {
        return (
            <Container fluid="true">
                <div id="ballloader"></div>
                <div id="magic8" className="cirlce">
                    <div className="innerpad"></div>
                    <div className="circleinner" onMouseEnter={this.doShake} onMouseLeave={this.doSubmit}>8</div>
                    <div className="itempad"></div>
                    <div id="polygon" className="polygon">
                        <section>
                            <span id="resultText">{this.state.result}</span>
                        </section>
                    </div>
                </div>
            </Container>
        );
    }
}