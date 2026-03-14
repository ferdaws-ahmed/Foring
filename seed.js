const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

// তোর MongoDB কানেকশন স্ট্রিং (Atlas থেকে যেটা পেয়েছিস)
const uri = "mongodb+srv://Foring:aHdwyoJrtgY0bBP8@cluster0.wtnhlvb.mongodb.net/?appName=Cluster0";

async function createAdmin() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("foring_uav"); // ডাটাবেস নাম
    const usersCollection = db.collection("users");

    // পাসওয়ার্ড হ্যাশ করা
    const passwordHash = await bcrypt.hash("asdfGG", 12);

    const newUser = {
      email: "foodpanda@foring.com", // তোর নিজের ইমেইল দিস ওটিপি টেস্টের জন্য
      password: passwordHash,
      role: "foodpanda",
      currentOtp: null,
      otpExpires: null,
      createdAt: new Date(),
    };

    // ডাটাবেসে ইনসার্ট করা
    const result = await usersCollection.insertOne(newUser);
    console.log(`✅ Admin Created with ID: ${result.insertedId}`);
    
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await client.close();
  }
}

createAdmin();