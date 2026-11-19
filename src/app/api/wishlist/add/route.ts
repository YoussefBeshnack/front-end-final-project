import { NextResponse } from 'next/server';
import { requestExternalApi } from '../../../../lib/serverApi';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// GET /api/wishlist/add
export async function POST(req: Request) {
  const result = await requestExternalApi<{
    status?: string;
    data?: unknown[];
  }>({
    request: req,
    tokenSource: 'session-or-header',
    url: `${API_URL}/wishlist`,
    method: 'POST',
    failureMessage: 'Failed to add product',
    logContext: '[POST /api/wishlist/add]',
    prepareBody: async () => {
      const { productId } = await req.json();
      return { body: { productId } };
    },
  });

  if (!result.ok) return result.response;

  const items = Array.isArray(result.data.data) ? result.data.data : [];
  return NextResponse.json({
    status: result.data.status,
    count: items.length,
    data: items.map(id => ({ id })),
  });
}
