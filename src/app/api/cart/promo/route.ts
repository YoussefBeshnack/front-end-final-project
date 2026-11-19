import { NextRequest, NextResponse } from 'next/server';
import { requestExternalApi } from '../../../../lib/serverApi';

const API_URL = process.env.NEXT_PUBLIC_API_URL_V2;

// PUT /api/cart/promo
export async function PUT(req: NextRequest) {
  const result = await requestExternalApi({
    url: `${API_URL}/cart/applyCoupon`,
    method: 'PUT',
    failureMessage: 'Coupon is invalid or has expired',
    logContext: '[PUT /api/cart/promo]',
    prepareBody: async () => {
      const { couponName } = await req.json();

      if (!couponName) {
        return {
          response: NextResponse.json(
            { status: 'fail', message: 'couponName is required' },
            { status: 400 }
          ),
        };
      }

      return { body: { couponName } };
    },
  });

  return result.response;
}
