// When document is ready
$(document).ready(function () {
  let currentHour = dayjs().hour(); // Get current hour using dayjs

  //Display today's date in header
  function displayDate() {
    let date = dayjs().format("dddd, MMM D YYYY");
    $("#currentDay").text(date);
    //console.log(date);
  }

  // Create and display time blocks
  function displayTimeBlock() {
    // Loop over each work hour and create time blocks
    $.each(workHours, function (hour) {
      var hourLabel = formatHour(hour); // Get the formatted hour
      var timeBlock = $("<div>").addClass("row time-block"); // Create a div for the time block
      var hourCol = $("<div>")
        .addClass("col-2 col-md-1 hour text-center py-3")
        .text(hourLabel); // Create the hour column
      var textArea = $("<textarea>").addClass("col-8 col-md-10 description"); // Create the text area
      var saveBtn = $("<button>")
        .addClass("btn saveBtn col-2 col-md-1")
        .attr("aria-label", "save")
        .html('<i class="fas fa-save"></i>'); 


// Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?        
      saveBtn.click(function (e) {
        e.preventDefault();
        let saveClick = textArea.val();
        localStorage.setItem(saveClick);
      });
    });
  }



  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  $(".time-block-div").each(function () {
    let timeDiv = $(this).attr("id").split("-")[1];

    if (currentHour == timeDiv) {
      $(this).addClass("Present");
      $(this).children(".description").addClass("white-text");
    } else if (currentHour < timeDiv) {
      $(this).removeClass("Present");
      $(this).addClass("Future");
    } else if (currentHour > timeDiv) {
      $(this).removeClass("Future");
      $(this).addClass("Past");
    }
  });
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  displayDate();
  displayTimeBlock();
});
