import { NextResponse } from 'next/server';
import { decodeAuthUserToken } from '../utils/decodeAuthUserToken';

type TokenSource = 'session' | 'header' | 'session-or-header';

interface ExternalApiRequestOptions {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  failureMessage: string;
  logContext: string;
  request?: Request;
  tokenSource?: TokenSource;
  body?: unknown;
  prepareBody?: () => Promise<
    { body: unknown } | { response: NextResponse }
  >;
  cache?: RequestCache;
}

type ExternalApiRequestResult<T> =
  | { ok: true; data: T; response: NextResponse }
  | { ok: false; data?: T; response: NextResponse };

export async function requestExternalApi<T = unknown>({
  url,
  method,
  failureMessage,
  logContext,
  request,
  tokenSource = 'session',
  body,
  prepareBody,
  cache,
}: ExternalApiRequestOptions): Promise<ExternalApiRequestResult<T>> {
  const sessionToken =
    tokenSource === 'header' ? null : await decodeAuthUserToken();
  const requestToken =
    tokenSource === 'session' ? null : request?.headers.get('token');
  const token =
    tokenSource === 'header'
      ? requestToken
      : tokenSource === 'session-or-header'
        ? sessionToken || requestToken
        : sessionToken;

  if (!token) {
    return {
      ok: false,
      response: NextResponse.json(
        { status: 'fail', message: 'User is not authenticated' },
        { status: 401 }
      ),
    };
  }

  try {
    let requestBody = body;
    if (prepareBody) {
      const prepared = await prepareBody();
      if ('response' in prepared) {
        return { ok: false, response: prepared.response };
      }
      requestBody = prepared.body;
    }

    const upstream = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      ...(requestBody === undefined
        ? {}
        : { body: JSON.stringify(requestBody) }),
      ...(cache ? { cache } : {}),
    });
    const data = (await upstream.json()) as T;

    if (!upstream.ok) {
      const message =
        data && typeof data === 'object' && 'message' in data
          ? data.message
          : undefined;

      return {
        ok: false,
        data,
        response: NextResponse.json(
          {
            status: 'fail',
            message:
              typeof message === 'string' && message
                ? message
                : failureMessage,
          },
          { status: upstream.status }
        ),
      };
    }

    return { ok: true, data, response: NextResponse.json(data) };
  } catch (error) {
    console.error(logContext, error);
    return {
      ok: false,
      response: NextResponse.json(
        { status: 'fail', message: 'Network error' },
        { status: 500 }
      ),
    };
  }
}
