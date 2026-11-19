import { NextRequest, NextResponse } from 'next/server';
import { requestExternalApi } from '../../../../lib/serverApi';

const API_URL = process.env.NEXT_PUBLIC_API_URL_V2;

// DELETE /api/cart/[productId]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const result = await requestExternalApi({
    url: `${API_URL}/cart/${productId}`,
    method: 'DELETE',
    failureMessage: 'Failed to remove product',
    logContext: '[DELETE /api/cart/[productId]]',
  });

  return result.response;
}

// PUT /api/cart/[productId]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const result = await requestExternalApi({
    url: `${API_URL}/cart/${productId}`,
    method: 'PUT',
    failureMessage: 'Failed to update quantity',
    logContext: '[PUT /api/cart/[productId]]',
    prepareBody: async () => {
      const { count } = await req.json();

      if (count === undefined || count < 1) {
        return {
          response: NextResponse.json(
            { status: 'fail', message: 'count must be >= 1' },
            { status: 400 }
          ),
        };
      }

      return { body: { count } };
    },
  });

  return result.response;
}
