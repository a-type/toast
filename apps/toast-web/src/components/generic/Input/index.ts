import BaseInput, { InputWithVariants } from './Input';
import Group from './Group';

interface InputWithGroup extends InputWithVariants {
  Group?: typeof Group;
}

const Input: InputWithGroup = BaseInput;

Input.Group = Group;

export default Input;
