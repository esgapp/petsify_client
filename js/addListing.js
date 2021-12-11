if (location.protocol === 'https:') {
  location.replace(`http:${location.href.substring(location.protocol.length)}`);
}

async function addListing() {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let price = document.getElementById('price').value;
  let delivery = document.querySelector('input[name="delivery"]:checked').value;
  let pet = document.querySelector('input[name="pet"]:checked').value;
  let item = document.querySelector('input[name="item"]:checked').value;

  let del_code = delivery == "Delivery" ? 1 : 2;
  let category = pet + "-" + item;

  const rawResponse = await fetch('http://80.112.170.71:82/add_listing', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      description: description,
      price: price,
      delivery_type: del_code,
      type: category,
      expiry_date:"2021-12-27",
      mass: 0,
      session_key: getCookie("session_key"),
      user_id: getCookie("user_id")
    })
  });
  if (rawResponse["status"] != 200 || rawResponse == null) {
    alert("Can't establish the connection.");
    console.log("Can't establish the connection.");
  }
  const content = await rawResponse.json();

  console.log(content);
  if(content["status"]=="ok"){
    window.location.href = "home.html";
  }
}
