import { requestExternalApi } from '../../../lib/serverApi';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// GET /api/address
export async function GET(req: Request) {
  const result = await requestExternalApi({
    request: req,
    tokenSource: 'header',
    url: `${API_URL}/addresses`,
    method: 'GET',
    cache: 'no-store',
    failureMessage: 'Failed to fetch addresses',
    logContext: '[GET /api/address]',
  });

  return result.response;
}
