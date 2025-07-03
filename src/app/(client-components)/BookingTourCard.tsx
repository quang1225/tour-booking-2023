import { Tour } from '@/queries/types'
import { getTourDetailLink } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'

export interface TourPriceDetailProps {
  tourDetail: Tour | undefined
}

export default function BookingTourCard({ tourDetail }: TourPriceDetailProps) {
  const { id, name = '', categories = [], duration = '' } = tourDetail || {}

  return (
    <div className="flex flex-col sm:flex-row sm:items-center">
      <div className="flex-shrink-0 w-full sm:w-40">
        <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
          <Link href={getTourDetailLink({ id, name })}>
            <Image
              alt=""
              fill
              sizes="200px"
              src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            />
          </Link>
        </div>
      </div>
      <div className="py-5 sm:px-5 space-y-3">
        <Link
          href={getTourDetailLink({ id, name })}
          className="text-base font-medium mt-1 block"
        >
          {name}
        </Link>
        <span className="block text-sm text-neutral-500 dark:text-neutral-400">
          {categories?.map((category) => category.name)?.join(' | ')}
        </span>
        <span className="block text-sm text-neutral-500 dark:text-neutral-400">
          {duration}
        </span>

        <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
        {/* <StartRating /> */}
      </div>
    </div>
  )
}
