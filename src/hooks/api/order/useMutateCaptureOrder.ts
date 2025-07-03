'use client'

import {
  CaptureOrderApiPayload,
  CaptureOrderApiResponse,
} from '@/app/api/paypal/capture_order/route'
import useSWRMutation from 'swr/mutation'

const captureOrderApi = async (
  url: string,
  { arg }: { arg: CaptureOrderApiPayload }
) =>
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => res.json())

export default function useMutateCaptureOrder() {
  const { trigger: captureOrder, isMutating: loadingCaptureOrder } =
    useSWRMutation<
      CaptureOrderApiResponse,
      any,
      string,
      CaptureOrderApiPayload
    >('/api/paypal/capture_order', captureOrderApi)

  return { captureOrder, loadingCaptureOrder }
}
