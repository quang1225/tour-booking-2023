declare module 'react-use-keypress'

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type CommonResponse = {
  message: string
  status: number
  data?: object
}
