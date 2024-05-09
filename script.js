const notes = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#']
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
	}
	while(canGetNote) {
		let randomNote = selectRandomUnusedNote()
		console.log(randomNote)
		if(null != randomNote) {
			newNote = randomNote
			canGetNote = false
		}
	}
	document.getElementById('randomNote').textContent = newNote
	document.getElementById('current').textContent = usedNoteKeys.length
	document.getElementById('total').textContent = notes.length
}

// capture space to start/continue the iteration

document.getElementById('generateNote').onclick = (e) => {
	showRandomUnusedNote()
}

// capture button press to start/continue iteration
document.onkeypress = (e) => {
	if('Space' == e.code) {
		showRandomUnusedNote()
	}
}

