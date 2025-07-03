import { avatarColors } from '@/contains'
import React, { FC } from 'react'
import Image, { StaticImageData } from 'next/image'

export interface AvatarProps {
  containerClassName?: string
  sizeClass?: string
  radius?: string
  imgUrl?: string | StaticImageData | null
  userName?: string
  hasChecked?: boolean
  hasCheckedClass?: string
}

const Avatar: FC<AvatarProps> = ({
  containerClassName = 'ring-1 ring-white dark:ring-neutral-900',
  sizeClass = 'h-6 w-6 text-sm',
  radius = 'rounded-full',
  imgUrl = '',
  userName = '',
  hasChecked,
  hasCheckedClass = 'w-4 h-4 -top-0.5 -right-0.5',
}) => {
  const _setBgColor = (name: string) => {
    const backgroundIndex = Math.floor(name.charCodeAt(0) % avatarColors.length)
    return avatarColors[backgroundIndex]
  }

  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
      style={{
        backgroundColor: imgUrl ? undefined : _setBgColor(userName),
      }}
    >
      {imgUrl && (
        <Image
          className={`absolute inset-0 w-full h-full object-cover ${radius}`}
          src={imgUrl}
          alt={userName}
          width={48}
          height={48}
        />
      )}
      <span className="wil-avatar__name">{userName[0]}</span>

      {hasChecked && (
        <span
          className={` bg-teal-500 rounded-full text-white text-xs flex items-center justify-center absolute  ${hasCheckedClass}`}
        >
          <i className="las la-check"></i>
        </span>
      )}
    </div>
  )
}

export default Avatar
