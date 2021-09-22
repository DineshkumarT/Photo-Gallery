import { StorageService } from ".";
import { Photo } from "../types/common";

jest.spyOn(window.localStorage.__proto__, "setItem");

jest.spyOn(window.localStorage.__proto__, "getItem");

const mockedPhoto: Photo = {
  farm: 66,
  id: "999",
  isfamily: 0,
  isfriend: 0,
  ispublic: 1,
  owner: "test@N05",
  ownername: "owner",
  secret: "abcd",
  server: "2345",
  title: "Birds",
};

test("Storage service- createFavouritePhotos", () => {
  StorageService.createFavouritePhotos();
  expect(localStorage.setItem).toHaveBeenCalledWith("favouritePhotos", "");
});

test("Storage service- getFavouritePhotos with no data", () => {
  const result = StorageService.getFavouritePhotos();
  expect(localStorage.getItem).toHaveBeenCalled();
  expect(result).toEqual({});
});

test("Storage service- getFavouritePhotos with data", () => {
  jest
    .spyOn(window.localStorage.__proto__, "getItem")
    .mockImplementation(() => {
      return JSON.stringify({ "123": mockedPhoto });
    });
  const result = StorageService.getFavouritePhotos();
  expect(localStorage.getItem).toHaveBeenCalled();
  expect(result).toEqual({ "123": mockedPhoto });
});

test("Storage service- setFavouritePhotos", () => {
  StorageService.setFavouritePhotos({ "444": mockedPhoto });
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "favouritePhotos",
    JSON.stringify({
      "444": mockedPhoto,
    })
  );
});

test("Storage service- addPhotoToFavourites", () => {
  StorageService.addPhotoToFavourites(mockedPhoto);
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "favouritePhotos",
    JSON.stringify({
      "999": mockedPhoto,
    })
  );
});

test("Storage service- removePhotoFromFavourites", () => {
  const mockedPhoto2 = { ...mockedPhoto, id: "666" };
  jest
    .spyOn(window.localStorage.__proto__, "getItem")
    .mockImplementation(() => {
      return JSON.stringify({ "999": mockedPhoto, "666": mockedPhoto2 });
    });
  StorageService.removePhotoFromFavourites(mockedPhoto);
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "favouritePhotos",
    JSON.stringify({
      "666": mockedPhoto2,
    })
  );
});
