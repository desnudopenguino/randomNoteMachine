const notes = ['A','A\u266F/B\u266D','B','C','C\u266F/D\u266D','D','D\u266F/E\u266D','E','F','F\u266F/G\u266D','G','G\u266F/A\u266D']
let usedNoteKeys = []

function selectNote(key) {
	return notes[key]
}

function selectRandomUnusedNote() {
	let randomKey = Math.floor(Math.random() * notes.length)
	if(!usedNoteKeys.includes(randomKey)) {
		usedNoteKeys.push(randomKey)
		return selectNote(randomKey)
	}
	return null
}

function showRandomUnusedNote() {
	let canGetNote = true
	let newNote = ''
	if(12 == usedNoteKeys.length) {
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
	if(12 == usedNoteKeys.length) {
		document.getElementById('generateNote').textContent = "Done"
	}
	if(0 == usedNoteKeys.length) {
		document.getElementById('generateNote').textContent = "Start"
	}
	setCount()
}

// fade out/in the random note text
function fadeText(newText) {
	let textElement = document.getElementById('randomNote')
	textElement.classList.toggle('hidden')
	setTimeout(() => {
		textElement.textContent = newText
		textElement.classList.toggle('hidden')
	}, 200)
}

// set the count
function setCount() {
	document.getElementById('current').textContent = usedNoteKeys.length
	document.getElementById('total').textContent = notes.length
}

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

// set initial count
document.addEventListener("DOMContentLoaded", (event) => {
	setCount()
	document.getElementById('main').classList.remove('hidden')
});
