import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server';
import { LINKS } from '../utils/NavigationLinks';
import { getServerUrl } from '../utils/server-url';

export const SearchParamsCache = () =>
  createSearchParamsCache({
    callbackUrl: parseAsString.withDefault(
      `${getServerUrl()}${LINKS.Landing.href}`,
    ),
    p: parseAsInteger.withDefault(0),
  });
