import {
  fromJS
} from 'immutable';
import {
  Step,
  CREATION_NEXT_STEP,
  CREATION_PREVIOUS_STEP,
  CREATION_CALENDAR_SELECT_DATE,
  CREATION_CHANGE_TITLE,
  CREATION_CHANGE_DESCRIPTION,
  CREATION_CHANGE_LOCATION,
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
    case CREATION_NEXT_STEP:
      return state.set('step', state.get('step') + 1);
    case CREATION_PREVIOUS_STEP:
      return state.set('step', state.get('step') - 1);
    case CREATION_CALENDAR_SELECT_DATE:
      return state.set('selected', action.payload.selected);
    case CREATION_CHANGE_TITLE:
      return state.set('title', action.payload.value);
    case CREATION_CHANGE_DESCRIPTION:
      return state.set('description', action.payload.value);
    case CREATION_CHANGE_LOCATION:
      return state.set('location', action.payload.value);
    default:
      return state;
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATION_NEXT_STEP:
    case CREATION_PREVIOUS_STEP:
    case CREATION_CALENDAR_SELECT_DATE:
    case CREATION_CHANGE_TITLE:
    case CREATION_CHANGE_DESCRIPTION:
    case CREATION_CHANGE_LOCATION: {
      return state.set('creating', creatingReducer(state.get('creating'), action));
    }
    default:
      return state;
  }
}
