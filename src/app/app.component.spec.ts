import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { MetaReducer, Store, StoreModule } from '@ngrx/store';
import { getPosition, reducers } from './reducers';
import { localStorageSyncReducer } from './app.module';
import { of } from 'rxjs';
import { RobotState } from './reducers/robot';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const metaReducers: MetaReducer<any, any>[] = [localStorageSyncReducer];
  const positionMock = {
        xAxis: 0,
        yAxis: 0,
        direction: '',
        onEdge: false,
  };

  class PositionMock {
    select() {
      return jasmine.createSpy().and.returnValue(of(getPosition));
    }
    dispatch() {
      return jasmine.createSpy().and.callFake(() => positionMock);
    }
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers, {
        metaReducers,
      }), ],
      declarations: [AppComponent],
      providers: [
        {
            provide: Store,
            useClass: PositionMock,
          },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.getPosition$ = of(positionMock) as any;
    fixture.detectChanges();
  });

  it('should create App component', () => {
    expect(component).toBeTruthy();
  });

  it('should call NgAfter view init', () => {
    component.ngAfterViewInit();
    expect(component.direction).toEqual(positionMock.direction);
    expect(component.xPos).toEqual(positionMock.xAxis);
    expect(component.yPos).toEqual(positionMock.yAxis);
  });

  it('should place robot', () => {
    spyOn(component, 'placeRobot');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.placeRobot).toHaveBeenCalled();
  });

  it('should move', () => {
    spyOn(component, 'move');
    const button = fixture.debugElement.query(By.css('.move'));
    button.triggerEventHandler('click', null);
    expect(component.move).toHaveBeenCalled();
  });

  it('should turn right', () => {
    spyOn(component, 'turnRight');
    const button = fixture.debugElement.query(By.css('.right'));
    button.triggerEventHandler('click', null);
    expect(component.turnRight).toHaveBeenCalled();
  });

  it('should turnLeft', () => {
    spyOn(component, 'turnLeft');
    const button = fixture.debugElement.query(By.css('.left'));
    button.triggerEventHandler('click', null);
    expect(component.turnLeft).toHaveBeenCalled();
  });

  it('should check Board : On Edge', () => {
     component.direction = 'North';
     component.yPos = 0;
     component.xPos = 80;
     const result = component.checkBoard();
     expect(result).toBeTruthy();
  });

  it('should check Board : Not on Edge', () => {
    component.direction = 'North';
    component.yPos = 80;
    component.xPos = 0;
    const result = component.checkBoard();
    expect(result).toBeFalsy();
 });

});
