'use client'

import {
  CheckoutApiApiResponse,
  CheckoutApiPayload,
} from '@/app/api/paypal/checkout/route'
import useSWRMutation from 'swr/mutation'

const checkoutApi = async (url: string, { arg }: { arg: CheckoutApiPayload }) =>
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => res.json())

export default function useMutateCheckout() {
  const { trigger: checkout, isMutating: loadingCheckout } = useSWRMutation<
    CheckoutApiApiResponse,
    any,
    string,
    CheckoutApiPayload
  >('/api/paypal/checkout', checkoutApi)

  return { checkout, loadingCheckout }
}
