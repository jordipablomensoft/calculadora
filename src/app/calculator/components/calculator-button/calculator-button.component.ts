import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostBinding,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-1/4]': '!isDoubleSize()',
    '[class.w-2/4]': 'isDoubleSize()',
  },
})
export class CalculatorButtonComponent {
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public isPressed = signal(false);

  public isCommand = input(false, {
    transform: (value) => (typeof value === 'string' ? value === '' : value),
  });

  public isDoubleSize = input(false, {
    transform: (value) => (typeof value === 'string' ? value === '' : value),
  });

  handleClick() {
    let text = this.contentValue()?.nativeElement;
    if (!text) {
      return;
    }
    this.onClick.emit(text!.innerText.trim());
  }

  public keyboardPressedStyle(key: string) {
    if (!this.contentValue()) return;
    const value = this.contentValue()!.nativeElement.innerText;
    if (value === key) return;
    this.isPressed.set(true);
    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
