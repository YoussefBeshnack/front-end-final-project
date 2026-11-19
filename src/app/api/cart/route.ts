import { requestExternalApi } from '../../../lib/serverApi';

const API_URL = process.env.NEXT_PUBLIC_API_URL_V2;

// GET /api/cart
export async function GET() {
  const result = await requestExternalApi({
    url: `${API_URL}/cart`,
    method: 'GET',
    cache: 'no-store',
    failureMessage: 'Failed to fetch cart',
    logContext: '[GET /api/cart]',
  });

  return result.response;
}

// DELETE /api/cart
export async function DELETE() {
  const result = await requestExternalApi({
    url: `${API_URL}/cart`,
    method: 'DELETE',
    cache: 'no-store',
    failureMessage: 'Failed to delete cart',
    logContext: '[DELETE /api/cart]',
  });

  return result.response;
}
