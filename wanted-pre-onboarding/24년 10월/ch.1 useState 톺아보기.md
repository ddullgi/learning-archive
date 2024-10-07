# useState 톺아보기

## 우리가 흔히 React에서 사용하는 useState는 어떤 역할을 담당하는가?

- 상태 관리를 위해서

## useState 대신에 let이나 const를 사용하지 못하는가?

## useState 내부 구조

```js
// react/packages/react/src/ReactHooks.js
function resolveDispatcher() {
  const dispatcher = ReactSharedInternals.H;
  if (__DEV__) {
    if (dispatcher === null) {
      console.error(
        "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for" +
          " one of the following reasons:\n" +
          "1. You might have mismatching versions of React and the renderer (such as React DOM)\n" +
          "2. You might be breaking the Rules of Hooks\n" +
          "3. You might have more than one copy of React in the same app\n" +
          "See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
      );
    }
  }
  // Will result in a null access error if accessed outside render phase. We
  // intentionally don't throw our own error because this is in a hot path.
  // Also helps ensure this is inlined.
  return ((dispatcher: any): Dispatcher);
}

export function useState<S>(
  initialState: (() => S) | S
): [S, Dispatch<BasicStateAction<S>>] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
```

```js
// react/packages/shared/ReactSharedInternals.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from "react";

const ReactSharedInternals =
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

export default ReactSharedInternals;
```

```js
// react/packages/react/src/ReactClient.js
import ReactSharedInternals from './ReactSharedInternalsClient';
// ...
ReactSharedInternals as __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
```

```js
// react/packages/react/src/ReactSharedInternalsClient.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { Dispatcher } from "react-reconciler/src/ReactInternalTypes";
import type { AsyncDispatcher } from "react-reconciler/src/ReactInternalTypes";
import type { BatchConfigTransition } from "react-reconciler/src/ReactFiberTracingMarkerComponent";

export type SharedStateClient = {
  H: null | Dispatcher, // ReactCurrentDispatcher for Hooks
  A: null | AsyncDispatcher, // ReactCurrentCache for Cache
  T: null | BatchConfigTransition, // ReactCurrentBatchConfig for Transitions
  S: null | ((BatchConfigTransition, mixed) => void), // onStartTransitionFinish

  // DEV-only

  // ReactCurrentActQueue
  actQueue: null | Array<RendererTask>,

  // Used to reproduce behavior of `batchedUpdates` in legacy mode.
  isBatchingLegacy: boolean,
  didScheduleLegacyUpdate: boolean,

  // Tracks whether something called `use` during the current batch of work.
  // Determines whether we should yield to microtasks to unwrap already resolved
  // promises without suspending.
  didUsePromise: boolean,

  // Track first uncaught error within this act
  thrownErrors: Array<mixed>,

  // ReactDebugCurrentFrame
  getCurrentStack: null | (() => string),
};

export type RendererTask = (boolean) => RendererTask | null;

const ReactSharedInternals: SharedStateClient = ({
  H: null,
  A: null,
  T: null,
  S: null,
}: any);

if (__DEV__) {
  ReactSharedInternals.actQueue = null;
  ReactSharedInternals.isBatchingLegacy = false;
  ReactSharedInternals.didScheduleLegacyUpdate = false;
  ReactSharedInternals.didUsePromise = false;
  ReactSharedInternals.thrownErrors = [];
  // Stack implementation injected by the current renderer.
  ReactSharedInternals.getCurrentStack = (null: null | (() => string));
}

export default ReactSharedInternals;
```

useState는 renderWithHooks으로 부터 시작된다.

renderWithHooks는 updateFunctionComponent, updateForwardRef에서 사용
즉 컴포넌트가 업데이트 될때 사용됨

```js
export function renderWithHooks<Props, SecondArg>(
  current: Fiber | null, // 업데이트 전 (현재 렌더링 중인)
  workInProgress: Fiber, // 새로 업데이트하기위해 필요한 정보들
  Component: (p: Props, arg: SecondArg) => any,
  props: Props,
  secondArg: SecondArg,
  nextRenderLanes: Lanes
): any {
  renderLanes = nextRenderLanes;
  currentlyRenderingFiber = workInProgress;

  if (__DEV__) {
    hookTypesDev =
      current !== null
        ? ((current._debugHookTypes: any): Array<HookType>)
        : null;
    hookTypesUpdateIndexDev = -1;
    // Used for hot reloading:
    ignorePreviousDependencies =
      current !== null && current.type !== workInProgress.type;

    warnIfAsyncClientComponent(Component);
  }

  // 이런게 있다 정도 기억...
  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;
  workInProgress.lanes = NoLanes;

  // The following should have already been reset
  // currentHook = null;
  // workInProgressHook = null;

  // didScheduleRenderPhaseUpdate = false;
  // localIdCounter = 0;
  // thenableIndexCounter = 0;
  // thenableState = null;

  // TODO Warn if no hooks are used at all during mount, then some are used during update.
  // Currently we will identify the update render as a mount because memoizedState === null.
  // This is tricky because it's valid for certain types of components (e.g. React.lazy)

  // Using memoizedState to differentiate between mount/update only works if at least one stateful hook is used.
  // Non-stateful hooks (e.g. context) don't get added to memoizedState,
  // so memoizedState would be null during updates and mounts.
  if (__DEV__) {
    if (current !== null && current.memoizedState !== null) {
      ReactSharedInternals.H = HooksDispatcherOnUpdateInDEV;
    } else if (hookTypesDev !== null) {
      // This dispatcher handles an edge case where a component is updating,
      // but no stateful hooks have been used.
      // We want to match the production code behavior (which will use HooksDispatcherOnMount),
      // but with the extra DEV validation to ensure hooks ordering hasn't changed.
      // This dispatcher does that.
      ReactSharedInternals.H = HooksDispatcherOnMountWithHookTypesInDEV;
    } else {
      ReactSharedInternals.H = HooksDispatcherOnMountInDEV;
    }
  } else {
    // 의존성 주입
    ReactSharedInternals.H =
      current === null || current.memoizedState === null
        ? HooksDispatcherOnMount
        : HooksDispatcherOnUpdate;
  }

  // In Strict Mode, during development, user functions are double invoked to
  // help detect side effects. The logic for how this is implemented for in
  // hook components is a bit complex so let's break it down.
  //
  // We will invoke the entire component function twice. However, during the
  // second invocation of the component, the hook state from the first
  // invocation will be reused. That means things like `useMemo` functions won't
  // run again, because the deps will match and the memoized result will
  // be reused.
  //
  // We want memoized functions to run twice, too, so account for this, user
  // functions are double invoked during the *first* invocation of the component
  // function, and are *not* double invoked during the second incovation:
  //
  // - First execution of component function: user functions are double invoked
  // - Second execution of component function (in Strict Mode, during
  //   development): user functions are not double invoked.
  //
  // This is intentional for a few reasons; most importantly, it's because of
  // how `use` works when something suspends: it reuses the promise that was
  // passed during the first attempt. This is itself a form of memoization.
  // We need to be able to memoize the reactive inputs to the `use` call using
  // a hook (i.e. `useMemo`), which means, the reactive inputs to `use` must
  // come from the same component invocation as the output.
  //
  // There are plenty of tests to ensure this behavior is correct.
  const shouldDoubleRenderDEV =
    __DEV__ &&
    debugRenderPhaseSideEffectsForStrictMode &&
    (workInProgress.mode & StrictLegacyMode) !== NoMode;

  shouldDoubleInvokeUserFnsInHooksDEV = shouldDoubleRenderDEV;
  let children = __DEV__
    ? callComponentInDEV(Component, props, secondArg)
    : Component(props, secondArg);
  shouldDoubleInvokeUserFnsInHooksDEV = false;

  // Check if there was a render phase update
  if (didScheduleRenderPhaseUpdateDuringThisPass) {
    // Keep rendering until the component stabilizes (there are no more render
    // phase updates).
    children = renderWithHooksAgain(
      workInProgress,
      Component,
      props,
      secondArg
    );
  }

  if (shouldDoubleRenderDEV) {
    // In development, components are invoked twice to help detect side effects.
    setIsStrictModeForDevtools(true);
    try {
      children = renderWithHooksAgain(
        workInProgress,
        Component,
        props,
        secondArg
      );
    } finally {
      setIsStrictModeForDevtools(false);
    }
  }

  finishRenderingHooks(current, workInProgress, Component);

  return children;
}
```

```js
function mountState<S>(
  initialState: (() => S) | S
): [S, Dispatch<BasicStateAction<S>>] {
  const hook = mountStateImpl(initialState);
  const queue = hook.queue;
  const dispatch: Dispatch<BasicStateAction<S>> = (dispatchSetState.bind(
    null,
    currentlyRenderingFiber,
    queue
  ): any);
  queue.dispatch = dispatch;
  return [hook.memoizedState, dispatch];
}
```

```js
function mountStateImpl<S>(initialState: (() => S) | S): Hook {
  const hook = mountWorkInProgressHook();
  if (typeof initialState === "function") {
    // 함수 자체를 저장함
    const initialStateInitializer = initialState;
    // $FlowFixMe[incompatible-use]: Flow doesn't like mixed types
    // 기존의 initialState = initialStateInitializer(); -> 함수를 실행해서 결과를 반환
    initialState = initialStateInitializer();
    if (shouldDoubleInvokeUserFnsInHooksDEV) {
      setIsStrictModeForDevtools(true);
      // $FlowFixMe[incompatible-use]: Flow doesn't like mixed types
      initialStateInitializer();
      setIsStrictModeForDevtools(false);
    }
  }
  // 함수 계산을 통한 결과값이 저장된다.
  hook.memoizedState = hook.baseState = initialState;
  const queue: UpdateQueue<S, BasicStateAction<S>> = {
    pending: null,
    lanes: NoLanes,
    dispatch: null,
    // setState에 필요한 함수 저장
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState: any),
  };
  hook.queue = queue;
  return hook;
}
```

```js
function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  // $FlowFixMe[incompatible-use]: Flow doesn't like mixed types
  return typeof action === "function" ? action(state) : action;
}
```

```js
function mountWorkInProgressHook(): Hook {
  // 우리가 사용할 객체 정보
  const hook: Hook = {
    memoizedState: null,

    baseState: null,
    baseQueue: null,
    queue: null,

    next: null,
  };

  // Linked List -> 알고리즘
  if (workInProgressHook === null) {
    // This is the first hook in the list
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // Append to the end of the list
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}
```

```js
// Linked List
export type Hook = {
  memoizedState: any,
  baseState: any,
  baseQueue: Update<any, any> | null,
  queue: any,
  next: Hook | null,
};
```

```js
function dispatchSetState<S, A>(
  fiber: Fiber,
  queue: UpdateQueue<S, A>,
  action: A
): void {
  if (__DEV__) {
    if (typeof arguments[3] === "function") {
      console.error(
        "State updates from the useState() and useReducer() Hooks don't support the " +
          "second callback argument. To execute a side effect after " +
          "rendering, declare it in the component body with useEffect()."
      );
    }
  }

  const lane = requestUpdateLane(fiber);

  const update: Update<S, A> = {
    lane,
    revertLane: NoLane,
    action,
    hasEagerState: false,
    eagerState: null,
    next: (null: any),
  };

  if (isRenderPhaseUpdate(fiber)) {
    enqueueRenderPhaseUpdate(queue, update);
  } else {
    const alternate = fiber.alternate;
    if (
      fiber.lanes === NoLanes &&
      (alternate === null || alternate.lanes === NoLanes)
    ) {
      // The queue is currently empty, which means we can eagerly compute the
      // next state before entering the render phase. If the new state is the
      // same as the current state, we may be able to bail out entirely.
      const lastRenderedReducer = queue.lastRenderedReducer;
      if (lastRenderedReducer !== null) {
        let prevDispatcher = null;
        if (__DEV__) {
          prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
        }
        try {
          // lastRenderedState -> initialized된 statae
          const currentState: S = (queue.lastRenderedState: any);
          // basicRederedReducer
          // function (state, action)
          const eagerState = lastRenderedReducer(currentState, action);
          // Stash the eagerly computed state, and the reducer used to compute
          // it, on the update object. If the reducer hasn't changed by the
          // time we enter the render phase, then the eager state can be used
          // without calling the reducer again.
          update.hasEagerState = true;
          update.eagerState = eagerState;
          if (is(eagerState, currentState)) {
            // Fast path. We can bail out without scheduling React to re-render.
            // It's still possible that we'll need to rebase this update later,
            // if the component re-renders for a different reason and by that
            // time the reducer has changed.
            // TODO: Do we still need to entangle transitions in this case?
            enqueueConcurrentHookUpdateAndEagerlyBailout(fiber, queue, update);
            return;
          }
        } catch (error) {
          // Suppress the error. It will throw again in the render phase.
        } finally {
          if (__DEV__) {
            ReactSharedInternals.H = prevDispatcher;
          }
        }
      }
    }

    const root = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
    if (root !== null) {
      scheduleUpdateOnFiber(root, fiber, lane);
      entangleTransitionUpdate(root, queue, lane);
    }
  }

  markUpdateInDevTools(fiber, lane, action);
}
```

```js
function updateState<S>(
  initialState: (() => S) | S
): [S, Dispatch<BasicStateAction<S>>] {
  // updateReducer는 useReducer와 동일하게 사용
  // 즉 useState와 useReducer는 내부 동작에서 같은 동작이 있음
  return updateReducer(basicStateReducer, initialState);
}
```
