<template>
  <div class="main">
		<a href="#" @click="logout">Выход</a>
    <div class="container">
      <h1>Hello, {{ name }}!</h1>
      <div class="main__image"></div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
	setup () {
		const store = useStore()
		const router = useRouter()
		return {
			store,
			router,
			name: store.state.auth.name
		}
	},
	methods: {
		logout () {
			this.store.commit('auth/logout')
			this.router.push('/')
		}
	}
}
</script>

<style scoped lang="scss">
  .main {
    margin-top: 160px;

    &__image {
      width: 100%;
			height: 531px;
			background-image: url('@/assets/images/screen.svg');
			background-position: center;
			background-repeat: no-repeat;
    }
  }
</style>
