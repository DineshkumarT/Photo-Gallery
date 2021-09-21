import { ButtonProps } from "./ButtonProps";

const Button: React.FC<ButtonProps> = ({ name, onClickHandler }) => {
  return <button onClick={onClickHandler}>{name}</button>;
};

export default Button;
