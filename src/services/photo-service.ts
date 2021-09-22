import { API_KEY, API_METHOD, API_URL } from "../constants/api";
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
    perPage = 30
  ): Promise<T | null> => {
    const url = API_URL;
    const params = {
      method: API_METHOD.GET_RECENT_PHOTOS,
      api_key: API_KEY,
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
