import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'calculadora' title`, () => {
    expect(app.title).toEqual('calculadora');
  });

  it('should render router-outlet', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render css class', () => {
    const divElement = compiled.querySelector('div');
    fixture.detectChanges();
    const cssClasses =
      'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(
        ' '
      );
    expect(divElement).not.toBeNull();
    divElement?.classList.forEach((className) => {
      expect(cssClasses).toContain(className);
    });
  });
});
