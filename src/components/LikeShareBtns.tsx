import SpinnerIcon from '@/app/(client-components)/SpinnerIcon'
import useMutateSaveTour from '@/hooks/api/user/useMutateSaveTour'
import React, { FC } from 'react'
import SharePopover from './SharePopover'

export interface LikeShareBtnsnProps {
  tourId: number
  isCard?: boolean
  onClickShare?: () => void
  onClickSave?: () => void
  onSaveSuccess?: () => void
}

const LikeShareBtns: FC<LikeShareBtnsnProps> = ({
  tourId,
  isCard = false,
  onClickShare = () => {},
  onClickSave = () => {},
  onSaveSuccess,
}) => {
  const { saveTour, isTourSaved, loadingSaveTour } = useMutateSaveTour({
    tourId,
    onSaveSuccess,
  })

  const HeartIcon = loadingSaveTour ? (
    <SpinnerIcon />
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        fill={isTourSaved ? 'red' : ''}
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  )

  const onClickSaveHandle = () => {
    saveTour()
    onClickSave()
  }

  if (isCard)
    return (
      <div
        className={`nc-BtnLikeIcon w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
          isTourSaved ? 'nc-BtnLikeIcon--liked' : ''
        } absolute right-3 top-3`}
        data-nc-id="BtnLikeIcon"
        title="Save"
        onClick={onClickSaveHandle}
      >
        {HeartIcon}
      </div>
    )

  return (
    <div className="flow-root">
      <div className="flex text-neutral-700 dark:text-neutral-300 text-sm -mx-3 -my-1.5">
        <SharePopover />

        <span
          onClick={onClickSaveHandle}
          className="py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
        >
          {HeartIcon}
          <span className="hidden sm:block ml-2">Save</span>
        </span>
      </div>
    </div>
  )
}

export default LikeShareBtns
