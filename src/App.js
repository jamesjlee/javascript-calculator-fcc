import React, { Component } from "react";
import logo from "./logo.svg";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import "./styles/JavaScriptCalculator.css";

class App extends Component {
  state = {
    display: 0,
    currValue: 0,
    firstValue: 0,
    result: 0,
    operationEntered: false,
    operation: null,
    hasDecimal: false,
    equalsPressed: false
  };

  handleNumber = (e) => {
    if (this.state.display === 0 && e.target.innerHTML === "0") {
      return;
    }

    if (this.state.display.toString().indexOf(".") > -1) {
      this.setState({
        hasDecimal: true
      });
    } else {
      this.setState({
        hasDecimal: false
      });
    }

    this.state.display === 0
      ? this.setState({
          display: e.target.innerHTML,
          firstValue: e.target.innerHTML
        })
      : this.setState({
          display:
            this.state.display.toString().replace(/^0+/, "") +
            "" +
            e.target.innerHTML
        });

    if (this.state.operationEntered) {
      if (this.state.result !== 0) {
        if (this.state.operation === "+") {
          this.setState({
            result: (
              parseInt(this.state.result) + parseInt(e.target.innerHTML)
            ).toString()
          });
        } else if (this.state.operation === "-") {
          this.setState({
            result: (
              parseInt(this.state.result) - parseInt(e.target.innerHTML)
            ).toString()
          });
        } else if (this.state.operation === "*") {
          this.setState({
            result: (
              parseInt(this.state.result) * parseInt(e.target.innerHTML)
            ).toString()
          });
        } else if (this.state.operation === "/") {
          this.setState({
            result: (
              parseInt(this.state.result) / parseInt(e.target.innerHTML)
            ).toString()
          });
        }
      } else {
        if (this.state.operation === "+") {
          this.setState({
            result: (
              parseInt(this.state.firstValue) + parseInt(e.target.innerHTML)
            ).toString()
          });
        } else if (this.state.operation === "-") {
          this.setState({
            result: (
              parseInt(this.state.firstValue) - parseInt(e.target.innerHTML)
            ).toString()
          });
        } else if (this.state.operation === "*") {
          this.setState({
            result: (
              parseInt(this.state.firstValue) * parseInt(e.target.innerHTML)
            ).toString()
          });
        } else if (this.state.operation === "/") {
          this.setState({
            result: (
              parseInt(this.state.firstValue) / parseInt(e.target.innerHTML)
            ).toString()
          });
        }
      }
    }
    this.state.hasDecimal
      ? this.setState({
          currValue:
            this.state.display.toString().split(/([-+*/])/g).length > 1
              ? this.state.display.toString().split(/([-+*/])/g)[
                  this.state.display.toString().split(/([-+*/])/g).length - 1
                ]
              : this.state.display + "" + e.target.innerHTML,
          operationEntered: false
        })
      : this.setState({
          currValue: e.target.innerHTML,
          operationEntered: false
        });
  };

  handleOperation = (e) => {
    if (
      e.target.innerHTML === "." &&
      this.state.display[this.state.display.length - 1] === "."
    ) {
      return;
    }

    if (e.target.innerHTML === "." && /\d{1,}\.\d$/.test(this.state.display)) {
      return;
    }

    switch (e.target.innerHTML) {
      case "+":
        this.setState({
          display: this.state.display + "" + e.target.innerHTML,
          currValue: e.target.innerHTML,
          operationEntered: true,
          operation: "+"
        });
        break;
      case "-":
        this.setState({
          display: this.state.display + "" + e.target.innerHTML,
          currValue: e.target.innerHTML,
          operationEntered: true,
          operation: "-"
        });
        break;
      case "*":
        this.setState({
          display: this.state.display + "" + e.target.innerHTML,
          currValue: e.target.innerHTML,
          operationEntered: true,
          operation: "*"
        });
        break;
      case "/":
        this.setState({
          display: this.state.display + "" + e.target.innerHTML,
          currValue: e.target.innerHTML,
          operationEntered: true,
          operation: "/"
        });
        break;
      case "AC":
        this.setState({
          display: 0,
          currValue: 0,
          result: 0
        });
        break;
      case "=":
        if (this.state.hasDecimal) {
          this.setState({
            display:
              this.state.display + "=" + eval(this.state.display.toString()),
            currValue: this.state.result
          });
        } else {
          this.setState({
            display: this.state.display + "=" + this.state.result,
            currValue: this.state.result,
            operationEntered: false,
            equalsPressed: true
          });
        }
        break;
      case ".":
        this.setState({
          display: this.state.display + "" + e.target.innerHTML,
          currValue: e.target.innerHTML,
          operationEntered: false,
          hasDecimal: true
        });
      default:
        break;
    }
  };

  render() {
    return (
      <Container id="javascript-calculator" className="CalculatorContainer">
        <Row className="CalculatorFirstRow">
          <Col xs="auto" className="CalculatorCol">
            <div id="first-row">
              <div id="history-display" className="formula">
                {this.state.display}
              </div>
              <div id="display" className="output">
                {this.state.equalsPressed
                  ? this.state.display.toString().split("=")[
                      this.state.display.toString().split("=").length - 1
                    ]
                  : this.state.display}
              </div>
            </div>
          </Col>
        </Row>
        <Row className="CalculatorSecondRow">
          <Col xs="auto" className="CalculatorCol">
            <div id="second-row">
              <ButtonGroup>
                <Button id="clear" onClick={(e) => this.handleOperation(e)}>
                  AC
                </Button>
                <Button id="divide" onClick={(e) => this.handleOperation(e)}>
                  /
                </Button>
                <Button id="multiply" onClick={(e) => this.handleOperation(e)}>
                  *
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>
        <Row className="CalculatorThirdRow">
          <Col xs="auto" className="CalculatorCol">
            <div id="third-row">
              <ButtonGroup>
                <Button id="seven" onClick={(e) => this.handleNumber(e)}>
                  7
                </Button>
                <Button id="eight" onClick={(e) => this.handleNumber(e)}>
                  8
                </Button>
                <Button id="nine" onClick={(e) => this.handleNumber(e)}>
                  9
                </Button>
                <Button id="subtract" onClick={(e) => this.handleOperation(e)}>
                  -
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>
        <Row className="CalculatorFourthRow">
          <Col xs="auto" className="CalculatorCol">
            <div id="fourth-row">
              <ButtonGroup>
                <Button id="four" onClick={(e) => this.handleNumber(e)}>
                  4
                </Button>
                <Button id="five" onClick={(e) => this.handleNumber(e)}>
                  5
                </Button>
                <Button id="six" onClick={(e) => this.handleNumber(e)}>
                  6
                </Button>
                <Button id="add" onClick={(e) => this.handleOperation(e)}>
                  +
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>
        <Row className="CalculatorFifthRow">
          <Col xs="auto" className="CalculatorCol">
            <div id="fifth-row">
              <ButtonGroup>
                <Button id="one" onClick={(e) => this.handleNumber(e)}>
                  1
                </Button>
                <Button id="two" onClick={(e) => this.handleNumber(e)}>
                  2
                </Button>
                <Button id="three" onClick={(e) => this.handleNumber(e)}>
                  3
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>
        <Row className="CalculatorSixthRow">
          <Col xs="auto" className="CalculatorCol">
            <div id="sixth-row">
              <ButtonGroup>
                <Button id="zero" onClick={(e) => this.handleNumber(e)}>
                  0
                </Button>
                <Button id="decimal" onClick={(e) => this.handleOperation(e)}>
                  .
                </Button>
                <Button id="equals" onClick={(e) => this.handleOperation(e)}>
                  =
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
