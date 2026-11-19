import { NextRequest, NextResponse } from 'next/server';
import { requestExternalApi } from '../../../../lib/serverApi';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// DELETE /api/wishlist/[productId]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;

  if (!productId) {
    return NextResponse.json(
      { status: 'fail', message: 'productId is required' },
      { status: 400 }
    );
  }

  const result = await requestExternalApi<{
    status?: string;
    message?: string;
    data?: unknown[];
  }>({
    request: req,
    tokenSource: 'session-or-header',
    url: `${API_URL}/wishlist/${productId}`,
    method: 'DELETE',
    cache: 'no-store',
    failureMessage: 'Failed to remove product',
    logContext: '[DELETE /api/wishlist/[productId]]',
  });

  if (!result.ok) return result.response;

  const items = Array.isArray(result.data.data) ? result.data.data : [];

  return NextResponse.json({
    status: result.data.status,
    message: result.data.message,
    count: items.length,
    data: items.map(id => ({ id })),
  });
}
