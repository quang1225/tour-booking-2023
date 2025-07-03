import SpinnerIcon, {
  SpinnerIconProps,
} from '@/app/(client-components)/SpinnerIcon'

export default function CommonSpinner({ size = 'large' }: SpinnerIconProps) {
  return (
    <div className="relative flex justify-center items-center">
      <SpinnerIcon size={size} />
    </div>
  )
}
