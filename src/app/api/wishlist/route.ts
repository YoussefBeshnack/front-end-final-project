import { requestExternalApi } from '../../../lib/serverApi';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// GET /api/wishlist
export async function GET() {
  const result = await requestExternalApi({
    url: `${API_URL}/wishlist`,
    method: 'GET',
    cache: 'no-store',
    failureMessage: 'Failed to fetch wishlist',
    logContext: '[GET /api/wishlist]',
  });

  return result.response;
}
