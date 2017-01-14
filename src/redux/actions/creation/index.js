import {
  Step,
  CREATION_NEXT_STEP,
  CREATION_PREVIOUS_STEP,
  CREATION_CALENDAR_SELECT_DATE,
  CREATION_CHANGE_TITLE,
  CREATION_CHANGE_DESCRIPTION,
  CREATION_CHANGE_LOCATION,
  CREATION_STEP1_TITLE_ERROR,
} from '../../../constants';

export function checkTitle(value) {
  return {
    type: CREATION_STEP1_TITLE_ERROR,
    payload: {
      err: value === ''
    }
  };
}

export function nextStep() {
  return (dispatch, getState) => {
    // get current step and dispatch correspond action
    const step = getState().event.get('creating').get('step');
    // step 1
    if (step === Step.Step1) {
      // check
      dispatch(checkTitle(getState().event.get('creating').get('title')));
      // step 2
    } else if (step === Step.Step2) {

    }
    dispatch({
      type: CREATION_NEXT_STEP,
    });
  };
}

export function previousStep() {
  return {
    type: CREATION_PREVIOUS_STEP
  };
}

export function selectDate(day) {
  return (dispatch, getState) => {
    // retrieve all selected dates
    const selectedDates = getState().event.get('creating').get('selected');
    // make a copy
    let result = selectedDates;

    // search for date
    const idx = selectedDates.findIndex(date => day.isSame(date));
    if (idx > -1) {
      result = result.delete(idx);
    } else {
      result = result.push(day);
    }

    dispatch({
      type: CREATION_CALENDAR_SELECT_DATE,
      payload: {
        selected: result,
      }
    });
  };
}

export function changeTitle(value) {
  return {
    type: CREATION_CHANGE_TITLE,
    payload: {
      value
    }
  };
}

export function changeDescription(value) {
  return {
    type: CREATION_CHANGE_DESCRIPTION,
    payload: {
      value
    }
  };
}

export function changeLocation(value) {
  return {
    type: CREATION_CHANGE_LOCATION,
    payload: {
      value
    }
  };
}
