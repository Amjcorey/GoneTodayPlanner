// When document is ready
$(document).ready(function () {
  // Get current hour using dayjs and display in header
  let currentHour = dayjs().hour();

  //Display current date in header
  function displayDate() {
    let date = dayjs().format("dddd, MMM D YYYY");
    $("#currentDay").text(date);
    // console.log(date);
  }

  // Grabs all save button elements on the html so they can be manipulated in the DOM
  let saveBtnElement = document.getElementsByClassName("saveBtn");

  // Add event listener ("click") to the save button element which iterates over each time slot
  for (let i = 0; i < saveBtnElement.length; i++) {
    saveBtnElement[i].addEventListener("click", saveToDoToLocalStorage);
  }

  // Selects the span tag element on the html so it can be manipulated in the DOM
  let messageSaved = document.getElementById("messageSaved");

  // Function which allows user data to be saved to local storage
  function saveToDoToLocalStorage(event) {
    let toDo = this.previousSibling.previousSibling.value;
    let parentId = this.parentElement.id;
    console.log(parentId);
    localStorage.setItem(parentId, toDo);

    // Message displayed via span tag when save button is clicked
    messageSaved.textContent = "Your event has been saved to local storage ✅";
  }

  // Refactored with JavaScript (JQUERY DRAFTS BELOW)

  // Grabs the class of time-block elements so they can be manipulated in the DOM
  let timeBlocks = document.getElementsByClassName("time-block");

  // Iterates over the time-block class and compares the current hour to the block hour with the if statement and gives rise to the color attributes the user sees delineating past, present, & future time
  for (let i = 0; i < timeBlocks.length; i++) {
    let timeBlock = timeBlocks[i];
    // Grabs local storage data and appends any stored data to the page on re-load
    let parentId = timeBlocks[i].getAttribute("id");
    let textValue = localStorage.getItem(parentId);
    timeBlocks[i].children[1].value = textValue;

    // Adds the focus event listener to save button element so when user saves an event they receive a message letting them know their event has been saved
    timeBlocks[i].children[1].addEventListener("focus", function () {
      messageSaved.textContent = "";
    });

    // Splits the "hour" at the dash and converts the string leftover to a number so it can be compared to the current hour given by the currentHour letiable
    let blockHour = parseInt(timeBlock.id.split("-")[1]);
    console.log(blockHour);

    // Conditional statement which gives rise to the color attributes the user sees delineating past, present, & future time
    if (blockHour < currentHour) {
      timeBlock.classList.add("past");
      timeBlock.classList.remove("present");
      timeBlock.classList.remove("future");
    } else if (blockHour === currentHour) {
      timeBlock.classList.add("present");
      timeBlock.classList.remove("past");
      timeBlock.classList.remove("future");
    } else {
      timeBlock.classList.add("future");
      timeBlock.classList.remove("past");
      timeBlock.classList.remove("present");
    }
  }

  // Call functions
  displayDate();
});





// Old code below is a reference to how one would re-write lines using JQUERY

// Adds past, present, future class to each time block by comparing the id to the current hour using dayjs().hour(). (JQUERY DRAFT 1)
// REFACTOR INTO JAVASCRIPT!!!!
// let currentHour = dayjs().hour();
// $(".time-block").each(function() {
//   let blockHour = parseInt($(this).attr("id").split("-")[1]);
//   console.log(blockHour)
//     console.log($(this).attr("id"));

//     if (blockHour < currentHour) {
//       $(this).addClass("past").removeClass("present future");
//     } else if (blockHour === currentHour) {
//       $(this).addClass("present").removeClass("past future");
//     } else {
//       $(this).addClass("future").removeClass("past present");
//     }
// })

// function displayTimeBlocks() {
//   let currentTime = dayjs().hour();

// $(".time-block").each(function () {
//   let timeBlock = parseInt($(this).attr("id").split("hour")[1]);
//   console.log(timeBlock, currentTime);

// if (timeBlock < currentTime) {
//   $(this).addClass("past");
//   $(this).removeClass("present");
//   $(this).removeClass("future");
// } else if (timeBlock === currentTime) {
//   $(this).removeClass("past");
//   $(this).addClass("present");
//   $(this).removeClass("future");
// } else {
//   $(this).removeClass("past");
//   $(this).removeClass("present");
//   $(this).addClass("future");
// }

// }