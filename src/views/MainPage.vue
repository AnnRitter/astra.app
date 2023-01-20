<template>
  <div class="main">
    <div class="container">
      <h1
				class="title"
			>
				Hello, {{ capitalize(name) }}!
			</h1>
      <div class="main__image"></div>
			<a
				class="logout-button"
				href="#"
				@click="logout"
			>
				Выход
			</a>
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
		},
		capitalize (string) {
			return string.charAt(0).toUpperCase() + string.slice(1)
		}
	}
}
</script>

<style scoped lang="scss">
  .main {
    padding-top: 160px;
		padding-bottom: 30px;
    &__image {
      width: 100%;
			height: 531px;
			background-image: url('@/assets/images/screen.svg');
			background-position: center;
			background-repeat: no-repeat;
    }
  }
</style>
