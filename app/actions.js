'use server'
import xml2js from 'xml2js';

// Helper function to fetch and parse images from the bucket
export async function fetchImages() {
    const response = await fetch('https://storage.googleapis.com/falkenberg.tech/');
    const data = await response.text();
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(data);
    const files = result.ListBucketResult.Contents;

    return files.map(file => ({
        url: `https://storage.googleapis.com/falkenberg.tech/${encodeURIComponent(file.Key)}`,
        key: decodeURIComponent(file.Key)
    }));
}