<template>
  <div class="main">
    <div class="container with-flex">
			<div class="inner-wrap">
				<a
					class="logout-button"
					href="#"
					@click="logout"
				>
					Выход
				</a>
				<h1
					class="title"
				>
					Hello, {{ capitalize(name) }}!
				</h1>
			</div>
      <main-image/>
    </div>
  </div>
</template>

<script>
import MainImage from '@/components/MainImage.vue'
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
	},
	components: {
		MainImage
	}
}
</script>

<style scoped lang="scss">
  .main {
    &__image {
      width: 100%;
			height: 531px;
			background-image: url('@/assets/images/screen.svg');
			background-position: center;
			background-repeat: no-repeat;
    }
  }
</style>
