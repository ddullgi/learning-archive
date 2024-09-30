/**
 * 경계 다루기 (min, max)
 *
 * 1. 최소값과 최대값을 다룬다.
 * 2. 최소값과 최대값의 포함 여부를 결정해야한다. (이상-초과 / 이하-미만)
 * 3. 혹은 네이밍에 최소값과 최대값 포함 여부를 표현한다.
 */

function genRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 상수
const MIN_NUMBER = 1;
const MAX_NUMBER = 45;

genRandomNumber(MIN_NUMBER, MAX_NUMBER);

const MAX_AGE = 20;

function isAdult(age) {
  // 최소값, 최대값 (포함되는지 vs 안되는지)
  // 이상, 초과 vs 이하, 미만
  if (age >= 20) {
  }
}

/**
 * begin - end
 */

function reservationDate(beginDate, endDate) {
  // ...some code
}

reservationDate("YYYY-MM-DD", "YYYY-MM-DD");

/**
 * first - last
 *
 * 포함된 양 끝을 의미한다.
 * 부터 ~~~ 까지
 */

const students = ["포코", "존", "현석"];

function getStudents(first, last) {
  // some code
}

getStudents("포코", "현석");

/**
 * 매개변수의 순서가 경계다
 *
 * 호출하는 함수의 네이밍과 인자의 순서의 연관성을 고려한다
 */

function someFunc(someArg, someArg2) {}
genRandomNumber(1, 50);
getDates("20121-10-01", "2021-10-31");
genShuffleArray(1, 5);
