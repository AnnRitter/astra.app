<template>
	<form class="form" @submit.prevent>
		<form-input
			inputType="text"
			inputId="email"
			title="Email"
			:hasError="v$.email.$error"
			:errorText="v$.email.$errors[0]?.$message"
			v-model="email"
		/>
		<form-input
			inputType="password"
			inputId="password"
			title="Password"
			hasVisibility="true"
			:hasError="v$.password.$error"
			:errorText="v$.password.$errors[0]?.$message"
			v-model="password"
		/>
		<button
			:class="{form__submit:true, disabled: disabled}"
			@click="submit"
		>
			Sign In
		</button>
	</form>
	<p
		class="form__link"
	>
		Don’t have an account yet?
	</p>
	<router-link
		to="/signup"
		class="form__link"
	>
		Sign Up
	</router-link>
	<div
		v-if="v$.password.$error || v$.email.$error"
		class="form__error"
	>
		Wrong email or password
	</div>
</template>

<script>

import FormInput from './FormInput.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const validatePassword = (value) => /^(?=.*[!@#$%^&*])(.*?[A-Z]){2,}.*$/.test(value)

export default {
	setup () {
		const store = useStore()
		const router = useRouter()
		return {
			store,
			router
		}
	},
	data () {
		return {
			disabled: false,
			v$: useVuelidate(),
			email: '',
			password: ''
		}
	},
	validations () {
		return {
			email: {
				required: helpers.withMessage('Enter valid email', required),
				email: helpers.withMessage('Enter valid email', email)
			},
			password: {
				required: helpers.withMessage('Enter valid password', required),
				minLength: minLength(8),
				validatePassword: helpers.withMessage('Enter valid password', validatePassword)
			}
		}
	},
	methods: {
		submit () {
			this.v$.$validate()
			if (!this.v$.$error) {
				this.login()
			} else {
				this.disabled = true
			}
		},
		async login () {
			const values = {
				email: this.email,
				password: this.password
			}
			try {
				await this.store.dispatch('auth/login', values)
				this.router.push('/main')
			} catch (e) {
				console.log(e)
			}
		}
	},
	components: {
		FormInput
	}
}
</script>
