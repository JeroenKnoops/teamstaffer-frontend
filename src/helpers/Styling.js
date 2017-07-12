export default class Styling {
  static join() {
    return [...arguments].reduce((acc, value) => {
      return { ...acc, ...value };
    }, {});
  }
};
