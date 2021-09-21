import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

test("renders button element", () => {
  render(<Button name={""} onClickHandler={() => {}} />);
  screen.getByRole("button");
});

test("display name value passed as prop", () => {
  render(<Button name={"button name"} onClickHandler={() => {}} />);
  screen.getByRole("button", { name: /button name/i });
});

test("invokes the click handler on click", async () => {
  const onClick = jest.fn();
  render(<Button name={"button name"} onClickHandler={onClick} />);
  const button = screen.getByRole("button", { name: /button name/i });
  userEvent.click(button);
  expect(onClick).toHaveBeenCalled();
});
