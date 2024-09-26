/**
 * ! 전역 공간을 사용하지 말아야 하는 이유
 *
 * 1. 경험
 * 2. 누군가 혹은 자바스크립트 생태계
 * 3. 강의 혹은 책
 * 4. 회사 혹은 멘토
 * 5. Lint
 */

// ! 파일을 나눠도 스코프가 나뉘지는 않는다
var globalVar = "global";

console.log("[index]", globalVar);

const array = [10, 20, 30];
for (var index = 0; index < array.length; index + 1) {
  const element = array[index];
  console.log(array[index]);
}

/**
 * ? 전역공간 더럽히지 않기
 *
 * 어디서나 접근 가능한 것은 스코프 분리 위험
 *
 * 1. 전역변수 X
 * 2. 지역변수 O
 * 3. Window, global을 조작 X
 * 4. const, let OK
 * 5. IIFE, Module, Closure
 */

// 임시 변수 제거하기

function beforeGetElements() {
  // 임시 객체는 수정(CRUD) 욕구를 일으킨다
  const result = {}; // 임시 객체

  result.title = document.querySelector(".title");
  result.text = document.querySelector(".text");
  result.value = document.querySelector(".value");

  return result;
}

function afterGetElements() {
  return {
    title: document.querySelector(".title"),
    text: document.querySelector(".text"),
    value: document.querySelector(".value"),
  };
}

// 추가적인 스펙이 생길때 두가지 방향성이 있음
// 1. 함수 추가
// 2. 기존 함수 수정 => 기존 함수의 사용 범위에 따라 영향이 클 수 있음

function beforeGetDateTime(targetDate) {
  let month = targetDate.getMonth();
  let day = targetDate.getDate();
  let hour = targetDate.Hours();

  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;

  return {
    month,
    day,
    hour,
  };
}

function afterGetDateTime(targetDate) {
  const month = targetDate.getMonth();
  const day = targetDate.getDate();
  const hour = targetDate.Hours();

  return {
    month: month >= 10 ? month : "0" + month,
    day: day >= 10 ? day : "0" + day,
    hour: hour >= 10 ? hour : "0" + hour,
  };
}

// 기존 함수 확장 예시
function exGetDateTime() {
  const currentDateTime = afterGetDateTime(new Date());

  return {
    month: currentDateTime.month + "분 전",
    day: currentDateTime.day + "분 전",
    hour: currentDateTime.hour + "분 전",
  };
}

function genRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max + 1) + min);

  return randomNumber;
}

/**
 * 임시 변수가 위험한 이유
 *
 * 1. 명령형으로 가득한 로직
 * 2. 어디서 어떻게 잘못됬는지 디버깅이 힘들다
 * 3. 추가적으로 코드를 수정하고 싶게하는 여지를 준다
 *
 * 해결 방법
 * 1. 함수나누기
 * 2. 바로 반환하기
 * 3. 고차함수 사용하기(map, filter, reduce)
 * 4. 선언형 코드 작성하기
 */
