import { Auth } from 'aws-amplify'
import { useRecoilState } from 'recoil'
import { userState } from '@/store/user/userState'

export default function useCognito() {
  const [user, setUser] = useRecoilState(userState)

  const cognitoRefreshSession = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      const currentSession = currentUser.signInUserSession
      currentUser.refreshSession(
        currentSession.refreshToken,
        (err: { message: string | undefined }, session: any) => {
          if (err) {
            throw Error(err.message)
          }
          console.log(
            'session.accessToken.jwtToken',
            session.accessToken.jwtToken,
          )
          setUser({
            ...user,
            accessToken: session.accessToken.jwtToken,
          })

          return session.accessToken.jwtToken
        },
      )
    } catch (e) {
      console.log('Failed cognitoRefreshSession: ', e)
    }
  }

  return {
    cognitoRefreshSession,
  }
}
