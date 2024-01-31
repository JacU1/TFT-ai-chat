require('dotenv').config();
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter")
// const { OpenAI } = require("@langchain/openai");
const fs = require('node:fs');

const dataSplitter = async function() {
    try {
        fs.readFile('TFT-info.txt', 'utf8', async (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            const text = data;
            const splitter = new RecursiveCharacterTextSplitter();
            const output = await splitter.createDocuments([text]);
            console.log(output);
          });
    
    }catch (err) {
        console.log(err);
    }
  }

  module.exports = { dataSplitter };