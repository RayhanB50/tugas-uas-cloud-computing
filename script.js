const API_URL = "https://cmni4dknqd.execute-api.ap-southeast-1.amazonaws.com/prod";

function pesan() {
  fetch(API_URL + "/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nama: document.getElementById("nama").value,
      menu: document.getElementById("menu").value,
      jumlah: document.getElementById("jumlah").value
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("RESPONSE:", data); // DEBUG
    if (data.order_id) {
      document.getElementById("hasil").innerText =
        "Pesanan dibuat! Order ID: " + data.order_id;
    } else {
      document.getElementById("hasil").innerText =
        "Gagal: " + JSON.stringify(data);
    }
  })
  .catch(err => {
    document.getElementById("hasil").innerText =
      "Error: " + err;
  });
}


function cekStatus() {
  const id = document.getElementById("orderId").value;
  fetch(API_URL + "/order?id=" + id)
    .then(res => res.json())
    .then(data => {
      document.getElementById("status").innerText =
        JSON.stringify(data, null, 2);
    });
}
