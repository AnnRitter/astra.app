<template>
	<form class="form" @submit.prevent>
		<form-input
			inputType="text"
			inputId="name"
			title="Full name"
			:hasError="v$.name.$error"
			:errorText="v$.name.$errors[0]?.$message"
			v-model="name"
		/>
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
			hasTooltip="true"
			:hasError="v$.password.password.$error"
			:errorText="v$.password.password.$errors[0]?.$message"
			v-model="password.password"
		/>
		<form-input
			inputType="password"
			inputId="repeat"
			title="Repeat password"
			hasVisibility="true"
			:hasError="v$.password.confirm.$error"
			:errorText="v$.password.confirm.$errors[0]?.$message"
			v-model="password.confirm"
		/>
		<button
			class="form__submit"
			@click="submit"
		>
			Sign Up
		</button>
	</form>
	<p class="form__link">Already have an account?</p>
	<router-link
		to="/signin"
		class="form__link"
	>
		Sign In
	</router-link>
</template>

<script>

import FormInput from './FormInput.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'
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
			v$: useVuelidate(),
			name: '',
			email: '',
			password: {
				password: '',
				confirm: ''
			}
		}
	},
	validations () {
		return {
			name: {
				required: helpers.withMessage('Enter your name', required)
			},
			email: {
				required: helpers.withMessage('Enter valid email', required),
				email: helpers.withMessage('Enter valid email', email)
			},
			password: {
				password: {
					required: helpers.withMessage('Enter valid password', required),
					minLength: minLength(8),
					validatePassword: helpers.withMessage('Enter valid password', validatePassword)
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
			if (!this.v$.$error) {
				this.register()
			}
		},
		async register () {
			const values = {
				name: this.name,
				email: this.email,
				password: this.password.password
			}
			try {
				await this.store.dispatch('auth/register', values)
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
