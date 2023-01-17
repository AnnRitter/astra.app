<template>
  <div class="signup">
		<div class="container">
			<h1 class="title signup__title">Sign Up</h1>
			<form-sign-up></form-sign-up>
		</div>
  </div>
</template>

<script>
import FormSignUp from '@/components/FormSignUp.vue'
export default {
	components: {
		FormSignUp
	}
}
</script>

<style scoped lang="scss">
.signup {
	margin-top: 65px;

	&__title {
		margin-bottom: 20px;
	}
}
</style>
