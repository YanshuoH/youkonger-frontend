import { fromJS } from 'immutable';
import {
  Step,
  CREATION_NEXT_STEP,
  CREATION_PREVIOUS_STEP,
  CREATION_CALENDAR_SELECT_DATE,
  CREATION_CHANGE_TITLE,
  CREATION_CHANGE_DESCRIPTION,
  CREATION_CHANGE_LOCATION,
  CREATION_STEP1_TITLE_ERROR,
  CREATION_EVENT_UPSERT_REQUEST,
  CREATION_EVENT_UPSERT_SUCCESS,
  CREATION_EVENT_UPSERT_FAILURE,
} from '../../constants';

const initialState = fromJS({
  uuid: '',
  hash: '',
  title: '',
  description: '',
  location: '',
  eventDateList: [],
  step: Step.Step1,
  titleErr: false,
  virgin: true,
  fetching: false,
  errMsg: '',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATION_NEXT_STEP:
      return state
        .set('step', state.get('step') + 1)
        .set('titleErr', false);
    case CREATION_PREVIOUS_STEP:
      return state.set('step', state.get('step') - 1);
    case CREATION_CALENDAR_SELECT_DATE:
      return state.set('eventDateList', action.payload.eventDateList);
    case CREATION_CHANGE_TITLE:
      return state
        .set('title', action.payload.value)
        .set('titleErr', false)
        .set('virgin', false);
    case CREATION_CHANGE_DESCRIPTION:
      return state
        .set('description', action.payload.value)
        .set('virgin', false);
    case CREATION_CHANGE_LOCATION:
      return state
        .set('location', action.payload.value)
        .set('virgin', false);
    case CREATION_STEP1_TITLE_ERROR:
      return state.set('titleErr', action.payload.err);
    case CREATION_EVENT_UPSERT_REQUEST:
    case CREATION_EVENT_UPSERT_FAILURE:
      return state.set('fetching', action.payload.fetching);
    case CREATION_EVENT_UPSERT_SUCCESS: {
      let newState = state.set('fetching', action.payload.fetching);
      newState = newState.merge(fromJS(action.payload.data));
      return newState;
    }
    default:
      return state;
  }
}
