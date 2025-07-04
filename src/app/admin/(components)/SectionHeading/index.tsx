/* eslint-disable no-redeclare */

import Link from 'next/link'
import React from 'react'
import Button from '../Button'
import { Route } from 'next'
import ButtonPrimary from '@/shared/ButtonPrimary'

type SectionHeadingProps = {
  title: string
  className?: string
}

type SectionHeadingPropsWithLink = SectionHeadingProps & {
  isPath: true
  path: Route
}
type SectionheadingPropsWithoutLink = SectionHeadingProps & { isPath?: false }
type SectionHeadingPropsWithAction = SectionHeadingProps & {
  isAction: true
  onAction: () => void
  buttonText: string
}

function SectionHeading(props: SectionHeadingPropsWithLink): JSX.Element
function SectionHeading(props: SectionheadingPropsWithoutLink): JSX.Element
function SectionHeading(props: SectionHeadingPropsWithAction): JSX.Element
function SectionHeading(
  props: SectionHeadingProps & {
    isPath?: boolean
    isAction?: boolean
    path?: Route
    onAction?: () => void
    buttonText?: string
  }
) {
  const { title, path, className } = props
  return (
    <div
      className={`mb-10 flex flex-row justify-between items-center px-2 ${
        className || ''
      }`}
    >
      <h4 className="text-3xl font-extrabold opacity-70">{title}</h4>
      {props.isPath && (
        <Link href={path || '/'}>
          <span className="ff-lato font-bold underline text-lg">View All</span>
        </Link>
      )}
      {props.isAction && props.buttonText && (
        <div className="w-40">
          <ButtonPrimary type="button" onClick={props.onAction}>
            <b>{props.buttonText}</b>
          </ButtonPrimary>
        </div>
      )}
    </div>
  )
}

export default SectionHeading
