import { DataAPIClient } from "@datastax/astra-db-ts";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import OpenAI from "openai";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import "dotenv/config";

type SimilarityMetric = "dot_product" | "cosine" | "euclidean"

const { ASTRA_DB_API_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_NAMESPACE, ASTRA_DB_COLLECTION, OPENAI_API_KEY } = process.env;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const ufcData = [
    'https://www.ufc.com/rankings',
    'https://en.wikipedia.org/wiki/List_of_UFC_events',
    'https://en.wikipedia.org/wiki/Ultimate_Fighting_Championship',
    'https://en.wikipedia.org/wiki/List_of_UFC_events',
    'https://en.wikipedia.org/wiki/UFC_308'
]

// Comment: Not conforming to TS strictness
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE })

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 100
})

const createCollection = async (similarityMetric: SimilarityMetric = "dot_product") => {
    const res = await db.createCollection(ASTRA_DB_COLLECTION, {
        vector: {
            dimension: 1536,
            metric: similarityMetric
        }
    })
}