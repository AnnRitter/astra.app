<template>
	<div class="field">
			<label
				:for="inputId"
				class="field__label"
			>
				{{ title }}
			</label>
			<div class="field__wrap">
				<input
					:value="modelValue"
					:type="typeInput"
					:id="inputId"
					:class="{field__input: true, error: hasError}"
					@input="change"
				>
				<div
					:class="{icon: hasVisibility, active: isActive }"
					@click="toggle"
				></div>
			</div>
			<span
				v-if="hasError"
				class="field__error"
			>
				{{ errorText }}
			</span>
		</div>
</template>

<script>
export default {
	props: [
		'modelValue',
		'inputType',
		'inputId',
		'title',
		'hasError',
		'errorText',
		'hasVisibility'],
	emits: ['update:modelValue'],
	data () {
		return {
			isActive: false
		}
	},
	computed: {
		typeInput () {
			return this.hasVisibility && this.isActive ? 'text' : this.inputType
		}
	},
	methods: {
		capitalize (string) {
			return string.charAt(0).toUpperCase() + string.slice(1)
		},
		change (event) {
			this.$emit('update:modelValue', event.target.value)
		},
		toggle () {
			this.isActive = !this.isActive
		}
	}
}
</script>

<style scoped>
.icon {
	position: absolute;
	right: 10px;
	top: 10px;
	width: 20px;
	height: 20px;
	background: transparent;
	background-image: url('../assets/images/visibility.svg');
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
}

.active {
	background-image: url('../assets/images/visibility_off.svg');
}
</style>
