require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter")
const { SupabaseVectorStore } = require("@langchain/community/vectorstores/supabase");
const { OpenAIEmbeddings } = require("@langchain/openai");
const fs = require('node:fs');

const insertData = async function() {
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

            const SB_API_URL = process.env.SB_API_URL;
            const SB_API_KEY = process.env.SB_API_KEY;
            const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

            const client = createClient(SB_API_URL, SB_API_KEY);

            await SupabaseVectorStore.fromDocuments(
              output,
              new OpenAIEmbeddings({openAIApiKey: OPENAI_API_KEY}),
              {
                client,
                tableName: 'documents'
              }
            )

          });
    }catch (err) {
        console.log(err);
        return;
    }
  }

  module.exports = { insertData };