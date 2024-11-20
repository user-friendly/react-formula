
import Bar from './Bar'
import Ham from './Ham'
import {Modal as CartModal} from '../Cart'
import NavBarUserFriendly from '../NavBarUserFriendly'

export default () => {
	return <>
		<Ham />
		<Bar />
		<CartModal />
		<NavBarUserFriendly />
	</>
}
