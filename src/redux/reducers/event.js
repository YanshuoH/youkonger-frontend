import {
  fromJS,
} from 'immutable';

const initialState = fromJS({
  title: '',
  description: '',
  location: '',
  eventDateList: [],
});

export default function reducer(state = initialState, action) {
  return state;
}
