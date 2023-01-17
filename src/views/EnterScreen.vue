<template>
	<div class="enter">
		<div class="container">
			<h1 class="title enter__title">Ready for a great User experience?</h1>
			<p class="text enter__text">Bring your media to the next level!</p>
			<div class="enter__buttons">
				<router-link
					to="/signup"
					class="enter__signup"
				>
					Sign Up
				</router-link>
				<router-link
					to="/signin"
					class="enter__signin"
				>
				</router-link>
			</div>
			<div class="enter__image"></div>
		</div>
	</div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
	.enter {
		margin-top: 65px;

		&__title {
			margin-bottom: 20px;
		}

		&__text {
			margin-bottom: 30px;
		}

		&__buttons {
			display: flex;
			justify-content: center;
			gap: 15px;
			margin-bottom: 45px;
		}
		&__signup {
			font-weight: 500;
			line-height: 143%;
			color: #000000;
			background: #fff;
			text-decoration: none;
			border-radius: 50px;
			padding: 15px 35px;
		}

		&__signin {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background: #1E1A3E;
			background-image: url('@/assets/images/arrow_forward.svg');
			background-position: center;
			background-repeat: no-repeat;
		}

		&__image {
			width: 100%;
			height: 372px;
			background-image: url('@/assets/images/woman.svg');
			background-position: center;
			background-repeat: no-repeat;
		}
	}
</style>
