import { fromJS } from 'immutable';
import {
  PARTICIPATION_NAME_ONCHANGE,
  PARTICIPATION_NAME_ONBLUR,
  PARTICIPATION_SHOW_DATE_DETAIL,
  PARTICIPATION_EXIT_DATE_DETAIL,
  PARTICIPATION_CHECK_DATE,
  PARTICIPATION_NAME_CHECK,
  PARTICIPATION_UPSERT_REQUEST,
  PARTICIPATION_UPSERT_FAILURE,
  PARTICIPATION_UPSERT_SUCCESS,
  PARTICIPATION_GO_BACK_AND_EDIT,
} from '../../constants';

/**
 * Holder, served from server
 * @type {Immutable.Map}
 */
export const initialState = fromJS({
  fetching: false,
  uuid: '',
  title: '',
  description: '',
  location: '',
  hash: '',
  eventDateList: [
    {
      uuid: '',
      eventUuid: '',
      time: '2017-01-05T00:00:00+08:00',
      timeInUnix: 0,
      eventParticipantList: []
    },
  ],
  unavailableParticipantList: [],

  userUuid: '',
  participantUserUuid: '',

  // interactive fields
  name: '',
  nameErr: false,

  // navigation
  moveForward: false,
  // user click an event date to view detail
  currentEventDate: undefined,
  // submitted if upsert api returns ok
  submitted: false,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PARTICIPATION_NAME_ONCHANGE:
      return state.set('name', action.payload.value);
    case PARTICIPATION_NAME_ONBLUR:
      return state
        .set('name', action.payload.value)
        .set('nameErr', action.payload.nameErr);
    case PARTICIPATION_SHOW_DATE_DETAIL:
      return state
        .set('currentEventDate', action.payload.eventDate)
        .set('moveForward', true);
    case PARTICIPATION_EXIT_DATE_DETAIL:
      return state
        .delete('currentEventDate')
        .set('moveForward', false);
    case PARTICIPATION_CHECK_DATE: {
      state = state
        .setIn(['eventDateList', action.payload.eventDateIdx], action.payload.eventDate);
      // also set the current event date
      if (state.get('currentEventDate')
        && action.payload.eventDate.get('uuid') === state.get('currentEventDate').get('uuid')) {
        state = state.set('currentEventDate', action.payload.eventDate);
      }
      return state;
    }
    case PARTICIPATION_NAME_CHECK:
      return state
        .set('nameErr', state.get('name') === '');
    case PARTICIPATION_UPSERT_REQUEST:
    case PARTICIPATION_UPSERT_FAILURE:
      return state.set('fetching', action.payload.fetching);
    case PARTICIPATION_UPSERT_SUCCESS:
      state = initialState.mergeDeep(fromJS(action.payload.event));
      return state
        .set('submitted', true)
        .set('moveForward', true);
    case PARTICIPATION_GO_BACK_AND_EDIT:
      return state
        .set('moveForward', false)
        .set('submitted', false)
        .delete('currentEventDate');
    default:
      return state;
  }
}
