
import { Left, LEFT, Move, MOVE, PlaceRobot, PLACE_ROBOT, Right, RIGHT, RobotActions } from '../actions/robot.action';
import { robotReducer, RobotState } from './robot';

const payload = {
    xAxis: 0,
    yAxis: 0,
   direction: 'North',
   onEdge: false
 };

describe('Robot Reducer', () => {
  describe(`on ${PlaceRobot}`, () => {
    it('should place Robot', () => {
      const result = robotReducer(
        payload,
        new PlaceRobot(payload),
      );

      expect(result).toEqual(payload);
    });
  });

  describe(`on ${Move}`, () => {
    it('should move Robot', () => {
      const result = robotReducer(
        payload,
        new Move(payload),
      );

      const moved = {
        xAxis: 0,
        yAxis: 0,
       direction: 'North',
       onEdge: false
     };

      expect(result).toEqual(moved);
    });
  });

  describe(`on ${Left}`, () => {
    it('should turn left', () => {
      const result = robotReducer(
        payload,
        new Left(payload),
      );

      const left = {
        xAxis: 0,
        yAxis: 0,
       direction: 'West',
       onEdge: false
     };

      expect(result).toEqual(left);
    });
  });

  describe(`on ${Right}`, () => {
    it('should turn left', () => {
      const result = robotReducer(
        payload,
        new Right(payload),
      );

      const right = {
        xAxis: 0,
        yAxis: 0,
       direction: 'East',
       onEdge: false
     };

      expect(result).toEqual(right);
    });
  });

});
