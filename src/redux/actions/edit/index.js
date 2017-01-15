import moment from 'moment';
import { Map } from 'immutable';
import { browserHistory } from 'react-router';
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
    const selectedDates = getState().create.get('eventDateList');
    // make a copy
    let result = selectedDates;

    // search for date
    const idx = selectedDates.findIndex(date => day.isSame(date.get('date')));
    if (idx > -1) {
      result = result.delete(idx);
    } else {
      result = result.push(Map({
        date: day,
      }));
    }

    dispatch({
      type: CREATION_CALENDAR_SELECT_DATE,
      payload: {
        eventDateList: result,
      }
    });
  };
}

/**
 * Redirect to event admin url, turn to step 3
 */
function fetchEventUpsertApiSuccess(data) {
  return (dispatch) => {
    browserHistory.push(`/event/${data.uuid}`);
    dispatch(nextStep());
    // parse timeInUnix and add date field for eventDates
    for (let i = 0; i < data.eventDateList.length; i++) {
      data.eventDateList[i].date = moment.unix(data.eventDateList[i].timeInUnix);
    }
    dispatch({
      type: CREATION_EVENT_UPSERT_SUCCESS,
      payload: {
        fetching: false,
        data,
      }
    });
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
    const creatingData = getState().create;
    // make post data
    const post = {
      uuid: creatingData.get('uuid'),
      hash: creatingData.get('hash'),
      title: creatingData.get('title'),
      description: creatingData.get('description'),
      location: creatingData.get('location'),
      eventDateList: creatingData.get('eventDateList').map(date => ({
        timeInUnix: date.get('date').unix(),
        uuid: date.get('uuid'),
      })),
    };
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
