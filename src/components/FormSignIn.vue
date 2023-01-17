<template>
	<form class="form" @submit.prevent>
		<label
			for="email"
			class="label"
		>
			Email
		</label>
		<input
			v-model="email"
			type="text"
			id="email"
			class="input"
		>
		<label
			for="password"
			class="label"
		>
			Password
		</label>
		<input
			type="password"
			id="password"
			class="input"
		>
		<button class="form__signin" @click="submit">Sign In</button>
	</form>
	<p class="form__text">Don’t have an account yet?</p>
	<router-link to="/signin" class="form__text">Sign Up</router-link>
</template>

<script>

import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default {
	setup () {
		return { v$: useVuelidate() }
	},
	data () {
		return {
			email: '',
			password: ''
		}
	},
	validations () {
		return {
			email: { required, email },
			password: { required, minLength: minLength(8) }
		}
	},
	methods: {
		submit () {
			this.v$.$validate()
			console.log(this.v$)
			console.log(this.email)
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

	&__signin {
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
}
</style>
