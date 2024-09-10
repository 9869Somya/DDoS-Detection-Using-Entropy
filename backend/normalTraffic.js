const axios = require("axios");

const sendTraffic = async () => {
  for (let i = 0; i < 100; i++) {
    await axios.get("http://localhost:5000/api/send-packet");
    console.log(`Normal packet ${i + 1} sent`);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
  }
};

sendTraffic();
