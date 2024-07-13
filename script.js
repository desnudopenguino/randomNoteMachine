const sets = {
	notes: ['A', 'A\u266F/B\u266D', 'B', 'C', 'C\u266F/D\u266D', 'D', 'D\u266F/E\u266D', 'E', 'F', 'F\u266F/G\u266D', 'G', 'G\u266F/A\u266D'],
	majorKeys: [ 'A', 'B\u266D', 'B', 'C\u266D', 'C', 'C\u266F', 'D\u266D', 'D', 'E\u266D', 'E', 'F', 'F\u266F', 'G\u266D', 'G', 'A\u266D']
}

let currentSet = "notes"
if(localStorage.currentSet) {
	currentSet = localStorage.currentSet
}
let currentSetList = sets[currentSet]
let usedNoteKeys = []

const selectNote = (key) => {
	return currentSetList[key]
}

const selectRandomUnusedNote = () => {
	let randomKey = Math.floor(Math.random() * currentSetList.length)
	if(!usedNoteKeys.includes(randomKey)) {
		usedNoteKeys.push(randomKey)
		return selectNote(randomKey)
	}
	return null
}

const showRandomUnusedNote = () => {
	let canGetNote = true
	let newNote = ''
	if(currentSetList.length == usedNoteKeys.length) {
		usedNoteKeys = []
		fadeText("")
	} else {
		document.getElementById('generateNote').textContent = "Next"
		while(canGetNote) {
			let randomNote = selectRandomUnusedNote()
			if(null != randomNote) {
				newNote = randomNote
				canGetNote = false
			}
		}
		fadeText(newNote)
	}
	if(currentSetList.length == usedNoteKeys.length) {
		document.getElementById('generateNote').textContent = "Done"
	}
	if(0 == usedNoteKeys.length) {
		document.getElementById('generateNote').textContent = "Start"
	}
	setCount()
}

// fade out/in the random note text
const fadeText = (newText) => {
	let textElement = document.getElementById('randomNote')
	textElement.textContent = newText
}

// set the count
const setCount = () => {
	document.getElementById('current').textContent = usedNoteKeys.length
	document.getElementById('total').textContent = currentSetList.length
}

const renderContent = () => {
	if(document.getElementById('generateNote')) {
		usedNoteKeys = []
		setCount()
		document.getElementById('generateNote').textContent = "Start"
		document.getElementById('randomNote').textContent = ''
		// capture space to start/continue the iteration
		document.getElementById('generateNote').onclick = (e) => {
			showRandomUnusedNote()
		}
		// capture button press to start/continue iteration
		document.onkeyup = (e) => {
			if('Space' == e.code) {
				showRandomUnusedNote()
			}
		}
	}
	else if (!document.getElementById('generateNote')) {
		document.onkeyup = null;
		if(document.getElementById('settings')) {
			let keyOptions = document.querySelectorAll("[name='key']")
			keyOptions.forEach(keyOption => {
				keyOption.addEventListener('change', (e) => {
					currentSet = e.target.value
					localStorage.setItem('currentSet', currentSet)
					currentSetList = sets[currentSet]
				})
				if(keyOption.value == currentSet) {
					keyOption.checked = true;
				}
			})
		}
	}
}

// set initial count
document.addEventListener("turbo:load", (event) => {
	renderContent()
	document.getElementById('main').classList.remove('hidden');
});

document.addEventListener("turbo:frame-render", (event) => {
	renderContent()
})


