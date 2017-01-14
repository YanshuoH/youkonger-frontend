import {
  NEXT_STEP,
  PREVIOUS_STEP,
  CALENDAR_SELECT_DATE,
} from '../../../constants';

export function nextStep() {
  return {
    type: NEXT_STEP
  };
}

export function previousStep() {
  return {
    type: PREVIOUS_STEP
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
      type: CALENDAR_SELECT_DATE,
      payload: {
        selected: result,
      }
    });
  };
}
