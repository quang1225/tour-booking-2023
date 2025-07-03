'use client'

import { Be_Vietnam_Pro } from 'next/font/google'
import SiteHeader from './(client-components)/(Header)/SiteHeader'
import './globals.css'
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css'
import '@/styles/index.scss'
import 'rc-slider/assets/index.css'
// import Footer from "@/components/Footer";
import FooterNav from '@/components/FooterNav'
import { ReactNode, useEffect, useState } from 'react'
import { redirect, usePathname } from 'next/navigation'
import {
  AppContext,
  INIT_USER_INFO,
  INIT_USER_INPUT,
  UserInfo,
  UserInput,
} from '@/contexts/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SWRConfig } from 'swr'
import { CommonResponse } from './type'
import useMutateUserInfo from '@/hooks/api/user/useMutateUserInfo'
import { SessionProvider } from 'next-auth/react'
import Cookies from 'js-cookie'
import { IS_USER_LOGGED_KEY, LOGIN_REQUIRED_ROUTES } from '@/contains'

const font = Be_Vietnam_Pro({
  subsets: ['vietnamese'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_APP_ORIGIN}/api/graphql`,
  cache: new InMemoryCache(),
})

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [userInfo, setUserInfoState] = useState<UserInfo>(INIT_USER_INFO)
  const [userInput, setUserInputState] = useState<UserInput>(INIT_USER_INPUT)

  const setUserInfo = (x: UserInfo) => {
    setUserInfoState((prev) => ({ ...prev, ...x }))
  }

  const setUserInput = (x: UserInput) => {
    setUserInputState((prev) => ({ ...prev, ...x }))
  }

  const { getUserInfoMutate, loadingGetUserInfo } =
    useMutateUserInfo(setUserInfo)

  const getUserInfo = async () => {
    return await getUserInfoMutate()
  }

  useEffect(() => {
    const isUserLogged = Cookies.get(IS_USER_LOGGED_KEY)
    if (
      !isUserLogged &&
      LOGIN_REQUIRED_ROUTES.some((x) => pathname.includes(x))
    ) {
      redirect('/')
    }

    getUserInfo()
  }, [])

  return (
    <html lang="en" className={font.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <AppContext.Provider
          value={{
            userInfo,
            userInput,
            getUserInfo,
            setUserInfo,
            setUserInput,
            loadingGetUserInfo,
          }}
        >
          <ApolloProvider client={client}>
            <SWRConfig
              value={{
                onSuccess: (data: CommonResponse) => {
                  const { status, message } = data

                  if (status !== 200) {
                    toast.error(message)
                  }
                },
              }}
            >
              <SessionProvider>
                {!pathname.includes('/admin') && <SiteHeader />}

                {children}
                <FooterNav />
                {/* <Footer /> */}

                <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />
              </SessionProvider>
            </SWRConfig>
          </ApolloProvider>
        </AppContext.Provider>
      </body>
    </html>
  )
}
