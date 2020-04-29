const init = () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('service-worker.js').catch((err) => {
			if (err) alert(err)
		})
	}
	fetch(
		'https://prime.exchangerate-api.com/v5/4fff55994a5ddad27798dd80/latest/USD'
	)
		.then((response) => response.json())
		.then((data) => {
			let x = document.getElementsByTagName('select')

			for (const currency in data.conversion_rates) {
				let opt = document.createElement('option')
				opt.text = currency
				opt.value = data.conversion_rates[currency]

				x[0].appendChild(opt)
				x[1].appendChild(opt.cloneNode(true))
			}

			x[1].selectedIndex = 1
			let refreshTime = new Date(data.time_last_update * 1000)
			let y = document.getElementById('update-time')
			y.innerText += ` ${refreshTime.getDate()}\\${refreshTime.getMonth()}\\${refreshTime.getFullYear()}`
		})
		.catch(
			(err) =>
				(document.getElementById('update-time').innerText =
					'Sorry, you appear to be offline.')
		)
}

/**
 *
 * @param {Event} event
 */
const convert = (event) => {
	hideKeyboard()
	let input = document.getElementById(
		`input-${event.target.id.slice(-1) == 1 ? 2 : 1}`
	)
	let select = document.getElementById(
		`select-${event.target.id.slice(-1) == 1 ? 2 : 1}`
	)
	try {
		input.value = (
			parseFloat(
				document.getElementById(`input-${event.target.id.slice(-1)}`)
					.value
			) *
			(parseFloat(select.value) /
				parseFloat(
					document.getElementById(
						`select-${event.target.id.slice(-1)}`
					).value
				))
		).toFixed(4)
	} catch (error) {}
}

const hideKeyboard = () => {
	let field = document.createElement('input')
	field.setAttribute('type', 'text')
	document.body.appendChild(field)
	setTimeout(function () {
		field.focus()
		setTimeout(function () {
			field.setAttribute('style', 'display:none;')
		}, 50)
	}, 50)
}
