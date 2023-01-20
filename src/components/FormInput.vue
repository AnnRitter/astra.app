<template>
	<div class="field">
			<label
				:for="inputId"
				class="field__label label-flex"
			>
				{{ title }}
				<div v-if="hasTooltip" class="tooltip" @click="toggleTooltip">
					<div :class="{ tooltipText: true, active: tooltipActive}" >
						Password must contain 8+ symbols, 1 special and 2 capital letters
					</div>
			</div>
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
		'hasVisibility',
		'hasTooltip'],
	emits: ['update:modelValue'],
	data () {
		return {
			isActive: false,
			tooltipActive: false
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
		},
		toggleTooltip () {
			this.tooltipActive = !this.tooltipActive
		}
	}
}
</script>

<style scoped lang="scss">
.field {
	background: #FFFFFF;
	margin-bottom: 25px;

	&__wrap {
		background: #ffffff;
		position: relative;
	}

	&__label {
		display: block;
		font-size: 12px;
		font-weight: 600;
		line-height: 167%;
		color: #000000CC;
		background: #FFFFFF;
		text-align: start;
		padding-left: 20px;
		margin-bottom: 5px;
	}

	&__input {
		display: block;
		width: 100%;
		text-align: start;
		border-style: none;
		border-radius: 50px;
		background: #F3F3FA;
		color: #000000CC;
		outline: none;
		padding: 10px 20px;
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
}
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

.tooltip {
	width: 14px;
	height: 14px;
	background-color: transparent;
	background-image: url('../assets/images/tooltip.svg');
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
	cursor: pointer;
	position: relative;
}

.tooltipText {
	display: none;
	width: 185px;
	position: absolute;
	right: -10px;
	top: -60px;
	font-size: 10px;
	font-weight: 400;
	letter-spacing: -0.4px;
	color: #F3F3F3;
	padding: 7px 11px;
	background: #1E1A3E;
	box-shadow: 0px 10px 36px rgba(0, 0, 0, 0.1);
	border-radius: 8px;

	&::after {
		content: '';
		position: absolute;
		bottom: -2px;
		right: 10px;
		display: block;
		width: 12px;
		height: 12px;
		background: #1E1A3E;
		clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
		transform: rotate(-45deg);
		border-radius: 0 0 0 2px;
	}
}
.label-flex {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.active {
	display: block;
}
</style>
