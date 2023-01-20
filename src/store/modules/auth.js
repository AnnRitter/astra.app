import axios from 'axios'

export default {
	namespaced: true,
	state () {
		return {
			token: localStorage.getItem('token'),
			name: localStorage.getItem('name')
		}
	},
	mutations: {
		setUserData (state, data) {
			state.token = data.token
			state.name = data.name
			localStorage.setItem('token', data.token)
			localStorage.setItem('name', data.name)
		},
		logout (state) {
			state.token = null
			state.name = null
			localStorage.removeItem('token')
			localStorage.removeItem('name')
		}
	},
	actions: {
		async register ({ commit, dispatch }, payload) {
			try {
				const URL_REG = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_API_KEY}`
				const { data } = await axios.post(URL_REG, { ...payload, returnSecureToken: true })
				const userData = {
					name: payload.name,
					token: data.idToken
				}
				commit('setUserData', userData)
				dispatch('sendUserData', payload)
			} catch (e) {
				console.log(e.response.data.error.message)
			}
		},
		async login ({ commit, dispatch }, payload) {
			try {
				const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`
				const { data } = await axios.post(URL, { ...payload, returnSecureToken: true })
				const userName = await dispatch('getUserName', payload.email)
				console.log(userName)
				const userData = {
					name: userName,
					token: data.idToken
				}
				commit('setUserData', userData)
			} catch (e) {
				console.log(e.response.data.error.message)
				throw new Error(e)
				// обработать ошибку, вывести сообщение
			}
		},
		async sendUserData (_, payload) {
			const regData = {
				name: payload.name,
				email: payload.email
			}
			await axios.post('https://astra-app-d8e70-default-rtdb.firebaseio.com/users.json', regData)
		},
		async getUserName (_, email) {
			const { data } = await axios.get('https://astra-app-d8e70-default-rtdb.firebaseio.com/users.json')
			const results = Object.keys(data).map(key => {
				return {
					email: data[key].email,
					name: data[key].name
				}
			})
			const userData = results.find(result => {
				console.log(result.email)
				console.log(email)
				return result.email === email
			})
			return userData.name
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
