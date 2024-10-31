
import Field from './Field'

const AuthForm = () => {
	return <form>
		[Auth Form]
		<br />
		<Field name="field1" placeholder="enter some stuff here" />
		<Field name="field2" label="This is field 2" />
		<Field name="field3" type="button" />
	</form>
}

export default AuthForm
