import React from "react";

const MyReact = (function MyReact() {
  const memorizedStates = [];
  const deps = [];
  const isInitialized = [];
  const cleanpus = [];
  let cusor = 0;

  function useState(initialValue = "") {
    const { forceUpdate } = useForceUpdate();

    if (!isInitialized[cusor]) {
      memorizedStates[cusor] = initialValue;
      isInitialized[cusor] = true;
    }

    const state = memorizedStates[cusor];

    const setStateAt = (_cusor) => (nextState) => {
      if (state === nextState) return;
      memorizedStates[_cusor] = nextState;
      forceUpdate();
    };

    const setState = setStateAt(cusor);

    cusor = cusor + 1;

    return [state, setState];
  }

  // 구현을 위해 이곳만 리액트 훅을 사용한다.
  function useForceUpdate() {
    const [value, setValue] = React.useState(1);
    const forceUpdate = () => {
      setValue(value + 1);
      cusor = 0;
    };
    return { forceUpdate };
  }

  function useEffect(effect, nextDeps) {
    function runDedeferedEffect() {
      function runEffect() {
        const cleanup = effect();
        if (cleanup) cleanpus[cusor] = cleanup;
      }

      const ENOUGH_TIME_TO_RENDER = 1;
      setTimeout(runEffect, ENOUGH_TIME_TO_RENDER);
    }

    if (!isInitialized[cusor]) {
      isInitialized[cusor] = true;
      deps[cusor] = nextDeps;
      cusor = cusor + 1;
      runDedeferedEffect();
      return;
    }

    const prevDeps = deps[cusor];
    const depsSame = prevDeps.every(
      (prevDep, index) => prevDep === nextDeps[index]
    );

    if (depsSame) {
      cusor = cusor + 1;
      return;
    }

    deps[cusor] = nextDeps;
    cusor = cusor + 1;
    runDedeferedEffect();
  }

  function resetCursor() {
    cusor = 0;
  }

  function cleanupEffects() {
    cleanpus.forEach((cleanup) => typeof cleanup === "function" && cleanup());
  }

  return { useState, useEffect, resetCursor, cleanupEffects };
})();

export default MyReact;
