# [클린코드 자바스크립트(by Poco)](https://www.udemy.com/course/clean-code-js/) 정리

# 임시 변수 제거하기

## 임시 변수가 위험한 이유

- 명령형으로 가득한 로직
  - 어디서 어떻게 잘못됐는지 디버깅이 힘들다
  - 추가적으로 코드를 수정하고 싶게 하는 여지를 준다

## 해결 방법

- 함수 나누기
- 중간에 저장하지 말고 바로 반환하기
- 고차함수 사용하기(map, filter, reduce)
- 선언형 코드 작성하기

# 타입 다루기

javascript는 동적 타입을 가지기 때문에 타입 검사가 어렵다.

## typeof

- 원시값의 경우 비교적 검사가 잘된다.
- 참조형의 경우 정확한 검사가 힘들다.
- `typeof null` ⇒ `‘object’` : JS가 인정한 오류이다.

## instanceof

- 프로토타입을 검사해서 자식 여부를 검사
  - 참조형을 다룰 때 typeof에 비해 비교적으로 타입 검사가 용이
- 모든 참조형은 결국 `Object`로부터 체이닝 된다는 점을 유의해야 됨
  - [] < Array < Object
  - () ⇒ {} < Function < Object
  - “2024.09.27” < Date < Object

## Object.prototype.toString.call()

- Object의 상세 타입을 알아낼 수 있음
  - `Object.prototype.toString.call([])` ⇒ `'[object Array]'`
  - `Object.prototype.toString.call(()=>{})` ⇒ `'[object Function]'`
  - `Object.prototype.toString.call("")` ⇒ `'[object String]'`
- 만능은 아니지만 더 자세한 타입 검사가 가능

## undefined & null

```jsx
// null
!null; // true
!!null; // false

null === false; // false
!null === true; // true

// null => 수학적으로 0
null + 123; // 123

// undefined
// 선언했지만 값은 정의되지 않고 할당 X
let varb;

typeof varb; // 'undefined'

undefined + 10; // NaN

!undefined; // true

undefined == null; // true
undefined === null; // false
!undefined === !null; // true
```

- `undefined`, `null` ⇒ 값이 없거나 정의되지 않은 명시적인 표현
- 팀이나 프로젝트 규모에서 컨벤션으로 통일하고 사용하는 것이 좋다.
  - 비슷하게 쓰이지만 둘을 비교할 경우 확실히 다른 것이기 때문에 혼용하는 것이 좋지 않다.

## eqeq(==)

- 형변환(type casting) 이후 비교한다.
- 쓰지 말자

## 형변환 주의하기

- 명시적으로 형변환 하기
  - 개발자에 의해 메서드 등을 이용한 형변환
  - 이후에 코드를 봐도 이해가능
- 암묵적인 형 변환 쓰지 말기
  - JS에 의한 형변환

## 숫자 검사

**파라미터를 암묵적으로 Number로 형변환하는 isNaN 대신에 형변환 없는 Number.isNaN 함수를 사용하는게 더 좋다.**

### isNaN()

- 파라미터가 NaN 인지를 확인하는 함수
- Number가 아닌 값이 들어오면 강제로 Number로 변환해서 확인

### Number.isNaN()

- 파라미터가 오직 숫자형이고 또한 NaN인 값만이 true를 반환

```jsx
isNaN(123 + "테스트"); // true

Number.isNaN(123 + "테스트"); // false
```

### isNaN(123 + "테스트")

1. `123 + "테스트"`는 문자열 연결 연산자로 인해 `"123테스트"`라는 문자열이 된다.
2. `isNaN("123테스트")`는 `"123테스트"`를 숫자로 변환하려고 시도하는데, 이 문자열은 숫자로 변환할 수 없으므로 `NaN`이 된다.
3. 따라서 `isNaN("123테스트")`는 `NaN`을 확인하게 되고, `NaN`이므로 `true`를 반환한다.

### Number.isNaN(123 + "테스트")

1. `123 + "테스트"`는 역시 `"123테스트"`라는 문자열이 된다.
2. `Number.isNaN("123테스트")`는 형 변환 없이 이 값이 숫자인지 확인한다.
3. `"123테스트"`는 숫자가 아니므로, `Number.isNaN`은 이 값을 `NaN`으로 간주하지 않는다.
4. 따라서 `Number.isNaN("123테스트")`는 `false`를 반환한다.

# 경계 다루기

### min - max

- `MIN_NUMBER`, `MAX_NUMBER`처럼 알아보기 쉽게 변수로 저장하는 것이 좋다.
- 최소 값과 최대 값의 포함 여부를 결정해야 한다.(이상, 초과 vs 이하, 미만)
  - 때문에 팀적인 컨벤션을 정해두는 것이 좋다.
- 혹은 네이밍에 최소 값과 최대 값의 포함 여부를 표현한다.

### begin - end

- 날짜의 시작과 끝을 표현

### first - last

- 내용의 명시적인 순서가 없을 때 사용
  - _부터 ~~~ 까지_

```jsx
const students = ["포코", "존", "현석"];

function getStudents(first, last) {
  // some code
}

getStudents("포코", "현석");
```

### prefix - suffix

- 접두사 - 접미사
- 네이밍의 구분을 용이하게 한다.
- 코드의 일관성을 유지할 수 있다.

### 매개변수의 순서가 경계다.

```jsx
genRandomNumber(1, 50);
getDates("20121-10-01", "2021-10-31");
genShuffleArray(1, 5);
```

- 위의 함수를 보면 매개 변수의 순서로도 예측이 가능하다.
  - 때문에 함수가 받는 매개변수를 줄이는 것이 좋다.
