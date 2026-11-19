import { NextRequest, NextResponse } from 'next/server';
import { requestExternalApi } from '../../../../lib/serverApi';

const API_URL = process.env.NEXT_PUBLIC_API_URL_V2;

// POST /api/cart/add
export async function POST(req: NextRequest) {
  const result = await requestExternalApi({
    url: `${API_URL}/cart`,
    method: 'POST',
    failureMessage: 'Failed to add to cart',
    logContext: '[POST /api/cart/add]',
    prepareBody: async () => {
      const { productId } = await req.json();

      if (!productId) {
        return {
          response: NextResponse.json(
            { status: 'fail', message: 'productId is required' },
            { status: 400 }
          ),
        };
      }

      return { body: { productId } };
    },
  });

  return result.response;
}
