const words = [
"Abuse",
"Adult",
"Agent",
"Anger",
"Apple",
"Award",
"Basis",
"Beach",
"Birth",
"Block",
"Blood",
"Board",
"Brain",
"Bread",
"Break",
"Brown",
"Buyer",
"Cause",
"Chain",
"Chair",
"Chest",
"Chief",
"Child",
"China",
"Claim",
"Class",
"Clock",
"Coach",
"Coast",
"Court",
"Cover",
"Cream",
"Crime",
"Cross",
"Crowd",
"Crown",
"Cycle",
"Dance",
"Death",
"Depth",
"Doubt",
"Draft",
"Drama",
"Dream",
"Dress",
"Drink",
"Drive",
"Earth",
"Enemy",
"Entry",
"Error",
"Event",
"Faith",
"Fault",
"Field",
"Fight",
"Final",
"Floor",
"Focus",
"Force",
"Frame",
"Frank",
"Front",
"Fruit",
"Glass",
"Grant",
"Grass",
"Green",
"Group",
"Guide",
"Heart",
"Henry",
"Horse",
"Hotel",
"House",
"Image",
"Index",
"Input",
"Issue",
"Japan",
"Jones",
"Judge",
"Knife",
"Laura",
"Layer",
"Level",
"Lewis",
"Light",
"Limit",
"Lunch",
"Major",
"March",
"Match",
"Metal",
"Model",
"Money",
"Month",
"Motor",
"Mouth",
"Music",
"Night",
"Noise",
"North",
"Novel",
"Nurse",
"Offer",
"Order",
"Other",
"Owner",
"Panel",
"Paper",
"Party",
"Peace",
"Peter",
"Phase",
"Phone",
"Piece",
"Pilot",
"Pitch",
"Place",
"Plane",
"Plant",
"Plate",
"Point",
"Pound",
"Power",
"Press",
"Price",
"Pride",
"Prize",
"Proof",
"Queen",
"Radio",
"Range",
"Ratio",
"Reply",
"Right",
"River",
"Round",
"Route",
"Rugby",
"Scale",
"Scene",
"Scope",
"Score",
"Sense",
"Shape",
"Share",
"Sheep",
"Sheet",
"Shift",
"Shirt",
"Shock",
"Sight",
"Simon",
"Skill",
"Sleep",
"Smile",
"Smith",
"Smoke",
"Sound",
"South",
"Space",
"Speed",
"Spite",
"Sport",
"Squad",
"Staff",
"Stage",
"Start",
"State",
"Steam",
"Steel",
"Stock",
"Stone",
"Store",
"Study",
"Stuff",
"Style",
"Sugar",
"Table",
"Taste",
"Terry",
"Theme",
"Thing",
"Title",
"Total",
"Touch",
"Tower",
"Track",
"Trade",
"Train",
"Trend",
"Trial",
"Trust",
"Truth",
"Uncle",
"Union",
"Unity",
"Value",
"Video",
"Visit",
"Voice",
"Waste",
"Watch",
"Water",
"While",
"White",
"Whole",
"Woman",
"World",
"Youth",
];
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

    $("#refresh").on("click", ()=> {
        console.log("refresh page")
        //document.reload()
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
            flipInputBox(currentRow)

            if (wordInPlay === guessInPlay) {
                showMessage("Congrats you've won!")
                return
            } else 
                if (currentRow < 5 ) {
                currentRow ++
                currentInputBox = 0
                } else {
                showMessage("Aww, try again!")
                refreshPageOption()
                console.log ("time to refresh page")
                return
                }
        }
    }
    const showMessage = (msg) => {
        $message = $("<p>").text(msg)
        $(".message-container").append($message) 
    }
    const refreshPageOption =() => {
        $refresh = $("<button>").attr("id", "refresh").text("Click to Play Again")
        $(".message-container").append($refresh) 
    }
    const flipInputBox = (currentRow) => {
        const M = `#row${currentRow}`
        const rowOfInputs = $(M).children().text()
        console.log("kids of ", currentRow, rowOfInputs)
        for (let i=0; i<5; i++) {
            
            const N = `#row${currentRow}box${i}`

            // console.log(wordInPlay[i], rowOfInputs[i], N)
            
            if (wordInPlay[i]===rowOfInputs[i]) {
                $(N).addClass("flipGreen")
            } else 
            if (wordInPlay.includes(rowOfInputs[i])) {
                $(N).addClass("flipYellow")
            } else {
                $(N).addClass("flipGrey")
            }
        }



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