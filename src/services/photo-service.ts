import type { Params } from "./services.types";

type ParamKey = keyof Params;

const appendKeyValue = (
  params: Params,
  key: ParamKey,
  queryParams: string | undefined
) => {
  if (params[key]) {
    queryParams = queryParams
      ? `${queryParams}&${key}=${params[key]}`
      : `${key}=${params[key]}`;
  }
  return queryParams;
};

const buildQueryParams = (url: string, params: Params) => {
  const keys = Object.keys(params) as (keyof Params)[];
  let queryParams;
  for (const key of keys) {
    queryParams = appendKeyValue(params, key, queryParams);
  }
  return queryParams ? `${url}?${queryParams}` : url;
};

export class PhotoService {
  static getPhotos = async <T>(
    page = 1,
    extras?: string[],
    perPage = 25
  ): Promise<T | null> => {
    const url = "https://www.flickr.com/services/rest/";
    const params = {
      method: "flickr.photos.getRecent",
      api_key: "6928ef790145e80c48ac2f1f1a8508b4",
      format: "json",
      nojsoncallback: 1,
      per_page: perPage,
      extras,
      page,
    };
    const apiUrl = buildQueryParams(url, params);

    try {
      const response = await fetch(apiUrl);
      const { photos } = await response.json();
      return photos;
    } catch {
      return null;
    }
  };
}
