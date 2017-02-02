import { fromJS } from 'immutable';
import {
  ADMIN_SHOW_EVENT_DATE_DETAIL,
  ADMIN_EXIT_EVENT_DATE_DETAIL,
  ADMIN_FETCH_EVENT_DATE_DDAY_REQUEST,
  ADMIN_FETCH_EVENT_DATE_DDAY_SUCCESS,
  ADMIN_FETCH_EVENT_DATE_DDAY_FAILURE,
} from '../../constants';

export const initialState = fromJS({
  fetching: false,
  uuid: '',
  title: '',
  description: '',
  location: '',
  hash: '',
  finished: false,
  eventDateList: [],
  unavailableParticipantList: [],

  userUuid: '',
  participantUserUuid: '',

  moveForward: true,

  currentEventDate: undefined,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_SHOW_EVENT_DATE_DETAIL:
      return state
        .set('moveForward', true)
        .set('currentEventDate', action.payload.eventDate);
    case ADMIN_EXIT_EVENT_DATE_DETAIL:
      return state
        .set('moveForward', false)
        .delete('currentEventDate');
    case ADMIN_FETCH_EVENT_DATE_DDAY_REQUEST:
    case ADMIN_FETCH_EVENT_DATE_DDAY_FAILURE:
      return state.set('fetching', action.payload.fetching);
    case ADMIN_FETCH_EVENT_DATE_DDAY_SUCCESS: {
      state = state.mergeDeep(action.payload.event);
      return state
        .set('fetching', action.payload.fetching)
        .set('submitted', action.payload.submitted)
        .set('moveForward', true);
    }
    default:
      return state;
  }
}
