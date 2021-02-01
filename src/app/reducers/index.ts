import { createFeatureSelector } from '@ngrx/store';
import { robotReducer, RobotState } from './robot';

export interface State {
robotState: RobotState;
}

export const reducers = {
  robotState: robotReducer,
};

export const getPosition = createFeatureSelector<RobotState>('robotState');
