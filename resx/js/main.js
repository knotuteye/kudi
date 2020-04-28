const init = () => {
	setTimeout(function () {
		let viewheight = $(window).height()
		let viewwidth = $(window).width()
		let viewport = document.querySelector('meta[name=viewport]')
		viewport.setAttribute(
			'content',
			'height=' +
				viewheight +
				'px, width=' +
				viewwidth +
				'px, initial-scale=1.0'
		)
	}, 300)
	fetch(
		'https://prime.exchangerate-api.com/v5/4fff55994a5ddad27798dd80/latest/USD'
	)
		.then((response) => response.json())
		.then((data) => {
			for (
				let i = 0;
				i < document.getElementsByTagName('select').length;
				i++
			) {
				for (const currency in data.conversion_rates) {
					let opt = document.createElement('option')
					opt.text = currency
					opt.value = data.conversion_rates[currency]
					document.getElementsByTagName('select')[i].appendChild(opt)
				}
			}
			let refreshTime = new Date(data.time_last_update * 1000)
			document.getElementById(
				'update-time'
			).innerText += ` ${refreshTime.getDate()}\\${refreshTime.getMonth()}\\${refreshTime.getFullYear()}`
		})
		.then(() => {
			for (
				let i = 0;
				i < document.getElementsByTagName('select').length;
				i++
			) {
				document.getElementsByTagName('select')[
					i
				].value = document.getElementsByTagName('select')[i].children[
					i + 1
				].value
			}
		})
		.catch((err) => alert(err))
}

/**
 *
 * @param {Event} event
 */
const convert = (event) => {
	let input = document.getElementById(
		`input-${event.target.id.slice(-1) == 1 ? 2 : 1}`
	)
	let select = document.getElementById(
		`select-${event.target.id.slice(-1) == 1 ? 2 : 1}`
	)
	input.value = (
		parseFloat(
			document.getElementById(`input-${event.target.id.slice(-1)}`).value
		) *
		(parseFloat(select.value) /
			parseFloat(
				document.getElementById(`select-${event.target.id.slice(-1)}`)
					.value
			))
	).toFixed(4)
}
