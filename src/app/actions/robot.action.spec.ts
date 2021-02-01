import { PLACE_ROBOT, PlaceRobot, RobotActionTypes, Move, Left, Right } from './robot.action';

describe('app/actions/robot', () => {
    const payload = {
        xAxis: 0,
        yAxis: 0,
       direction: 'North',
       onEdge: false
     };
    describe('PlaceRobot', () => {
    it(`it should return action: ${PLACE_ROBOT}`, () => {
    const action = new PlaceRobot(payload);
    expect({...action}).toEqual({
        type: RobotActionTypes.PLACE_ROBOT,
        payload
      });
    });
  });
    describe('Move', () => {
        it(`it should return action: ${Move}`, () => {
        const action = new Move(payload);
        expect({...action}).toEqual({
            type: RobotActionTypes.MOVE,
            payload
        });
        });
    });
    describe('Left', () => {
        it(`it should return action: ${Left}`, () => {
        const action = new Left(payload);
        expect({...action}).toEqual({
            type: RobotActionTypes.LEFT,
            payload
        });
        });
    });
    describe('Right', () => {
        it(`it should return action: ${Right}`, () => {
        const action = new Right(payload);
        expect({...action}).toEqual({
            type: RobotActionTypes.RIGHT,
            payload
        });
        });
    });
});
