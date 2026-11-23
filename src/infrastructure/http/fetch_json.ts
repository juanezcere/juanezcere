import { DataLoadError } from '../../errors/data_load_error';

export async function fetchJson(url: string): Promise<unknown> {
  let response: Response;

  try {
    response = await fetch(url, { headers: { Accept: 'application/json' } });
  } catch (error) {
    throw new DataLoadError(`Could not fetch ${url}.`, { cause: error });
  }

  if (!response.ok) {
    throw new DataLoadError(`Request to ${url} failed with status ${response.status}.`);
  }

  try {
    return (await response.json()) as unknown;
  } catch (error) {
    throw new DataLoadError(`Response from ${url} is not valid JSON.`, { cause: error });
  }
}
