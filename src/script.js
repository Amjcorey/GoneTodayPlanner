// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
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
      // Get the formatted hour
      let hourLabel = formatHour(hour); 
      // Create a div for the time block
      let timeBlock = $("<div>").addClass("row time-block"); 
      let hourCol = $("<div>")
        .addClass("col-2 col-md-1 hour text-center py-3")
        // Create the hour column
        .text(hourLabel); 
        // Create the text area
      let textArea = $("<textarea>").addClass("col-8 col-md-10 description"); 
      let saveBtn = $("<button>")
        .addClass("btn saveBtn col-2 col-md-1")
        .attr("aria-label", "save")
        .html('<i class="fas fa-save"></i>');

      // TODO: Add a listener for click events on the save button. This code should
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
  if (hour < currentHour) {
    timeBlock.addClass('past');
  } else if (hour === currentHour) {
    timeBlock.addClass('present');
  } else {
    timeBlock.addClass('future');
  }

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //Storing event description in localStorage unpon button click

  let saveBtn = $(".saveBtn");
  saveBtn.on("click", function () {
    let eventId = $(this).attr("id");
    let eventDesc = $(this).parent().siblings().children(".description").val();
    localStorage.setItem(eventId, eventDesc);
  });
  //
  // TODO: Add code to display the current date in the header of the page.
  // Call the displayCurrentDay and createTimeBlocks functions
  displayCurrentDay();
  createTimeBlocks();

  // Update the time blocks every minute to check for past, present, or future
  setInterval(function () {
    createTimeBlocks();
  }, 60000);
});
