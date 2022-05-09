import {mouseListener} from './mouse-events.js';


// Рендерим блок клавиатуры и текстовый блок в html

const docBody = document.body;

let keybordCreator = function () {

	const wrapper = document.createElement('div');
	wrapper.id = 'keybord-wrapper';
	const textrareaWrapper = document.createElement('div');
	textrareaWrapper.id = 'textrarea-wrapper';
	const textContent = document.createElement('textarea');
	textContent.autofocus = true;
	textContent.spellcheck = false;
	textContent.id = 'textContent';
	const keybord = document.createElement('div');
	keybord.id = 'keybord';

	textrareaWrapper.append(textContent);
	wrapper.append(textrareaWrapper, keybord);
	docBody.append(wrapper);
}
keybordCreator();

// Наполняем масив keyCode клавиш клавиатуры, для чего по очереди (порядно) нажимаем нужные клавиши клавиатуры и после смотрим В консоли массив и когда он наполнен копируем его содержимое в keyArr

// let keyArr = [];
// document.addEventListener('keypress', (e) => {// 	
// 	keyArr.push(e.key); 
//	console.log(e);
//	console.log(keyArr);
// })

let keyArr = [['~', '`'], ['!', '1'], ['@', '2'], ['#', '3'], ['$', '4'], ['%', '5'], ['^', '6'], ['&', '7'], ['*', '8'], ['(', '9'], [')', '0'], ['_', '-'], ['+', '='], 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', ['{', '['], ['}', ''], 'Delete', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', [':', ';'], ['&quot;', '&apos;'], ['|', '\\'], 'Enter', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ['<', ','], ['>', '.'], ['?', '/'], '&#9650;', 'Shift', 'Ctrl', 'Meta', 'Alt', 'Space', 'Alt', 'Ctrl', '&#9668;', '&#9660;', '&#9658;'];

let secondKeyArr = ['Ё', ['!', '1'], ['&quot;', '2'], ['№', '3'], [';', '4'], ['%', '5'], [':', '6'], ['?', '7'], ['*', '8'], ['(', '9'], [')', '0'], ['_', '-'], ['+', '='], 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'Delete', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', ['/', '\\'], 'Enter', 'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', [',', '.'], '&#9650;', 'Shift', 'Ctrl', 'Meta', 'Alt', 'Space', 'Alt', 'Ctrl', '&#9668;', '&#9660;', '&#9658;'];

const keybord = document.getElementById('keybord');

export function keyboardRender() {

	let result = '';

	if (!localStorage.getItem('lang')) {
		localStorage.setItem('lang', 'en');
	}	

	if (localStorage.getItem('lang') === 'en') {

		for (let i = 0; i < keyArr.length; i++) {
			if (Array.isArray(keyArr[i])) {
				result += `<div class="keybord-button" data-top="${keyArr[i][0]}" data-bottom="${keyArr[i][1]}"><span id='top'>${keyArr[i][0]}</span><span id='bottom'>${keyArr[i][1]}</span></div>`;
			}
			else {
				result += `<div class="keybord-button" data-bottom="${keyArr[i]}"><span id='bottom'>${keyArr[i]}</span></div>`;
			}
		}
		keybord.innerHTML = result;
		result = '';
	}

	if (localStorage.getItem('lang') === 'ru') {

		for (let i = 0; i < secondKeyArr.length; i++) {
			if (Array.isArray(secondKeyArr[i])) {
				result += `<div class="keybord-button" data-top="${secondKeyArr[i][0]}" data-bottom="${secondKeyArr[i][1]}"><span id='top'>${secondKeyArr[i][0]}</span><span id='bottom'>${secondKeyArr[i][1]}</span></div>`;
			}
			else {
				result += `<div class="keybord-button" data-bottom="${secondKeyArr[i]}"><span id='bottom'>${secondKeyArr[i]}</span></div>`;
			}
		}
		
		keybord.innerHTML = result;
		result = '';
	}

	const metaBtn = document.querySelector("div[data-bottom = 'Meta']");
	const spaceBtn = document.querySelector("div[data-bottom = 'Space']");
	const enterBtn = document.querySelector("div[data-bottom = 'Enter']");
	const bkspBtn = document.querySelector("div[data-bottom = 'Backspace']");
	const tabBtn = document.querySelector("div[data-bottom = 'Tab']");
	const delBtn = document.querySelector("div[data-bottom = 'Delete']");
	const capsBtn = document.querySelector("div[data-bottom = 'CapsLock']");
	const shiftBtns = document.querySelectorAll("div[data-bottom = 'Shift']");
	const ctrlBtns = document.querySelectorAll("div[data-bottom = 'Ctrl']");
	const altBtns = document.querySelectorAll("div[data-bottom = 'Alt']");
	const arrowLeft = document.querySelector("div[data-bottom = '◄']");
	const arrowRight = document.querySelector("div[data-bottom = '►']");
	const arrowUp = document.querySelector("div[data-bottom = '▲']");
	const arrowDown = document.querySelector("div[data-bottom = '▼']");



	// Добавляем вспомогательным кнопкам дата-атрибуты для идентификации левый/правый

	function supBtnsProp() {
		metaBtn.dataset.bottom = '';
		metaBtn.dataset.name = 'Meta';

		spaceBtn.dataset.bottom = '';
		spaceBtn.dataset.name = 'Space';

		enterBtn.dataset.bottom = '';
		enterBtn.dataset.name = 'Enter';

		bkspBtn.dataset.bottom = '';
		bkspBtn.dataset.name = 'Backspace';

		tabBtn.dataset.bottom = '';
		tabBtn.dataset.name = 'Tab';

		delBtn.dataset.bottom = '';
		delBtn.dataset.name = 'Delete';

		capsBtn.dataset.bottom = '';
		capsBtn.dataset.name = 'CapsLock';

		shiftBtns[0].dataset.bottom = '';
		shiftBtns[0].dataset.name = 'ShiftLeft';
		shiftBtns[1].dataset.bottom = '';
		shiftBtns[1].dataset.name = 'ShiftRight';

		ctrlBtns[0].dataset.bottom = '';
		ctrlBtns[0].dataset.name = 'ControlLeft';
		ctrlBtns[1].dataset.bottom = '';
		ctrlBtns[1].dataset.name = 'ControlRight';

		altBtns[0].dataset.bottom = '';
		altBtns[0].dataset.name = 'AltLeft';
		altBtns[1].dataset.bottom = '';
		altBtns[1].dataset.name = 'AltRight';

		arrowLeft.dataset.bottom = '';
		arrowLeft.dataset.name = 'ArrowLeft';
		arrowRight.dataset.bottom = '';
		arrowRight.dataset.name = 'ArrowRight';
		arrowUp.dataset.bottom = '';
		arrowUp.dataset.name = 'ArrowUp';
		arrowDown.dataset.bottom = '';
		arrowDown.dataset.name = 'ArrowDown';
	}
	supBtnsProp();	
	mouseListener();
}
keyboardRender()


// // Устанавливаем prevent default для событий клавиатуры

document.addEventListener('keydown', e => {
	if (e.key !== 'Enter' && e.code !== 'Space'  && e.code !== 'Space' && e.key !== 'Delete' && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Win') {
		e.preventDefault();
	}
});
document.addEventListener('keyup', e => {
	if (e.key !== 'Enter' && e.code !== 'Space' && e.key !== 'Delete' && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Win') {
		e.preventDefault();
	}
});
document.addEventListener('keypress', e => {
	if (e.key !== 'Enter' && e.code !== 'Space' && e.key !== 'Delete' && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Win') {
		e.preventDefault();
	}
})

// Навешиваем на клавиши класс active при вводе с клавиатуры и выводим текст

const btns = document.getElementsByClassName('keybord-button');
const textArea = document.getElementById('textContent');

textArea.addEventListener('keydown', (e) => {
	
	let help;
	let count = textArea.value.length;

	for (let btn of btns) {

		if (e.key === btn.dataset.name || e.code === btn.dataset.name) {
			btn.classList.add('active');
			if (e.key === 'Tab') {
				textArea.setRangeText(`   `, textArea.selectionStart, textArea.selectionEnd, "end");
			}
		}

		if (e.key === btn.dataset.top && e.shiftKey === true) {
			btn.classList.add('active');
			help = textArea.selectionStart + 1;		
			textArea.setRangeText(btn.dataset.top, textArea.selectionStart, textArea.selectionEnd, "preserve");	
			textArea.selectionStart = help;	
			textArea.selectionEnd = help;
			textArea.focus();			
		}

		if (e.key === btn.dataset.bottom && e.shiftKey === true) {
			btn.classList.add('active');
			textArea.setRangeText(btn.dataset.bottom, textArea.selectionStart, textArea.selectionEnd, "end");			
		}

		if (e.key === btn.dataset.bottom.toLowerCase() && e.shiftKey === true) {
			btn.classList.add('active');
			textArea.setRangeText(btn.dataset.bottom.toLowerCase(), textArea.selectionStart, textArea.selectionEnd, "end");			
		}

		if (e.key === btn.dataset.bottom.toLowerCase() && e.shiftKey === false) {
			btn.classList.add('active');
			textArea.setRangeText(btn.dataset.bottom.toLowerCase(), textArea.selectionStart, textArea.selectionEnd, "end");	
			
			if (textArea.value.length - count > 1) {
				textArea.setRangeText(textArea.value.slice(0, textArea.value.length - 1), textArea.selectionStart, textArea.selectionEnd, "preserve");	
			}
		}

		if (e.key === btn.dataset.bottom && e.shiftKey === false) {
			btn.classList.add('active');
			help = textArea.selectionStart + 1;			
			textArea.setRangeText(btn.dataset.bottom, textArea.selectionStart, textArea.selectionEnd, "preserve");

			textArea.selectionStart = help;	
			textArea.selectionEnd = help;
			textArea.focus();	
			//textArea.value += btn.dataset.bottom;

			if (textArea.value.length - count > 1) {

				textArea.selectionStart = textArea.selectionStart - 1;	
				help = textArea.selectionStart;
				textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd, "end");					
				textArea.selectionStart = help;	
				textArea.selectionEnd = help;
				textArea.focus();
			}
		}
	}
})


textArea.addEventListener('keyup', (e) => {

	for (let btn of btns) {

		if (e.key === btn.dataset.name || e.code === btn.dataset.name) {
			btn.classList.remove('active');
		}

		if (e.key === btn.dataset.top && e.shiftKey === true) {
			btn.classList.remove('active');
		}

		if (e.key === btn.dataset.bottom && e.shiftKey === true) {
			btn.classList.remove('active');			
		}

		if (e.key === btn.dataset.bottom.toLowerCase() && e.shiftKey === false) {
			btn.classList.remove('active');
		}

		if (e.key === btn.dataset.bottom && e.shiftKey === false) {
			btn.classList.remove('active');
		}
	}
})



// if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
// 	e.preventDefault = false;
// }
// 'Tab', 'CapsLock', 'Backspace', 'Delete', 'Enter', 'Shift', 'codeShiftLeft', 'Control', 'Meta', 'Alt', ' ', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight',


// Навешиваем на клавиши класс active при вводе с экрана (тач-скрин) и выводим key клавиши в текстовое поле

// document.addEventListener('touch', (e) => {

// 	if (e.target.className.includes('keybord-button')) {
// 		for (let btn of btns) {
// 			btn.classList.remove('active');
// 		}
// 		e.target.classList.add('active');
// 		setTimeout(() => {
// 			e.target.classList.remove('active');
// 		}, 500);
// 		textArea.innerText += e.target.dataset.left;
// 	}
// })

console.log('Для корректной работы ввода с реальной клавиатуры необходимо чтобы ваш язык ввода совпадал с текущим языком ввода виртуальной клавиатуры. \n Переключение языка ввода при вводе с клавиатуры - Shift + Ctrl, при вводе мышкой - клик по Shift а затем клик по  Ctrl')