import { Auth } from 'aws-amplify'

// Sign up a user with name, email and passwod
export const cognitoSignUp = async (email: string, password: string) => {
  try {
    return await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
      },
    })
  } catch (error) {
    console.log('error signing up: ', error)
  }
}

export const resendSignUp = email => {
  return Auth.resendSignUp(email)
    .then(data => {})
    .catch(err => {
      console.log('There was an error re-sending sign up.')
      throw err
    })
}

export const cognitoSignIn = async (email: string, password: string) => {
  let user: object | string
  try {
    const user = await Auth.signIn(email, password)
    return user
  } catch (error: any) {
    if (error.code === 'UserNotConfirmedException') {
      user = 'UserNotConfirmedException'
    } else {
      user = error.code
    }
    return user
  }
}

export const cognitoSignOut = async () => {
  try {
    await Auth.signOut()
    console.log('signOut ')
  } catch (error) {
    console.log('error signing out: ', error)
  }
}
