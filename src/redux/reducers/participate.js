import { fromJS } from 'immutable';
import {
  PARTICIPATION_NAME_ONCHANGE,
  PARTICIPATION_NAME_ONBLUR,
  PARTICIPATION_SHOW_DATE_DETAIL,
  PARTICIPATION_EXIT_DATE_DETAIL,
  PARTICIPATION_CHECK_DATE,
  PARTICIPATION_NAME_CHECK,
} from '../../constants';

/**
 * Holder, served from server
 * @type {Immutable.Map}
 */
export const initialState = fromJS({
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

  // interactive fields
  name: '',
  nameErr: false,

  // navigation
  moveForward: false,
  // user click an event date to view detail
  currentEventDate: undefined,
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
    case PARTICIPATION_CHECK_DATE:
      return state
        .setIn(['eventDateList', action.payload.eventDateIdx], action.payload.eventDate);
    case PARTICIPATION_NAME_CHECK:
      return state
        .set('nameErr', state.get('name') === '');
    default:
      return state;
  }
}
