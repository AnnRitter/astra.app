<template>
	<label
			:for="type"
			class="label"
		>
			{{ capitalize(type) }}
		</label>
		<input
			:type="type"
			:id="type"
			class="input"
		>
</template>

<script>
export default {
	props: {
		type: {
			type: String
		}
	},
	methods: {
		capitalize (string) {
			return string.charAt(0).toUpperCase() + string.slice(1)
		}
	}
}
</script>
