async function react() {
  let id = event.target.dataset.id;
  const rawResponse = await fetch('http://80.112.170.71:82/listing/react', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      item_id: id,
      session_key: getCookie("session_key"),
      user_id: getCookie("user_id")
    })
  });
  if (rawResponse["status"] != 200 || rawResponse == null) {
    alert("Can't establish the connection.");
    console.log("Can't establish the connection.");
  }
  const content = await rawResponse.json();

  if(content["status"]=="ok"){
    console.log(content);
    let options = document.getElementsByClassName('option');
    for(let i=0;i<options.length;i++){
      if(options[i].dataset.id == id){
        options[i].parentNode.removeChild(options[i]);
      }
    }
  }
}
