
function dropDowns(){
let buttons = document.getElementsByClassName('drop_button');

for(let i=0;i<buttons.length;i++){
  buttons[i].addEventListener('click', () => {
    myFunction();
  });
}
}


function myFunction(el) {
  event.path[1].getElementsByClassName('drop_list')[0].classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.drop_button')&&!event.target.matches('.drop_img')) {
    var dropdowns = document.getElementsByClassName("drop_list");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

dropDowns();
