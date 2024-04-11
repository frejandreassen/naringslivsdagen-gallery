'use server'
import xml2js from 'xml2js';

// Helper function to fetch and parse images from the bucket
export async function fetchImages() {
    const response = await fetch('https://storage.googleapis.com/falkenberg.tech');
    const data = await response.text();
    const parser = new xml2js.Parser({ explicitArray: false });
    let files = [];

    try {
        const result = await parser.parseStringPromise(data);

        // Ensure we have an array of files, even if only one file exists
        files = result.ListBucketResult.Contents ? [].concat(result.ListBucketResult.Contents) : [];
        
        // Filter files to only include those within the 'carlsberg/' subfolder
        files = files.filter(file => file.Key.startsWith('carlsberg/') && !file.Key.endsWith('/'));

    } catch (error) {
        console.error('Error parsing XML:', error);
        // Handle the error as appropriate
    }

    // Return an array of objects, each containing the URL and key for each file
    return files.map(file => ({
        url: `https://storage.googleapis.com/falkenberg.tech/${encodeURIComponent(file.Key)}`,
        key: decodeURIComponent(file.Key)
    }));
}
