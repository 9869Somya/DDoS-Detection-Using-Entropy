const axios = require("axios");

const sendTraffic = async () => {
  for (let i = 0; i < 1000; i++) {
    await axios.get("http://localhost:5000/api/send-packet");
    console.log(`DDoS packet ${i + 1} sent`);
    await new Promise((resolve) => setTimeout(resolve, 10)); // 10 ms delay
  }
};

sendTraffic();
