# Vue Cryptocurrency Icons

Inheriting image resources from [cryptocurrency-icons](https://github.com/spothq/cryptocurrency-icons) and writing a version that can be used in Vue 3.

The biggest difference is that the original cryptocurrency-icons need to import images directly from node_module, for example:

`import avax from './node_modules/cryptocurrency-icons/svg/color/avax.svg'`.

But in tools like Vite, it is not easy to import images directly from node_module. It requires some other configurations.

## Install 🚀

```bash
$ npm install vue-cryptocurrency-icons
```

Vue Global on `main.js`

```js
import VueCryptocurrencyIcons from 'vue-cryptocurrency-icons'

app.use(VueCryptocurrencyIcons)
```

Component

```js
<VueCryptocurrencyIcons name="Avax" />
```

## Props

Prop | Options | Default | Description
---- | ---------| ------------ | -----
name | btc, eth, sol, usdc...etc | null | Please refer to the list of currency names in [manifest.json](./manifest.json).
type | svg, png | svg | Image Type
size | 32, 2x, 128, number (when type is png) | default is 32 when type is svg | Ignore when using svg. Please customize width and height with style.
theme | color | black,color, white | icon color


## Methods

### icons
取得 icons list

```js
import { icons } from 'vue-cryptocurrency-icons'
console.log(icons)

/**
 * [
 * 	{symbol: '$PAC', name: 'PACcoin', color: '#f5eb16'},
 *  ...
 * ]
*/
```

### getIcon
Manually get the icon's base64

```js
import { getIcon } from 'vue-cryptocurrency-icons'
getIcon({
  name: 'btc',
  type: 'svg',
  size: '32',
  theme: 'white',
}).then((res) => {
  console.log(res)
})
console.log(myIcon)
// {default: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org….45c.975.243 4.118.696 3.61 2.733z'/%3e%3c/svg%3e"}
```

