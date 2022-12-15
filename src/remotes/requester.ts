import { Auth } from 'aws-amplify'
import axios from 'axios'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '@/store/user/userState'

const instance = axios.create({
  baseURL: 'https://geralt-beta.unic.io/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

const AxiosInterceptor = ({ children }) => {
  const [user, setUser] = useRecoilState(userState)
  useEffect(() => {
    const resInterceptor = async response => {
      console.log('response', response.data)
      if (
        response.data.success === false &&
        response.data.message === 'Validation Error: Invalid JWT Token.'
      ) {
        try {
          const currentUser = await Auth.currentAuthenticatedUser()
          const currentSession = currentUser.signInUserSession
          currentUser.refreshSession(
            currentSession.refreshToken,
            async (err: { message: string | undefined }, session: any) => {
              if (err) {
                throw Error(err.message)
              }
              setUser({
                ...user,
                accessToken: session.accessToken.jwtToken,
              })

              const originalRequest = response.config
              const object = JSON.parse(originalRequest.data)

              object.accessToken = session.accessToken.jwtToken
              originalRequest.data = JSON.stringify(object)

              return await instance.request(originalRequest)
            },
          )
        } catch (e) {
          console.log('Failed cognitoRefreshSession: ', e)
        }
      }
      return response
    }

    const errInterceptor = async error => {
      if (error.response.status === 401) {
      }

      return Promise.reject(error)
    }

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor,
    )

    return () => instance.interceptors.response.eject(interceptor)
  }, [])

  return children
}

export { instance, AxiosInterceptor }
