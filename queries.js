const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_URI;
console.log("MONGO_URI:", uri);

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runQueries() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Task 2: Basic CRUD Operations

        // Find all books in a specific genre
        const genre = "Fantasy";
        const booksInGenre = await collection.find({ genre: genre }).toArray();
        console.log(`\nBooks in genre "${genre}":`, booksInGenre);

        // Find books published after a certain year
        const year = 1950;
        const booksAfterYear = await collection.find({ published_year: { $gt: year } }).toArray();
        console.log(`\nBooks published after ${year}:`, booksAfterYear);

        // Find books by a specific author
        const author = "J.R.R. Tolkien";
        const booksByAuthor = await collection.find({ author: author }).toArray();
        console.log(`\nBooks by author "${author}":`, booksByAuthor);

        // Update the price of a specific book
        const bookTitle = "The Lord of the Rings";
        const newPrice = 29.99;
        const updateResult = await collection.updateOne(
            { title: bookTitle },
            { $set: { price: newPrice } }
        );
        console.log(`\nUpdated price of "${bookTitle}":`, updateResult.modifiedCount);

        // Delete a book by its title
        const bookToDelete = "Don Quixote";
        const deleteResult = await collection.deleteOne({ title: bookToDelete });
        console.log(`\nDeleted book "${bookToDelete}":`, deleteResult.deletedCount);

        // Task 3: Advanced Queries

        // Find books that are both in stock and published after 2010
        const inStockAndAfter2010 = await collection.find({
            in_stock: true,
            published_year: { $gt: 2010 }
        }).toArray();
        console.log("\nBooks in stock and published after 2010:", inStockAndAfter2010);

        // Use projection to return only the title, author, and price fields
        const projectedFields = await collection.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray();
        console.log("\nProjected fields (title, author, price):", projectedFields);

        // Implement sorting to display books by price (ascending and descending)
        const sortedAscending = await collection.find().sort({ price: 1 }).toArray();
        console.log("\nBooks sorted by price (ascending):", sortedAscending);

        const sortedDescending = await collection.find().sort({ price: -1 }).toArray();
        console.log("\nBooks sorted by price (descending):", sortedDescending);

        // Use the limit and skip methods to implement pagination (5 books per page)
        const pageNumber = 1; // Change this to navigate pages
        const booksPerPage = 5;
        const paginatedBooks = await collection.find()
            .skip((pageNumber - 1) * booksPerPage)
            .limit(booksPerPage)
            .toArray();
        console.log(`\nPage ${pageNumber}:`, paginatedBooks);

        // Task 4: Aggregation Pipeline

        // Create an aggregation pipeline to calculate the average price of books by genre
        const avgPriceByGenre = await collection.aggregate([
            {
                $group: {
                    _id: "$genre",
                    averagePrice: { $avg: "$price" }
                }
            }
        ]).toArray();
        console.log("\nAverage price of books by genre:", avgPriceByGenre);

        // Create an aggregation pipeline to find the author with the most books in the collection
        const authorWithMostBooks = await collection.aggregate([
            {
                $group: {
                    _id: "$author",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 1
            }
        ]).toArray();
        console.log("\nAuthor with the most books:", authorWithMostBooks);

        // Implement a pipeline that groups books by publication decade and counts them
        const booksByDecade = await collection.aggregate([
            {
                $group: {
                    _id: {
                        $subtract: [
                            "$published_year",
                            { $mod: ["$published_year", 10] }
                        ]
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]).toArray();
        console.log("\nBooks by publication decade:", booksByDecade);

        // Task 5: Indexing

        // Create an index on the title field for faster searches
        await collection.createIndex({ title: 1 });
        console.log("\nCreated index on title");

        // Create a compound index on author and published_year
        await collection.createIndex({ author: 1, published_year: 1 });
        console.log("\nCreated compound index on author and published_year");

        // Use the explain() method to demonstrate the performance improvement with your indexes
        const explainQuery = await collection.find({ title: "The Lord of the Rings" }).explain("executionStats");
        console.log("\nExplain output for title search:", explainQuery);

    } catch (err) {
        console.error("Error running queries:", err);
    } finally {
        await client.close();
    }
}

runQueries().catch(console.error);