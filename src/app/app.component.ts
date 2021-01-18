import { Component, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('roboto', { static: false })
  public roboto!: ElementRef;
  @ViewChild('reportLog')
  reportLog!: ElementRef;
  @ViewChild('xAxis', { static: false })
  public xAxis!: ElementRef;
  @ViewChild('yAxis', { static: false })
  public yAxis!: ElementRef;
  @ViewChild('direction')
  direct!: ElementRef;
  // Declare the globals

  direction = '';
  yPos = 0;
  xPos = 0;

  // Set robot element CSS according to the input values
  placeRobot(this: any) {
    this.xPos = parseInt(this.xAxis.nativeElement.value, 10);
    this.yPos = parseInt(this.yAxis.nativeElement.value, 10);
    this.direction = this.direct.nativeElement.value;

    this.roboto.nativeElement.style.display = 'block';
    this.roboto.nativeElement.style.left = this.xPos + '%';
    this.roboto.nativeElement.style.top = this.yPos + '%';
    this.roboto.nativeElement.className = this.direction;
    this.report();
  }

  // Move robot in its current facing direction
  move() {
    if (this.checkBoard()) {
      if (this.direction === 'North') {
        if (this.yPos > 0) {
          this.yPos -= 20;
          this.roboto.nativeElement.style.top = this.yPos + '%';
        }

      } else if (this.direction === 'South') {
        if (this.yPos < 80) {
          this.yPos += 20;
          this.roboto.nativeElement.style.top = this.yPos + '%';

        }
      } else if (this.direction === 'East') {
        if (this.xPos < 80) {
          this.xPos += 20;
          this.roboto.nativeElement.style.left = this.xPos + '%';


        }
      } else if (this.direction === 'West') {
        if (this.xPos > 0) {
          this.xPos -= 20;
          this.roboto.nativeElement.style.left = this.xPos + '%';
        }
      }
      // tslint:disable-next-line: max-line-length
      if ((this.xPos === 80 && this.direction === 'East') || (this.yPos === 80 && this.direction === 'South') || (this.xPos === 0 && this.direction === 'West') || (this.yPos === 0 && this.direction === 'North')) {
        console.log('Change direction!');
        this.roboto.nativeElement.classList.add('edge');

        // tslint:disable-next-line: max-line-length
      } else if ((this.xPos !== 80 && this.direction === 'East') || (this.yPos !== 80 && this.direction !== 'South') || (this.xPos !== 0 && this.direction !== 'West') || (this.yPos !== 0 && this.direction !== 'North')) {
        this.roboto.nativeElement.classList.remove('edge');

      }
      if (this.reportLog.nativeElement.style.visibility === 'visible') {
        this.reportLog.nativeElement.innerHTML = `PLACE  ${this.xPos}, ${this.yPos}, ${this.direction}`;
      }
    } else {
      console.log('Robot has left the board');
    }
    this.report();

  }

  // turn to the left
  turnLeft() {
    if (this.checkBoard()) {
      if (this.direction === 'North') {
        this.direction = 'West';
      } else if (this.direction === 'West') {
        this.direction = 'South';
      } else if (this.direction === 'South') {
        this.direction = 'East';
      } else if (this.direction === 'East') {
        this.direction = 'North';
      }
      this.roboto.nativeElement.className = this.direction;
    } else {
      console.log('Robot has left the board');
    }
    this.report();
  }

  // turn to the right
  turnRight() {
    if (this.checkBoard()) {
      if (this.direction === 'North') {
        this.direction = 'East';
      } else if (this.direction === 'West') {
        this.direction = 'North';
      } else if (this.direction === 'South') {
        this.direction = 'West';
      } else if (this.direction === 'East') {
        this.direction = 'South';
      }
      // Applyinng new this.direction
      this.roboto.nativeElement.className = this.direction;
    } else {
      console.log('Robot has left the board');
    }
    this.report();
  }

  // updating position co-ordinates and this.direction
  report(this: any) {
    if (this.xPos !== undefined && this.yPos !== undefined) {
      const xRealPos = (this.xPos / 2) / 10;
      const yRealPos = (((100 - this.yPos) / 2) / 10) - 1;
      this.reportLog.nativeElement.innerHTML = `PLACE  ${xRealPos}, ${yRealPos}, ${this.direction}`;
    }
  }

  // check robot is inside table
  checkBoard() {
    const dir = ['North', 'West', 'East', 'South'];

    if (!dir.includes(this.direction) || this.xPos < 0 || this.xPos > 80 || this.yPos < 0 || this.yPos > 80) {
      return false;
    }
    return true;
  }
}
