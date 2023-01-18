import axios from 'axios'

export default {
	namespaced: true,
	state () {
		return {
			token: localStorage.getItem('token'),
			userData: {
				name: '',
				email: ''
			}
		}
	},
	mutations: {
		setToken (state, token) {
			state.token = token
			localStorage.setItem('token', token)
		},
		setUserData (state, data) {
			state.userData.name = data.name
			state.userData.email = data.email
		},
		logout (state) {
			state.token = null
			localStorage.removeItem('token')
		}
	},
	actions: {
		async login ({ commit, dispatch }, payload) {
			try {
				const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`
				const { data } = await axios.post(URL, { ...payload, returnSecureToken: true })
				commit('setToken', data.idToken)
				dispatch('getUserData', payload.email)
			} catch (e) {
				console.log(e.response.data.error.message)
			}
		},
		async register ({ commit }, payload) {
			try {
				const userData = {
					name: payload.name,
					email: payload.email
				}
				const URL_REG = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_API_KEY}`
				const { data } = await axios.post(URL_REG, { ...payload, returnSecureToken: true })
				commit('setToken', data.idToken)

				await axios.post('https://astra-app-d8e70-default-rtdb.firebaseio.com/users.json', userData)
				commit('setUserData', userData)
			} catch (e) {
				console.log(e.response.data.error.message)
			}
		},
		async getUserName (_, email) {
			const resultData = await axios.get('https://astra-app-d8e70-default-rtdb.firebaseio.com/users.json')
			const results = Object.keys(resultData.data).map(key => {
				return {
					email: resultData.data[key].email,
					name: resultData.data[key].name
				}
			})
			results.forEach(result => {
				if (result.email === email) {
					console.log(result.name)
				}
			})
		}
	},
	getters: {
		token (state) {
			return state.token
		},
		isAuth (_, getters) {
			return !!getters.token
		}
	}
}
