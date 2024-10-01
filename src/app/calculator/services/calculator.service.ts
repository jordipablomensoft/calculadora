import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/', '÷', 'x'];
const specialOperators = ['%', '+/-', '.', '=', 'C', 'Backspace'];

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value: string) {
    console.log({ value });

    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      return;
    }

    if (value === '=') {
      this.calculateResult();
      return;
    }

    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    if (value === 'Backspace') {
      if (this.resultText() === '0') return;
      if (this.resultText().includes('-') && this.resultText().length === 2) {
        this.resultText.set('0');
        return;
      }
      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }
      this.resultText.update((v) => v.slice(0, -1));
      return;
    }

    if (operators.includes(value)) {
      this.calculateResult();
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    if (this.resultText().length >= 10) {
      return;
    }

    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }
      this.resultText.update((text) => text + '.');
      return;
    }

    if (
      value === '0' &&
      (this.resultText() === '0' || this.resultText() == '-0')
    ) {
      return;
    }

    if (value == '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update((text) => text.slice(1));
        return;
      }
      this.resultText.update((text) => '-' + text);
      return;
    }

    if (numbers.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }
      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return;
      }
      this.resultText.update((text) => text + value);
      return;
    }
  }

  public calculateResult() {
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());
    let result: { [key: string]: number } = {
      '+': number1 + number2,
      '-': number1 - number2,
      x: number1 * number2,
      '÷': number1 / number2,
      '*': number1 * number2,
      '/': number1 / number2,
    };
    this.resultText.set(result[this.lastOperator()].toString());
    this.subResultText.set('0');
  }
}
