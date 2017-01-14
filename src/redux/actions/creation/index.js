import {
  NEXT_STEP,
  PREVIOUS_STEP,
} from '../../../constants';

export function nextStep() {
  return {
    type: NEXT_STEP
  };
}

export function previousStep() {
  return {
    type: PREVIOUS_STEP
  };
}
