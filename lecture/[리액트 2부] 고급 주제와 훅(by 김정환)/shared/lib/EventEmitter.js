const createEventEmitter = (value) => {
  let handlers = [];

  const on = (handler) => {
    console.log("[emmiter] on 핸들러 등록", handler);
    handlers.push(handler);
  };
  const off = (handler) => (handlers = handlers.filter((h) => h !== handler));

  const get = () => value;
  const set = (newValue) => {
    console.log("[emmiter] set", newValue);
    value = newValue;
    handlers.forEach((handler) => handler(value));
  };

  return { on, off, get, set };
};

export default createEventEmitter;
