export async function submitOrder(data) {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    console.log("Data not sended");
    return 0;
  }

  console.log("DAta sended");
}
