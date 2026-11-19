import { NextResponse } from 'next/server';
import { requestExternalApi } from '../../../../lib/serverApi';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// GET /api/address/[addressId]
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ addressId: string }> }
) {
  const { addressId } = await params;
  const result = await requestExternalApi({
    url: `${API_URL}/addresses/${addressId}`,
    method: 'GET',
    cache: 'no-store',
    failureMessage: 'Failed to fetch address',
    logContext: '[GET /api/address/[addressId]]',
  });

  return result.response;
}

// PUT /api/address/[addressId]
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ addressId: string }> }
) {
  const body = await req.json();

  const { name, details, phone, city } = body;

  if (!name || !details || !phone || !city) {
    return NextResponse.json(
      { status: 'fail', message: 'All fields are required' },
      { status: 400 }
    );
  }

  const { addressId } = await params;
  const result = await requestExternalApi({
    url: `${API_URL}/addresses/${addressId}`,
    method: 'PUT',
    body,
    cache: 'no-store',
    failureMessage: 'Failed to update address',
    logContext: '[PUT /api/address/[addressId]]',
  });

  return result.response;
}
