const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_URI;
console.log("MONGO_URI:", uri);

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function insertBooks() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Sample book data (at least 10 books)
        const books = [
            {
                title: "The Lord of the Rings",
                author: "J.R.R. Tolkien",
                genre: "Fantasy",
                published_year: 1954,
                price: 25.99,
                in_stock: true,
                pages: 1178,
                publisher: "Allen & Unwin"
            },
            {
                title: "Pride and Prejudice",
                author: "Jane Austen",
                genre: "Romance",
                published_year: 1813,
                price: 12.50,
                in_stock: true,
                pages: 432,
                publisher: "T. Egerton"
            },
            {
                title: "1984",
                author: "George Orwell",
                genre: "Dystopian",
                published_year: 1949,
                price: 10.00,
                in_stock: true,
                pages: 328,
                publisher: "Secker & Warburg"
            },
            {
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                genre: "Classic",
                published_year: 1960,
                price: 15.75,
                in_stock: true,
                pages: 281,
                publisher: "J. B. Lippincott & Co."
            },
            {
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                genre: "Classic",
                published_year: 1925,
                price: 11.20,
                in_stock: true,
                pages: 180,
                publisher: "Charles Scribner's Sons"
            },
            {
                title: "One Hundred Years of Solitude",
                author: "Gabriel García Márquez",
                genre: "Magical Realism",
                published_year: 1967,
                price: 18.99,
                in_stock: true,
                pages: 417,
                publisher: "Harper & Row"
            },
            {
                title: "Moby Dick",
                author: "Herman Melville",
                genre: "Adventure",
                published_year: 1851,
                price: 14.00,
                in_stock: true,
                pages: 635,
                publisher: "Richard Bentley"
            },
            {
                title: "War and Peace",
                author: "Leo Tolstoy",
                genre: "Historical Fiction",
                published_year: 1869,
                price: 22.50,
                in_stock: true,
                pages: 1225,
                publisher: "The Russian Messenger"
            },
            {
                title: "The Catcher in the Rye",
                author: "J. D. Salinger",
                genre: "Literary Fiction",
                published_year: 1951,
                price: 9.99,
                in_stock: true,
                pages: 234,
                publisher: "Little, Brown and Company"
            },
            {
                title: "Don Quixote",
                author: "Miguel de Cervantes",
                genre: "Satire",
                published_year: 1605,
                price: 16.25,
                in_stock: true,
                pages: 863,
                publisher: "Francisco de Robles"
            },
            {
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                genre: "Fantasy",
                published_year: 1937,
                price: 17.80,
                in_stock: true,
                pages: 310,
                publisher: "George Allen & Unwin"
            }
        ];

        // Insert the book data into the collection
        const result = await collection.insertMany(books);
        console.log(`${result.insertedCount} books inserted`);

    } catch (err) {
        console.error("Error inserting books:", err);
    } finally {
        await client.close();
    }
}

insertBooks().catch(console.error);