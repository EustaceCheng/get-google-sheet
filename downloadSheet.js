const axios = require("axios");
const fs = require("fs");
const path = require("path");

// 设定要下载的 Google Sheet 的 URL
const sheetUrl = "";
const outputFolder = "./downloads";
const fileName = "sheet.csv";

// 确保输出文件夹存在
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// 构造 Google Sheet 的 CSV 下载链接
const csvUrl = sheetUrl.replace("/edit", "/export?format=csv");

// 发出 HTTP 请求并下载文件
axios
  .get(csvUrl, { responseType: "stream" })
  .then((response) => {
    const outputPath = path.join(outputFolder, fileName);
    const writer = fs.createWriteStream(outputPath);

    response.data.pipe(writer);

    writer.on("finish", () => {
      console.log(`File downloaded to ${outputPath}`);
    });

    writer.on("error", (err) => {
      console.error("Error writing to file:", err);
    });
  })
  .catch((err) => {
    console.error("Error downloading file:", err);
  });
