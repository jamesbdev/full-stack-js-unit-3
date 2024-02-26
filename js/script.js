const nameInput = document.querySelector("#name");

nameInput.focus();

const displayTextField = () => {
    const otherJobInput = document.querySelector("#other-job-role");
    const jobRole = document.querySelector("#title");
    //hide the other job input field by default
    otherJobInput.setAttribute("hidden", "");

    jobRole.addEventListener("change", (event) => {
       const options = event.target.querySelectorAll("option");
       //check if the selected option is "other"
       //if yes show the text input
       options.forEach(option => {
         if(option.selected == true && option.value.toLowerCase() == "other") {
            //display the text input 
            otherJobInput.removeAttribute("hidden");
         } else {
            otherJobInput.setAttribute("hidden", "");
         }
       });
    })

}

displayTextField();





