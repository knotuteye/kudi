// const init = () => {
// 	fetch(
// 		'https://prime.exchangerate-api.com/v5/4fff55994a5ddad27798dd80/latest/USD'
// 	)
// 		.then((response) => response.json())
// 		.then((data) => {
// 			for (
// 				let i = 0;
// 				i < document.getElementsByTagName('select').length;
// 				i++
// 			) {
// 				for (const currency in data.conversion_rates) {
// 					let opt = document.createElement('option')
// 					opt.text = currency
// 					opt.value = data.conversion_rates[currency]
// 					document.getElementsByTagName('select')[i].appendChild(opt)
// 				}
// 			}
// 		})
// 		.then(() => {
// 			for (
// 				let i = 0;
// 				i < document.getElementsByTagName('select').length;
// 				i++
// 			) {
// 				document.getElementsByTagName('select')[
// 					i
// 				].value = document.getElementsByTagName('select')[i].children[i+1].value
// 			}
// 		})
// 		.catch((err) => alert(err))
// }
