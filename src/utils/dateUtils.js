import moment from 'moment';

/**
 * Given userUuid and eventDate, should check if user already in eventParticipantList
 * @param userUuid {string}
 * @param eventDate {Immutable.Map}
 * @returns {{idx: number, checked: boolean}}
 */
export function isCheckedDate(userUuid, eventDate) {
  for (let i = 0; i < eventDate.get('eventParticipantList').size; i++) {
    const participant = eventDate.get('eventParticipantList').get(i);
    if (participant.get('participantUserUuid') === userUuid) {
      return { idx: i, checked: !participant.get('remove') };
    }
  }

  return { idx: -1, checked: false };
}

/**
 * Given userUuid and eventDateList, should count how many dates user've checked
 * @param userUuid
 * @param eventDateList
 * @returns {number}
 */
export function countCheckedDate(userUuid, eventDateList) {
  let count = 0;
  for (let i = 0; i < eventDateList.size; i++) {
    const d = eventDateList.get(i);
    const { checked } = isCheckedDate(userUuid, d);
    if (checked) {
      count++;
    }
  }

  return count;
}

/**
 * Given unix second, should return a formatted date string
 * @param timeInUnix {number}
 * @returns {string}
 */
export function formatUnixSecondToDate(timeInUnix) {
  return moment
    .unix(timeInUnix)
    .utcOffset(8)
    .format('YYYY年MM月DD日');
}
