import { keyboardRender } from './keybord.js'

// Сохраняем в localStorage выбранный пользователем язык ввода, и задаем сочетание клавиш для его изменения

let counter = [];

function languageToggle() {	

	if (!localStorage.getItem('lang')) {
		localStorage.setItem('lang', 'en');
	}

	document.addEventListener('keydown', (e) => {
		if (e.repeat) {
			return;
		}
		counter.push(e.code);
	})

	document.addEventListener('keyup', () => {
		if (counter.length === 0) {
			return;
		}
		if (counter.length == 2 && counter.includes('ControlLeft') && counter.includes('ShiftLeft')) {
			if (localStorage.lang === 'en') {
				localStorage.lang = 'ru';
				keyboardRender();
			} else {
				localStorage.lang = 'en';
				keyboardRender();
			}
		}
		counter.length = 0;
	})
}

languageToggle();
