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
"Horse",
"Hotel",
"House",
"Image",
"Index",
"Input",
"Issue",
"Judge",
"Knife",
"Layer",
"Level",
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
"Yucky",
"Yeast"
];
const wordIndex = Math.floor(Math.random() * words.length);
const wordInPlay = words[wordIndex].toUpperCase();
console.log("InPlay:", wordInPlay);

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "DEL",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "ENTER",
];
const rows = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

let currentRow = 0;
let currentInputBox = 0;

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
      $key = $("<button>").text(key).attr("id", key).addClass("button");
      $(".key-container").append($key);
    }
  };
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
    for (let i = 0; i < rows.length; i++) {
      $row = $("<div>").addClass("row").attr("id", `row${i}`);
      $(".input-container").append($row);
      // Make Input Box
      for (let j = 0; j < 5; j++) {
        $input = $("<div>").addClass("input").attr("id", `row${i}box${j}`);
        $row.append($input);
      }
    }
  };
  makeRows();

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
      deleteLetter();
    } else if (event.target.id === "ENTER") {
      checkRow();
    } else {
      AddLetter(event.target.id);
    }
  });

  const AddLetter = (key) => {
    if (currentRow < 6 && currentInputBox < 5) {
      let x = `#row${currentRow}box${currentInputBox}`;
      console.log("x:", x);
      $(x).text(key);
      //$(x).attr("data", key)
      rows[currentRow][currentInputBox] = key;
      console.log(rows);
      currentInputBox++;
    }
  };
  const deleteLetter = () => {
    if (currentInputBox > 0) {
      currentInputBox--;
      let y = `#row${currentRow}box${currentInputBox}`;
      $(y).text("");
      // $(y).data("")
      rows[currentRow][currentInputBox] = "";
    }
    console.log(rows);
  };
  const checkRow = () => {
    if (currentInputBox > 4) {
      // it never exceeds 5
      let guessInPlay = rows[currentRow].join("");
      console.log("p: ", wordInPlay, guessInPlay);
      flipInputBox(currentRow);

      if (wordInPlay === guessInPlay) {
        showMessage("Correct!");
        refreshPageOption();
      } else if (currentRow < 5) {
        currentRow++;
        currentInputBox = 0;
      } else {
        showMessage("Try again!");
        refreshPageOption();
      }
    }
  };
  const showMessage = (msg) => {
    // $message = $("<p>").text(msg)
    // $(".message-container").append($message)
    $("h1").text(msg);
  };
  const refreshPageOption = () => {
    $refresh = $("<button>")
      .addClass("refresh")
      .text("Click here to play again");
    $(".message-container").append($refresh);

    $refresh.on("click", () => {
      location.reload();
    });
  };
  const flipInputBox = (currentRow) => {
    const M = `#row${currentRow}`;
    let rowOfInputs = $(M).children().text(); // this is a string
    let remainder_guess = wordInPlay.split(""); // this is an array
    console.log(rowOfInputs, remainder_guess)

    for (let i = 0; i < 5; i++) {
      const N = `#row${currentRow}box${i}`;
      const Z = rowOfInputs[i];
      const K = `#${Z}`;

      if (wordInPlay[i] === rowOfInputs[i]) {
        $(N).addClass("flipGreen");
        $(K).addClass("flipGrey");
        remainder_guess[i] = "";
      }
      console.log("Step1_remainderGuess", remainder_guess);
    }
    // return remainder_guess
    flipInputBoxStep2(remainder_guess)
};

const flipInputBoxStep2 = (remainder_guess) => {
  // if (guess.includes(rowOfInputs[i]) && ($(N).attr("class") != "flipGreen")) {

  console.log("Step2_Guess", remainder_guess);
  const M = `#row${currentRow}`;
  let rowOfInputs = $(M).children().text(); // this is a string

  for (let i = 0; i < 6; i++) {
    const N = `#row${currentRow}box${i}`;
    const Z = rowOfInputs[i];
    const K = `#${Z}`;

    if (remainder_guess.includes(rowOfInputs[i])) {
      // console.log(i, $(N).attr("class"))
      $(N).addClass("flipYellow");
      $(K).addClass("flipGrey");
    } else {
      $(N).addClass("flipGrey");
      $(K).addClass("flipGrey");
    }
  }
};

});