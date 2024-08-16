import mongoose from "mongoose";

interface Connection {
	isConnected?: boolean;
}

const connection: Connection = {};

export const connectToDb = async (): Promise<void> => {
	if (connection.isConnected) {
		console.log("Using existing database connection");
		return;
	}

	try {
		const db = await mongoose.connect(process.env.MONGO_STR as string);
		connection.isConnected = db.connections[0].readyState === 1;
		console.log("Connected to database");
	} catch (error) {
		console.error("Database connection error:", error);
		throw new Error("Could not connect to the database");
	}
};
