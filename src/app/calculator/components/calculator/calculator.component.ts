import { Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CommonModule } from '@angular/common';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CommonModule, CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {
  private _calculatorService = inject(CalculatorService);
  public resultText = computed(() => this._calculatorService.resultText());
  public subResultText = computed(() =>
    this._calculatorService.subResultText()
  );
  public lastOperator = computed(() => this._calculatorService.lastOperator());

  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  handleClick(key: string) {
    this._calculatorService.constructNumber(key);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      Delete: 'C',
      Backspace: 'C',
      '*': 'x',
      '/': '÷',
      Enter: '=',
    };
    this.handleClick(keyEquivalents[key] ?? key);
    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(key);
    });
  }
}
