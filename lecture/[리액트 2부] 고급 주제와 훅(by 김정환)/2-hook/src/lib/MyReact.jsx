const MyReact = (function MyReact() {
  let firstName;
  let isInitialized = false;

  function useName(initialValue = "") {
    if (!isInitialized) {
      firstName = initialValue;
      isInitialized = true;
    }

    const setFirstname = (value) => {
      if (firstName === value) return;
      firstName = value;
      forceUpdate();
    };

    return [firstName, setFirstname];
  }

  return { useName };
})();

export default MyReact;
