import { requestExternalApi } from '../../../../../lib/serverApi';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// DELETE /api/address/remove/[addressId]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ addressId: string }> }
) {
  const { addressId } = await params;
  const result = await requestExternalApi({
    url: `${API_URL}/addresses/${addressId}`,
    method: 'DELETE',
    failureMessage: 'Failed to remove address',
    logContext: '[DELETE /api/address/remove/[addressId]]',
  });

  return result.response;
}
