<template>
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
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
export default {
	setup () {
		return { v$: useVuelidate() }
	},
	data () {
		return {
			email: ''
		}
	},
	validations () {
		return {
			email: { required, email }
		}
	}
}
</script>
