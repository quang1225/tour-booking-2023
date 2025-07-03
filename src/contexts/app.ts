import { UserInfoApiResponse } from '@/app/api/user/login/route'
import { createContext, useContext } from 'react'

// Partial to free set
export type UserInfo = Partial<{
  email: string
  avatar: string | null
  fullname: string | null
  saveList: number[]
  isAdmin: boolean
  isPasswordSet: boolean
}>

export type UserInput = Partial<{
  startDate: Date
  numberOfAdults: number
  numberOfChilds: number
  numberOfInfants: number
  otherRequest: string
}>

export type AppState = {
  userInfo: UserInfo
  loadingGetUserInfo: boolean
  userInput: UserInput
  getUserInfo: () => Promise<UserInfoApiResponse>
  setUserInfo: (x: UserInfo) => void
  setUserInput: (x: UserInput) => void
}

export const INIT_USER_INFO: UserInfo = {
  email: '',
  avatar: '',
  fullname: '',
  saveList: [],
  isAdmin: false,
  isPasswordSet: true,
}

export const INIT_GUESTS_INPUT = {
  numberOfAdults: 1,
  numberOfChilds: 0,
  numberOfInfants: 0,
}

export const INIT_USER_INPUT: UserInput = {
  startDate: new Date(),
  ...INIT_GUESTS_INPUT,
  otherRequest: '',
}

export const AppContext = createContext<AppState>({
  userInfo: INIT_USER_INFO,
  loadingGetUserInfo: false,
  userInput: INIT_USER_INPUT,
  getUserInfo: async () => ({}) as UserInfoApiResponse,
  setUserInfo: () => {},
  setUserInput: () => {},
})

export const useAppContext = () => useContext(AppContext)
