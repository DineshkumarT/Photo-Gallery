import { render, screen } from "@testing-library/react";
import PhotoDetails from "./PhotoDetails";

test("render name and title as passed in prop", () => {
  render(<PhotoDetails name={"Photo name"} title={"Photo title"} />);
  screen.getByText("Photo name");
  screen.getByText("Photo title");
});

test("render name and title as Unknown if empty string is passed in prop", () => {
  render(<PhotoDetails name={""} title={""} />);
  expect(screen.getByTestId("title_id")).toHaveTextContent("Unknown");
  expect(screen.getByTestId("name_id")).toHaveTextContent("Unknown");
});
