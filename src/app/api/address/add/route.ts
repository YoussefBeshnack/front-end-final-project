import { NextResponse } from 'next/server';
import { requestExternalApi } from '../../../../lib/serverApi';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// POST /api/address/add
export async function POST(req: Request) {
  const result = await requestExternalApi({
    url: `${API_URL}/addresses`,
    method: 'POST',
    failureMessage: 'Failed to add address',
    logContext: '[POST /api/address/add]',
    prepareBody: async () => {
      const body = await req.json();

      if (!body.name || !body.details || !body.phone || !body.city) {
        return {
          response: NextResponse.json(
            { status: 'fail', message: 'Missing required fields' },
            { status: 400 }
          ),
        };
      }

      return { body };
    },
  });

  return result.response;
}
