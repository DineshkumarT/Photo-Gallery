import {
  waitFor,
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { PhotoGallery } from ".";
import { PhotoService } from "../../services";
import { Photo, Photos } from "../../types/common";

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

const mockedPhotos: Photos = {
  page: 4,
  pages: 40,
  perpage: 25,
  photo: [mockedPhoto],
};

describe("PhotoGallery", () => {
  beforeEach(() => {
    jest.spyOn(PhotoService, "getPhotos").mockResolvedValue(mockedPhotos);
  });

  test("Loader should settle down once response is received", async () => {
    render(<PhotoGallery />);
    await waitForElementToBeRemoved(() => screen.getByTestId("loader_id"));
  });

  test("Should display photo in the screen", async () => {
    render(<PhotoGallery />);
    await waitFor(() => screen.getByRole("img"));
  });

  test("Should display photo title and owner name ", async () => {
    render(<PhotoGallery />);
    await waitFor(() =>
      expect(screen.getByTestId("title_id")).toHaveTextContent("Birds")
    );
    expect(screen.getByTestId("name_id")).toHaveTextContent("owner");
  });

  test("Should display favourites button", async () => {
    render(<PhotoGallery />);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /Favourites/i }))
    );
  });
});
