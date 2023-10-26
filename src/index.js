import { h, defineComponent, ref } from 'vue'
import icons from '../manifest.json'
import fileUnknownOutlined from './assets/fileUnknownOutlined.svg'
import fp from 'lodash/fp'

const getIcon = function (config) {
	const { name, type, size, theme } = config
	const isIconExist = icons.find(item => {
		return item.symbol === name.toUpperCase() || item.name === fp.capitalize(name)
	})
	return new Promise ((resolve, reject) => {
		if (isIconExist) {
			const filePath = () => {
				switch (type) {
					case 'svg':
						return import(`../svg/${theme}/${isIconExist.symbol.toLowerCase()}.svg`, { assert: { type: 'svg' } })
					case 'png':
						return import(`../${size}/${theme}/${isIconExist.symbol.toLowerCase()}.png`, { assert: { type: 'png' } })
				}
			}
			return resolve(filePath())
		} else {
			return reject(new Error(`[vue-crypto-currency-icon] Unable to find the icon for ${name}.`))
		}
	})
}

const VueCryptocurrencyIcons = defineComponent({
	props: [
		'name',
		'type',
		'size',
		'theme'
	],
	setup (props) {
		const icon = ref('')
		const setIcon = async function () {
			getIcon({
				name: props.name && props.name !== '' ? props.name : null,
				type: props.type && props.type !== '' ? props.type : 'svg',
				size: props.size && props.size !== '' ? props.size : '32',
				theme: props.theme && props.theme !== '' ? props.theme : 'color'
			}).then(res => {
				icon.value = res.default
			}).catch(err => {
				console.error(err)
				icon.value = fileUnknownOutlined
			})
		}

		return () => {
			setIcon()
			return h('img', { src: icon.value })
		}
	}
})

const Plugin = {
  install(app, options) {
		app.component('VueCryptocurrencyIcons', VueCryptocurrencyIcons)
  }
}

export default Plugin

export { icons, getIcon, VueCryptocurrencyIcons }
