import { keyboardRender } from './keybord.js';
export function mouseListener() {
	const allBtns = document.querySelectorAll(`div[data-bottom]`);	
	const mainBtns = Array.from(allBtns).filter(item => item.dataset.bottom.length > 0);
	const textField = document.getElementById('textContent');
	const supBtns = document.querySelectorAll(`div[data-name]`);	
	const capsBtn = document.querySelector("div[data-name = 'CapsLock']");
	const tabBtn = document.querySelector("div[data-name = 'Tab']");
	const shiftRightBtn = document.querySelector("div[data-name = 'ShiftRight']");
	const shiftLeftBtn = document.querySelector("div[data-name = 'ShiftLeft']");	
	let sup;

	// Слушаем события основных клавиш

	for (let btn of mainBtns) {

		btn.addEventListener('click', () => {			

			if(!capsBtn.className.includes('active') && shiftRightBtn.className.includes('active') || !capsBtn.className.includes('active') && shiftLeftBtn.className.includes('active') || capsBtn.className.includes('active') && shiftRightBtn.className.includes('active') || capsBtn.className.includes('active') && shiftLeftBtn.className.includes('active')) {				
				
				if(btn.dataset.top) {
					btn.classList.add('active');
					sup = textField.selectionStart + 1;
					textField.setRangeText(btn.dataset.top, textField.selectionStart, textField.selectionEnd, "preserve");				
					setTimeout(function () { return btn.classList.remove('active') }, 100);
				}
				if(!btn.dataset.top) {
					btn.classList.add('active');
					sup = textField.selectionStart + 1;
					textField.setRangeText(btn.dataset.bottom, textField.selectionStart, textField.selectionEnd, "preserve");					
					setTimeout(function () { return btn.classList.remove('active') }, 100);
				}			
			}

			if(!capsBtn.className.includes('active') && !tabBtn.className.includes('active') && !shiftRightBtn.className.includes('active') && !shiftLeftBtn.className.includes('active')) {
				btn.classList.add('active');
				sup = textField.selectionStart + 1;
				textField.setRangeText(btn.dataset.bottom.toLowerCase(), textField.selectionStart, textField.selectionEnd, "preserve");					
				setTimeout(function () { return btn.classList.remove('active') }, 100);
			}			

			if(capsBtn.className.includes('active') && !tabBtn.className.includes('active') && !shiftRightBtn.className.includes('active') && !shiftLeftBtn.className.includes('active')) {				
				btn.classList.add('active');
				sup = textField.selectionStart + 1;
				textField.setRangeText(btn.dataset.bottom, textField.selectionStart, textField.selectionEnd, "preserve");				
				setTimeout(function () { return btn.classList.remove('active') }, 100);
			}
			textField.selectionStart = sup;	
			textField.selectionEnd = sup;
			textField.focus();			
		})			
	}
// Слушаем события вспомогательных клавиш

	for (let btn of supBtns) {

		btn.addEventListener('click', () => {			 

			if(btn.dataset.name === 'CapsLock' || btn.dataset.name.includes('Shift')) {
				btn.classList.toggle('active');
			} else {
				btn.classList.add('active');
				setTimeout(function () { return btn.classList.remove('active')}, 100);
			}				
			if(btn.dataset.name === 'Backspace') {								
				textField.selectionStart = textField.selectionStart - 1;	
				sup = textField.selectionStart;
				textField.setRangeText('', textField.selectionStart, textField.selectionEnd, "end");					
				// textField.value = textField.value.replace(/.$/, "");				
			}
			if(btn.dataset.name === 'Delete') {					
				textField.selectionEnd = textField.selectionEnd + 1;	
				sup = textField.selectionStart;
				textField.setRangeText('', textField.selectionStart, textField.selectionEnd, "end");					
			}
			if(btn.dataset.name === 'Tab') {	
				sup = textField.selectionStart + 3;			
				textField.setRangeText(`   `, textField.selectionStart, textField.selectionEnd, "end");		
			} 
			if(btn.dataset.name === 'Space') {
				sup = textField.selectionStart + 1;		
				textField.setRangeText(' ', textField.selectionStart, textField.selectionEnd, "end");				
			}
			if(btn.dataset.name === 'Enter') {
				sup = textField.selectionStart + 1;		
				textField.setRangeText('\n', textField.selectionStart, textField.selectionEnd, "end");						
			}
			if(btn.dataset.name === 'ControlLeft' &&  shiftRightBtn.className.includes('active') || btn.dataset.name === 'ControlLeft' &&  shiftLeftBtn.className.includes('active') || btn.dataset.name === 'ControlRight' &&  shiftRightBtn.className.includes('active') || btn.dataset.name === 'ControlRight' &&  shiftLeftBtn.className.includes('active') ) {
				if (localStorage.lang === 'en') {
					localStorage.lang = 'ru';
					keyboardRender();
				} else {
					localStorage.lang = 'en';
					keyboardRender();
				}		
			}
			if(btn.dataset.name === 'ArrowUp') {
				sup = textField.selectionStart + 1;	
				textField.setRangeText('▲', textField.selectionStart, textField.selectionEnd, "end");				
			}	
			if(btn.dataset.name === 'ArrowDown') {
				sup = textField.selectionStart + 1;	
				textField.setRangeText('▼', textField.selectionStart, textField.selectionEnd, "end");				
			}		
			if(btn.dataset.name === 'ArrowLeft') {
				sup = textField.selectionStart + 1;	
				textField.setRangeText('◄', textField.selectionStart, textField.selectionEnd, "end");				
			}
			if(btn.dataset.name === 'ArrowRight') {
				sup = textField.selectionStart + 1;	
				textField.setRangeText('►', textField.selectionStart, textField.selectionEnd, "end");				
			}

			textField.selectionStart = sup;	
			textField.selectionEnd = sup;
			textField.focus();
			
		})
	}
}
