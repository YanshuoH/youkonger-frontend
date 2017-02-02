import { fromJS } from 'immutable';

export const initialState = fromJS({
  fetching: false,
  uuid: '',
  title: '',
  description: '',
  location: '',
  hash: '',
  eventDateList: [],
  unavailableParticipantList: [],

  userUuid: '',
  participantUserUuid: '',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
