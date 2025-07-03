'use client'

import {
  UserSaveTourApiPayload,
  UserSaveTourApiResponse,
} from '@/app/api/user/save-tour/route'
import { useAppContext } from '@/contexts/app'
import { debounce } from '@mui/material'
import { toast } from 'react-toastify'
import useSWRMutation from 'swr/mutation'

const userSaveTourApi = async (
  url: string,
  { arg }: { arg: UserSaveTourApiPayload }
) =>
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => res.json())

export interface UseMutateSaveTourProps {
  tourId: number | undefined
  onSaveSuccess?: () => void
}

export default function useMutateSaveTour({
  tourId = 0,
  onSaveSuccess,
}: UseMutateSaveTourProps) {
  const { userInfo, setUserInfo } = useAppContext()

  const isTourSaved = !!userInfo.saveList?.includes(tourId)

  const { trigger: saveTourMutate, isMutating: loadingSaveTour } =
    useSWRMutation<
      UserSaveTourApiResponse,
      any,
      string,
      UserSaveTourApiPayload
    >('/api/user/save-tour', userSaveTourApi)

  const saveTour = debounce(async () => {
    if (!tourId) {
      toast.error('Tour ID invalid')
      return
    }

    if (!userInfo.email) {
      toast.info('Please login to save tours')
      return
    }

    const saveTourRes = await saveTourMutate({
      tourId,
      isSave: !isTourSaved,
    })

    if (saveTourRes.status === 200) {
      setUserInfo({ saveList: saveTourRes.data.savedList })
      onSaveSuccess?.()
    }
  }, 200)

  return { saveTour, loadingSaveTour, isTourSaved }
}
