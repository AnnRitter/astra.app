<template>
<div class="signin">
		<div class="container">
			<h1 class="title signin__title">Sign In</h1>
			<form-sign-in></form-sign-in>
		</div>
  </div>
</template>

<script>
import FormSignIn from '@/components/FormSignIn.vue'
export default {
	components: {
		FormSignIn
	}
}
</script>

<style scoped lang="scss">
.signin {
	margin-top: 65px;

	&__title {
		margin-bottom: 20px;
	}
}
</style>
