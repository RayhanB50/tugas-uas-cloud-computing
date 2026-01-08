const API_URL = "https://cmni4dknqd.execute-api.ap-southeast-1.amazonaws.com/prod";

function loadOrders() {
  fetch(API_URL + "/admin/orders")
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("orders");
      tbody.innerHTML = "";

      data.forEach(o => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${o.order_id}</td>
          <td>${o.nama_pelanggan}</td>
          <td>${o.menu}</td>
          <td>${o.jumlah}</td>
          <td>
            <select id="s-${o.order_id}">
              <option ${o.status=="Menunggu Diproses"?"selected":""}>Menunggu Diproses</option>
              <option ${o.status=="Sedang Dimasak"?"selected":""}>Sedang Dimasak</option>
              <option ${o.status=="Sedang Diantar"?"selected":""}>Sedang Diantar</option>
            </select>
          </td>
          <td>
            <button onclick="updateStatus('${o.order_id}')">Update</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
}

function updateStatus(id) {
  const status = document.getElementById("s-" + id).value;

  fetch(API_URL + "/admin/order/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  })
  .then(res => res.json())
  .then(() => {
    alert("Status diperbarui");
    loadOrders();
  });
}

loadOrders();
