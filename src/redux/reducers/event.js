import {
  fromJS
} from 'immutable';
import {
  Step,
  NEXT_STEP,
  PREVIOUS_STEP,
  CALENDAR_SELECT_DATE,
} from '../../constants';

const initialState = fromJS({
  title: '',
  description: '',
  location: '',
  creating: {
    title: '',
    description: '',
    location: '',
    step: Step.Step1,
    selected: []
  }
});

function creatingReducer(state = initialState.get('creating'), action) {
  switch (action.type) {
    case NEXT_STEP:
      return state.set('step', state.get('step') + 1);
    case PREVIOUS_STEP:
      return state.set('step', state.get('step') - 1);
    case CALENDAR_SELECT_DATE:
      return state.set('selected', action.payload.selected);
    default:
      return state;
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NEXT_STEP:
    case PREVIOUS_STEP:
    case CALENDAR_SELECT_DATE: {
      return state.set('creating', creatingReducer(state.get('creating'), action));
    }
    default:
      return state;
  }
}
