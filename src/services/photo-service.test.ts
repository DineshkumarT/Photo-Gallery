import { PhotoService } from ".";
import { Photo, Photos } from "../types/common";

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

const response = {
  status: "200",
  json: () => Promise.resolve({ photos: mockedPhotos }),
};

test("should call correct url", async () => {
  //@ts-ignore
  jest.spyOn(global, "fetch").mockResolvedValue(response);
  const photos = await PhotoService.getPhotos();
  expect(fetch).toHaveBeenCalledWith(
    "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=6928ef790145e80c48ac2f1f1a8508b4&format=json&nojsoncallback=1&per_page=30&page=1"
  );
});

test("should return photos for valid response", async () => {
  //@ts-ignore
  jest.spyOn(global, "fetch").mockResolvedValue(response);
  const photos = await PhotoService.getPhotos();
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(photos).toEqual(mockedPhotos);
});

test("should return null for invalid response", async () => {
  //@ts-ignore
  jest.spyOn(global, "fetch").mockRejectedValue(null);
  const photos = await PhotoService.getPhotos();
  expect(photos).toEqual(null);
});
