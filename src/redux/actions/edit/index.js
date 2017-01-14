import {
  API_EVENT_UPSERT,
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
} from '../../../constants';
import { fetchPost } from '../../../utils/fetchUtils';

export function checkTitle(value) {
  return {
    type: CREATION_STEP1_TITLE_ERROR,
    payload: {
      err: value === ''
    }
  };
}

export function nextStep() {
  return {
    type: CREATION_NEXT_STEP,
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

function fetchEventUpsertApiSuccess(data) {
  return {
    type: CREATION_EVENT_UPSERT_SUCCESS,
    payload: {
      fetching: false,
      data,
    }
  };
}

function fetchEventUpsertApiFailure(error) {
  return {
    type: CREATION_EVENT_UPSERT_FAILURE,
    payload: {
      fetching: false,
      error
    }
  };
}

export function fetchEventUpsertApi() {
  return (dispatch, getState) => {
    const creatingData = getState().event.get('creating');
    // make post data
    const post = {
      title: creatingData.get('title'),
      description: creatingData.get('description'),
      location: creatingData.get('location'),
      get eventDateList() {
        return creatingData.get('selected').map(date => ({
          timeInUnix: date.unix()
        }));
      }
    }
    dispatch({
      type: CREATION_EVENT_UPSERT_REQUEST,
      payload: {
        fetching: true,
      }
    });

    fetchPost(API_EVENT_UPSERT, JSON.stringify(post))
      .then((data) => {
        dispatch(fetchEventUpsertApiSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchEventUpsertApiFailure(error));
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
