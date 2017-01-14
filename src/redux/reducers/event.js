import {
  fromJS
} from 'immutable';
import {
  Step,
  NEXT_STEP,
  PREVIOUS_STEP,
} from '../../constants';

const initialState = fromJS({
  title: '',
  description: '',
  location: '',
  creating: {
    step: Step.Step1
  }
});

function creatingReducer(state = initialState.get('creating'), action) {
  switch (action.type) {
    case NEXT_STEP:
      return state.set('step', state.get('step') + 1);
    case PREVIOUS_STEP:
      return state.set('step', state.get('step') - 1);
    default:
      return state;
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NEXT_STEP:
    case PREVIOUS_STEP: {
      return state.set('creating', creatingReducer(state.get('creating'), action));
    }
    default:
      return state;
  }
}
