import React, { Component } from 'react';

class DigitButton extends Component {
  constructor(props) {
    super(props);
    this.props = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={ () => this.props.onClick() }
      >
      {this.props.value}
      </button>
    );
  }
}

class ActionButton extends Component {

  render() {
    return (
      <button
        className="square"
        onClick={ () => this.props.onClick() }
      >
      {this.props.value}
      </button>
    );
  }
}

class CalculatorDisplay extends Component {
  constructor(props) {
    super(props);

    this.props = {
      value: 0,
    };
  }

  render() {
    return (
      <input
        className="calc-display"
        type="text"
        size="15"
        value={this.props.value}
        />
    );
  }
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: '',
      b: '',
      result: '',
      operator: null,
      isNext: false,
    }
  }

  add() {
    this.setState({
      result: parseInt(this.state.a) + parseInt(this.state.b),
    });
  }

  subtract() {
    this.setState({
      result: parseInt(this.state.a) - parseInt(this.state.b),
    });
  }

  divide() {
    this.setState({
      result: parseInt(this.state.a) / parseInt(this.state.b),
    });
  }

  mulitply() {
    this.setState({
      result: parseInt(this.state.a) * parseInt(this.state.b),
    });
  }

  handleDigitButtonClick(i) {
    let numbera = '';
    let numberb = '';

    if( this.state.isNext ) {
      numberb = this.state.b + '' + i;
      this.setState({
        b: numberb,
        result: numberb,
      });
    }
    else {
      numbera = this.state.a + '' + i;
      this.setState({
        a: numbera,
        result: numbera,
      });
    }
  }

  handleActionButtonClick(action) {

    if( action == 'C' ) {
      this.setState({
        a: '',
        b: '',
        result: '',
        isNext: false,
      });
    }
    else if( this.state.isNext ) {
      if( action == '=' || action == '+' || action == '-' || action == '/' || action == '*' ) {
        if( this.state.operator == '+' ) {
          this.add();
        }
        else if( this.state.operator == '-' ) {
          this.subtract();
        }
        else if( this.state.operator == '/' ) {
          this.divide();
        }
        else if( this.state.operator == '*' ) {
          this.mulitply();
        }
        this.setState({
          a: '',
          b: '',
          isNext: false,
        });
      }
    }
    else {
      if( action == '+' && this.state.a != '' ) {
        this.setState({
          operator: '+',
        });
      }
      else if( action == '-' && this.state.a != '' ) {
        this.setState({
          operator: '-',
        });
      }
      else if( action == '/' && this.state.a != '' ) {
        this.setState({
          operator: '/',
        });
      }
      else if( action == '*' && this.state.a != '' ) {
        this.setState({
          operator: '*',
        });
      }
      this.setState({
        isNext: !this.state.isNext,
      });
    }
  }

  renderDigitButton(i) {
    return <DigitButton
      value={i}
      onClick={ () => this.handleDigitButtonClick(i) }
      />;
  }

  renderActionButton(operation) {
      return <ActionButton
        value={operation}
        onClick={ () => this.handleActionButtonClick(operation) }
      />;
  }

  render() {
    return (
      <div className="calculator-wrap">
        <div className="heading"><h2>Calc With React</h2></div>
        <div className="display-wrap">
          <CalculatorDisplay value={this.state.result}/>
        </div>
        <div className="buttons-wrap">
          <div className="button-row">
            {this.renderDigitButton(1)}
            {this.renderDigitButton(2)}
            {this.renderDigitButton(3)}
            {this.renderActionButton('*')}
          </div>
          <div className="button-row">
            {this.renderDigitButton(4)}
            {this.renderDigitButton(5)}
            {this.renderDigitButton(6)}
            {this.renderActionButton('/')}
          </div>
          <div className="button-row">
            {this.renderDigitButton(7)}
            {this.renderDigitButton(8)}
            {this.renderDigitButton(9)}
            {this.renderActionButton('-')}
          </div>
          <div className="button-row">
            {this.renderActionButton('C')}
            {this.renderDigitButton(0)}
            {this.renderActionButton('=')}
            {this.renderActionButton('+')}
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
