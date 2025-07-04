/* eslint-disable no-redeclare */

import React, { useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowForwardIos } from '@mui/icons-material'

import Button from '../Button'
import { IconType } from '../types'
import { Route } from 'next'

interface ListItemConfig {
  link: Route
  className: string
  onAction: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  actionIcon?: IconType
}

type ListType = 'link' | 'text' | 'action' | 'heading'

type ListItemProps = {
  className?: string
  childClasses?: string
  index?: string
  linkPath?: Route
  actionIcon?: IconType
  onAction?: (index: string) => void
}

type ImagePathProps = ListItemProps & {
  isImage: true
  imagePath: string | null
  text?: string | null
  type?: ListType
}
type NoImagePathProps = ListItemProps & {
  isImage?: false
  text: string | null
  type: ListType
}

function getListChild(
  type: ListType | undefined,
  text: string | null,
  config?: ListItemConfig
) {
  switch (type) {
    case 'heading':
    case 'text':
      return (
        <p
          className={`${
            type === 'heading' ? 'text-darkGray font-bold' : 'text-darkGray'
          }  ${config?.className}`}
        >
          {text || '-'}
        </p>
      )
    case 'link':
      return (
        <Link href={config?.link || '/'}>
          <span
            className={`text-darkGray font-bold underline ${config?.className}`}
          >
            {text || '-'}
          </span>
        </Link>
      )
    case 'action':
      return (
        <Button
          type="button"
          variant="secondary"
          rightIcon={config?.actionIcon || ArrowForwardIos}
          className={config?.className}
          onClick={config?.onAction}
        >
          {text}
        </Button>
      )
    default:
      throw new Error(`Unhandled type: ${type}`)
  }
}

function ListItem(props: NoImagePathProps): JSX.Element
function ListItem(props: ImagePathProps): JSX.Element
function ListItem(
  props: ListItemProps & {
    isImage?: boolean
    imagePath?: string | null
    text?: string | null
    type?: ListType
  }
) {
  const { type, text, className, imagePath, isImage, index, onAction } = props
  const classes = className || 'flex-1'

  const onActionClick = useCallback(() => {
    if (index !== undefined && onAction) {
      onAction?.(`${index}`)
    }
  }, [index, onAction])

  const Child = isImage ? (
    <div
      className={`w-full h-full overflow-hidden ${
        !imagePath ? 'bg-lightGray rounded-xl ' : ''
      } ${className}`}
    >
      {imagePath ? (
        <Image alt="" src={imagePath} width={300} height={300} />
      ) : null}
    </div>
  ) : (
    getListChild(type, text || '', {
      link: props.linkPath || '/',
      className: props.childClasses || '',
      actionIcon: props.actionIcon,
      onAction: onActionClick,
    })
  )

  return <div className={classes}>{Child}</div>
}

export default ListItem
