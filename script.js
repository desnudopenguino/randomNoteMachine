const notes = ['A','Bb/A#','B/Cb','C','C#/Db','D','Eb/D#','E','F','F#/Gb','G','G#/Ab']
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
		document.getElementById('randomNote').textContent = ""
		document.getElementById('generateNote').textContent = "Stop"
	} else {
		document.getElementById('generateNote').textContent = "Next"
		while(canGetNote) {
			let randomNote = selectRandomUnusedNote()
			if(null != randomNote) {
				newNote = randomNote
				canGetNote = false
			}
		}
		document.getElementById('randomNote').textContent = newNote
	}
	if(12 == usedNoteKeys.length) {
		document.getElementById('generateNote').textContent = "Stop"
	}
	if(0 == usedNoteKeys.length) {
		document.getElementById('generateNote').textContent = "Start"
	}
	setCount()
}

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

document.addEventListener("DOMContentLoaded", (event) => {
	setCount()
});
