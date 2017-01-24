import { fromJS } from 'immutable';
import {
  PARTICIPATION_NAME_ONCHANGE,
  PARTICIPATION_NAME_ONBLUR,
} from '../../constants';
/**
 * Holder, served from server
 * @type {Immutable.Map}
 */
const initialState = fromJS({
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
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PARTICIPATION_NAME_ONCHANGE:
      return state.set('name', action.payload.value);
    case PARTICIPATION_NAME_ONBLUR:
      return state
        .set('name', action.payload.value)
        .set('nameErr', action.payload.nameErr);
    default:
      return state;
  }
}
