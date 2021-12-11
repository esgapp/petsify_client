if (location.protocol === 'https:') {
  location.replace(`http:${location.href.substring(location.protocol.length)}`);
}

async function loadListings(mode) {
  const rawResponse = await fetch('http://80.112.170.71:82/listings', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  });
  if (rawResponse["status"] != 200 || rawResponse == null) {
    alert("Can't establish the connection.");
    console.log("Can't establish the connection.");
  }
  const content = await rawResponse.json();
  console.log(content);
  generateListings(content, mode);
}

async function generateListings(content, mode){
  const list = document.getElementsByClassName('option_list')[0];
  list.innerHTML = "";
  for(let i=0;i<content["items"].length;i++){
    let author = content["items"][i]["item"]["creator"];
    let receiver = content["items"][i]["item"]["receiver"];
    let id = content["items"][i]["item"]["id"];
    let contact = await loadContact(id);
    if(mode=="availableListings"){
      if(receiver!=null) continue; //If listing is already ordered skip
      if(author==getCookie("username")) continue; //If we are the author skip
    } else if(mode=="orderedByMe"){
      if(receiver!=getCookie("user_id")) continue; //If we are not receiver skip
    } else if(mode=="myOrders"){
      if(author!=getCookie("username")) continue; //If we are not the author skip
    }
    let regexp = /(.*)-(.*)/;
    let delivery_type = content["items"][i]["item"]["delivery_type"];
    let title = content["items"][i]["item"]["title"];
    let price = content["items"][i]["item"]["price"];
    let type = content["items"][i]["item"]["type"].match(regexp);


    let option = document.createElement("div");
    option.classList.add("option");
    option.dataset.id = id;
    let img_box = document.createElement("div");
    let img = document.createElement("img");
    if(type[2]=="Food"){
      img.src="assets/food.png";
      img_box.classList.add("food");
    } else if(type[2]=="Toys"){
      img.src="assets/toy.png";
      img_box.classList.add("toy");
    } else if(type[2]=="Other"){
      img.src="assets/accessories.png";
      img_box.classList.add("accessories");
    }
    img_box.classList.add("img_outline");
    img_box.appendChild(img);

    let option_text = document.createElement("div");
    option_text.classList.add("option_text");

    let option_title = document.createElement("div");
    option_title.classList.add("option_title");
    option_title.textContent = title;

    let option_info = document.createElement("div");
    option_info.classList.add("option_info");
    let del_img = document.createElement("img");
    if(delivery_type==1){
      del_img.src="assets/delivery.png";
      option_info.appendChild(del_img);
      option_info.innerHTML += "Delivery";
    } else if(delivery_type==2){
      del_img.src="assets/pickup.png";
      option_info.appendChild(del_img);
      option_info.innerHTML += "Pickup";
    }
    option_text.appendChild(option_title);
    option_text.appendChild(option_info);

    let option_price = document.createElement("div");
    option_price.textContent = price;
    let currency = document.createElement("span");
    currency.textContent = "PLN";
    option_price.appendChild(currency);

    option.appendChild(img_box);
    option.appendChild(option_text);
    option.appendChild(option_price);

    let img_func = document.createElement("img");
    if((mode=="myOrders"&&receiver!=null)||(mode=="orderedByMe")){
      img_func.src="assets/arr_bot.png";
      img_func.classList.add("drop_img");
      let drop_button = document.createElement("div");
      drop_button.classList.add("drop_button");

      let drop_list = document.createElement("div");
      drop_list.classList.add("drop_list");
      let a1 = document.createElement("a");
      let a2 = document.createElement("a");
      let a3 = document.createElement("a");
      let img_opt1 = document.createElement("img");
      let img_opt2 = document.createElement("img");
      let img_opt3 = document.createElement("img");

      a1.href = "tel:" + contact["phone"];
      a2.href = "sms:"  + contact["phone"];
      a3.href = "";

      img_opt1.src = "assets/call.png";
      img_opt2.src = "assets/chat.png";
      img_opt3.src = "assets/star.png";

      a1.appendChild(img_opt1);
      a2.appendChild(img_opt2);
      a3.appendChild(img_opt3);

      a1.innerHTML += "Call";
      a2.innerHTML += "Chat";
      a3.innerHTML += "Rate user";
      drop_list.appendChild(a1);
      drop_list.appendChild(a2)
      drop_list.appendChild(a3)

      drop_button.appendChild(img_func);
      drop_button.appendChild(drop_list);
      option.appendChild(drop_button);
    } else if(mode=="availableListings") {
      img_func.src="assets/shopping-cart.png";
      img_func.classList.add("cart");

      let cart_button = document.createElement("div");
      cart_button.classList.add("cart_button");
      cart_button.dataset.id = id;
      cart_button.onclick = react;

      cart_button.appendChild(img_func);
      option.appendChild(cart_button);
    }
    list.appendChild(option);
  }
  if(mode!="availableListings")dropDowns();
}


async function loadContact(id) {
  const rawResponse = await fetch('http://80.112.170.71:82/listing/contact', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      item_id: id
    })
  });
  if (rawResponse["status"] != 200 || rawResponse == null) {
    alert("Can't establish the connection.");
    console.log("Can't establish the connection.");
  }
  const content = await rawResponse.json();

  if(content["status"]=="ok"){
    return content;
  }
}
