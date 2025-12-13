// import mongoose from 'mongoose';

// type ConnectionObject = {
//   isConnected?: number;
// };

// const connection: ConnectionObject = {};

// async function dbConnect(): Promise<void> {
//   // Check if we have a connection to the database or if it's currently connecting
//   if (connection.isConnected) {
//     console.log('Already connected to the database');
//     return;
//   }

//   try {
//     // Attempt to connect to the database
//     const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

//     connection.isConnected = db.connections[0].readyState;

//     console.log('Database connected successfully');
//   } catch (error) {
//     console.error('Database connection failed:', error);

//     // Graceful exit in case of a connection error
//     process.exit(1);
//   }
// }

// export default dbConnect;


import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Database connection failed:", error);
    // ❌ DO NOT EXIT PROCESS
    throw error; // ✅ let request fail, not the build
  }
}

export default dbConnect;
