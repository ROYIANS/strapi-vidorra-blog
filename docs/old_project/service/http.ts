import { createFetch, type CreateFetchOptions, type UseFetchOptions } from '@vueuse/core';

type IFetchParams = {
  url: string,
  data: unknown,
  params: object
}

const objectToSearch = (params: Record<string, any>) => {
  let searchParams = '';
  if (Object.keys(params).length > 0) {
    for (const key in params) {
      searchParams += `${key}=${params[key]}&`;
    }
    searchParams = searchParams.slice(0, searchParams.length - 1);
  }
  return searchParams;
}

class Fetch {
  instances;
  constructor(params: CreateFetchOptions) {
    const {
      baseUrl,
      combination = 'chain',
      fetchOptions = {
        mode: 'cors',
      },
      options,
    } = params;
    this.instances = createFetch({
      baseUrl,
      combination,
      options,
      fetchOptions,
    });
  }
  get(
    { url, params = {} }: Omit<IFetchParams, 'data'>,
    featOptions: UseFetchOptions = {}
  ) {
    return this.instances(
      `${url}${objectToSearch(params) ? `?${objectToSearch(params)}` : ''}`,
      featOptions
    ).json();
  }
  post(
    { url, data, params = {} }: IFetchParams,
    featOptions: UseFetchOptions = {}
  ) {
    return this.instances(
      `${url}${objectToSearch(params) ? `?${objectToSearch(params)}` : ''}`,
      featOptions
    )
      .post(data)
      .json();
  }
  put(
    { url, data, params = {} }: IFetchParams,
    featOptions: UseFetchOptions = {}
  ) {
    return this.instances(
      `${url}${objectToSearch(params) ? `?${objectToSearch(params)}` : ''}`,
      featOptions
    )
      .put(data)
      .json();
  }
  patch(
    { url, data, params = {} }: IFetchParams,
    featOptions: UseFetchOptions = {}
  ) {
    return this.instances(
      `${url}${objectToSearch(params) ? `?${objectToSearch(params)}` : ''}`,
      featOptions
    )
      .patch(data)
      .json();
  }
  delete(
    { url, params = {} }: IFetchParams,
    featOptions: UseFetchOptions = {}
  ) {
    return this.instances(
      `${url}${objectToSearch(params) ? `?${objectToSearch(params)}` : ''}`,
      featOptions
    )
      .delete()
      .json();
  }
}

export default Fetch;
