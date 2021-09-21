import { render, screen } from "@testing-library/react";
import { Photo } from "../../types/common";
import PhotoTile from "./PhotoTile";

const mockedPhoto: Photo = {
  farm: 66,
  id: "51499854007",
  isfamily: 0,
  isfriend: 0,
  ispublic: 1,
  owner: "test@N05",
  ownername: "owner",
  secret: "abcd",
  server: "2345",
  title: "Birds",
};

test("renders image", () => {
  render(<PhotoTile photo={mockedPhoto} favourite={false} />);
  screen.getByRole("img");
});

test("Should NOT display the favourite icon if the favourite prop is false", () => {
  render(<PhotoTile photo={mockedPhoto} favourite={false} />);
  expect(screen.queryByTestId("heartIcon_id")).not.toBeInTheDocument();
});

test("Should display the favourite icon if the favourite prop is true", () => {
  render(<PhotoTile photo={mockedPhoto} favourite={true} />);
  expect(screen.getByTestId("heartIcon_id")).toBeInTheDocument();
});

test("Should display photo name and title", () => {
  render(<PhotoTile photo={mockedPhoto} favourite={false} />);
  screen.getByText("owner");
  screen.getByText("Birds");
});

test("Should display favourites button if favourite prop is false", () => {
  render(<PhotoTile photo={mockedPhoto} favourite={false} />);
  screen.getByRole("button", { name: /Favourites/i });
});

test("Should display remove favourites button if favourite prop is true", () => {
  render(<PhotoTile photo={mockedPhoto} favourite={true} />);
  screen.getByRole("button", { name: /Remove Favourites/i });
});
