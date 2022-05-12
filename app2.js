const words = ["kinda", "bulky", "maino", "cardy"];
const wordIndex = Math.floor(Math.random() * words.length);
const wordInPlay = words[wordIndex].toUpperCase();
let currentGuess = "";
console.log("InPlay:", wordInPlay);

const keys = [
    'Q','W','E','R','T','Y','U','I','O','P',
    'A','S','D','F','G','H','J','K','L',
    'DEL','Z','X','C','V','B','N','M','ENTER'
]
const rows = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
]

let currentRow = 0
let currentInputBox = 0

$(() => {
    // Extra for textbook learning:
    // const makeKeymap = () => {
        //     keys.forEach((alphabet => {
            //         $key= $("<button>").text(alphabet)
            //         $(".key-container").append($key)
            //     }))
// }
// makeKeymap();

// Make Keyboard
const makeKey = () => {
    for (const key of keys) {
        $key= $("<button>").text(key).attr("id", key).addClass("button")
        $(".key-container").append($key)
    }
}
makeKey();

// $(".button").on("click", (event) => {
    // will cause all to do print// for (key of keys)
    // unnecessary. just nest // handleKeyClick(event.target.id);
    //     console.log(event.target.id)
    // })

    // Unnessary 
    // const handleKeyClick = (event) => {
        //     console.log("clicked!" + event.target)
// }

// Create Board, Row, Element, Button
const makeRows = () => {
    for (let i=0; i< rows.length; i++) {
        $row= $("<div>").addClass("row").attr("id", `row${i}`)
                $(".input-container").append($row)
                // Make Input Box
                for (let j=0; j<5; j++) {
                    $input= $("<div>").addClass("input").attr("id", `row${i}box${j}`)
                    $row.append($input)
                }}}
makeRows()

// Extra for textbook learning:
// const makeRowsmap = (row, index) => {
//     rows.forEach((row => {
    //         $row= $("<div>").attr("id", row.id) // what is the index?
    //         $(".input-container").append($row)
    //     }))
    // }
    
    // makeRowsmap()
    
    $(".button").on("click", (event) => {
        if (event.target.id === "DEL") {
            deleteLetter()
        } else
        if (event.target.id === "ENTER") {
            checkRow()
        } else {
        AddLetter(event.target.id)}
    })
    
    const AddLetter = (key) => {
        if (currentRow < 6 && currentInputBox < 5 ) {
        let x = `#row${currentRow}box${currentInputBox}`  
        console.log("x:", x)
        $(x).text(key)
        //$(x).attr("data", key)
        rows[currentRow][currentInputBox] = key
        console.log(rows)
        currentInputBox++
        }
    }
    const deleteLetter = () => {
        if(currentInputBox > 0){
        currentInputBox--
        let y = `#row${currentRow}box${currentInputBox}`  
        $(y).text("")
       // $(y).data("")
        rows[currentRow][currentInputBox] = ""
        }
        console.log(rows)
    }  
    const checkRow = () => {
        if (currentInputBox > 4) { // it never exceeds 5
            let guessInPlay = rows[currentRow].join('')
            console.log("p: ",wordInPlay, guessInPlay)

            if (wordInPlay === guessInPlay) {
                showMessage("Congrats you've won!")
            } else 
                if (currentRow < 5 ) {
                currentRow ++
                currentInputBox = 0
                } else {
                    showMessage("Try again!")
                    console.log ("time to refresh page")
                }
        }
    }
    const showMessage = (msg) => {
        $message = $("<p>").text(msg)
        $(".message-container").append($message)
    }


});

/*
1. User input first row of 4 characters (restricted)
2. User submits
- if user did not fill 4 characters, alert error
3. CheckInput to match each character
- if user got all correct, alert winner message 
- if not all correct, change colour of current row's boxes to reflect if correct or wrong
4. Next row now open for user to input another row of 4
- if by the 4th row still notcorrect, alert try again message
*/