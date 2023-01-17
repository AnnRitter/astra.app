<template>
	<form class="form" @submit.prevent>
		<div class="form__field">
			<label
				for="name"
				class="label"
			>
				Full name
			</label>
			<input
				type="text"
				id="name"
				class="input"
			>
		</div>
		<div class="form__field">
			<label
				for="email"
				class="label"
			>
				Email
			</label>
			<input
				v-model="email"
				type="text"
				name="email"
				id="email"
				class="input"
			>
			<span
				v-if="v$.email.$error"
				class="form__error"
			>
				{{ v$.email.$errors[0].$message }}
			</span>
		</div>
		<div class="form__field">
			<label
				for="password"
				class="label"
			>
				Password
			</label>
			<input
				v-model="password.password"
				type="password"
				name="password"
				id="password"
				class="input"
			>
			<span
				v-if="v$.password.password.$error"
				class="form__error"
			>
				{{ v$.password.$errors[0].$message }}
			</span>
		</div>
		<div class="form__field">
			<label
				for="repeat"
				class="label"
			>
				Repeat password
			</label>
			<input
				v-model="password.confirm"
				type="password"
				name="repeat"
				id="repeat"
				class="input"
			>
			<span
				v-if="v$.password.confirm.$error"
				class="form__error"
			>
				{{ v$.password.confirm.$errors[0].$message }}
			</span>
		</div>
		<button
			class="form__signup"
			@click="submit"
		>
			Sign Up
		</button>
	</form>
	<p class="form__text">Already have an account?</p>
	<router-link to="/signin" class="form__text">Sign In</router-link>
</template>

<script>

import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'

const validatePassword = (value) => value.exec('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[!#$%&? "]).*$')

export default {
	data () {
		return {
			v$: useVuelidate(),
			email: '',
			password: {
				password: '',
				confirm: ''
			}
		}
	},
	validations () {
		return {
			email: {
				required: helpers.withMessage('Enter valid email', required),
				email
			},
			password: {
				password: {
					required: helpers.withMessage('Enter valid password', required),
					minLength: minLength(8),
					validatePassword
				},
				confirm: {
					required: helpers.withMessage('Enter correct password', required),
					sameAs: sameAs(this.password.password)
				}
			}
		}
	},
	methods: {
		submit () {
			this.v$.$validate()
			console.log(this.password.password)
			console.log(this.v$)
			const reg = /^.*(?=.{2,}[A-Z]).*$/
			console.log(reg.test('AAabc1!'))
		}
	}

}
</script>

<style scoped lang="scss">
.form {
	max-width: 230px;
	width: 100%;
	background: #FFFFFF;
	border-radius: 40px;
	padding: 23px 22px 18px;
	margin: 0 auto 30px;

	&__signup {
		font-weight: 500;
		line-height: 143%;
		color: #FFFFFF;
		background: #1E1A3E;
		border-style: none;
		border-radius: 50px;
		padding: 15px 80px;
	}

	&__text {
		font-weight: 500;
		line-height: 143%;
		color: #1E1A3E;
	}

	&__error {
		display: block;
		font-size: 10px;
		line-height: 200%;
		color: #FF6683;
		background: #FFFFFF;
		text-align: start;
		padding-left: 20px;
	}

	&__field {
		background: #FFFFFF;
		margin-bottom: 25px;
	}
}
</style>
