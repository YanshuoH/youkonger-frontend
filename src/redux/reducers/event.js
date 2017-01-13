import { Step } from '../../constants';

const initialState = {
  title: '',
  description: '',
  location: '',
  creating: {
    step: Step.Step1
  }
};

export default function reducer(state = initialState) {
  return state;
}
