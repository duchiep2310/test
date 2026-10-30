import CaromMode from "./CaromMode.js";
export default class ThreeCushionMode extends CaromMode {
  constructor(options = {}) {
    super(options);
    this.id = "three";
    this.name = "Three-Cushion Billiards";
  }
}
