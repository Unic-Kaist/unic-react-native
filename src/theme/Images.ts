import AppleLogo from '@/assets/images/apple.svg'
import ArrowLeft from '@/assets/images/arrowLeft.svg'
import Back from '@/assets/images/back.svg'
import Dots from '@/assets/images/dots.svg'
import Email from '@/assets/images/email.svg'
import FacebooLogo from '@/assets/images/faceboo.svg'
import GoogleLogo from '@/assets/images/google.svg'
import Hide from '@/assets/images/hide.svg'
import Home from '@/assets/images/home.svg'
import Loc from '@/assets/images/loc.svg'
import Logo from '@/assets/images/logo.svg'
import Metamask from '@/assets/images/metamask.svg'
import Person from '@/assets/images/person.svg'
import Profile from '@/assets/images/user.svg'
import Scan from '@/assets/images/scan.svg'
import { ThemeVariables } from './theme'
import TrustWallet from '@/assets/images/trustWallet.svg'
import TwitterLogo from '@/assets/images/twitter.svg'
import Zap from '@/assets/images/zap.svg'
import Zoom from '@/assets/images/zoom.svg'

export default function ({}: ThemeVariables) {
  return {
    logo: Logo,
    home: Home,
    scan: Scan,
    profile: Profile,
    zap: Zap,
    zoom: Zoom,
    back: Back,
    dots: Dots,
    googleLogo: GoogleLogo,
    twitterLogo: TwitterLogo,
    facebooLogo: FacebooLogo,
    appleLogo: AppleLogo,
    arrowLeft: ArrowLeft,
    loginEmailIcon: Email,
    loginLocIcon: Loc,
    loginPersionIcon: Person,
    loginHideIcon: Hide,
    metamask: Metamask,
    trustWallet: TrustWallet,
  }
}
