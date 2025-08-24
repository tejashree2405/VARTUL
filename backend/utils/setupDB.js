import mongoose from 'mongoose';
import User from '../models/user.model.js';
import Post from '../models/post.model.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully.');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return false;
  }
};

// Sample user data
const sampleUsers = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: '$2a$10$eCFKgBnEZ0LJzOKh9qwZUeXkHQPRQAGDGj9hXq/MQtXi.yHDQrOLe', // hashed 'password123'
    fullName: 'John Doe',
    bio: 'Software Developer | Tech Enthusiast',
    profilePic: 'https://res.cloudinary.com/demo/image/upload/v1580125392/samples/people/boy-snow-hoodie.jpg',
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: '$2a$10$eCFKgBnEZ0LJzOKh9qwZUeXkHQPRQAGDGj9hXq/MQtXi.yHDQrOLe', // hashed 'password123'
    fullName: 'Jane Smith',
    bio: 'Digital Artist | Photographer',
    profilePic: 'https://res.cloudinary.com/demo/image/upload/v1580125392/samples/people/smiling-man.jpg',
  },
  {
    username: 'alex_wilson',
    email: 'alex@example.com',
    password: '$2a$10$eCFKgBnEZ0LJzOKh9qwZUeXkHQPRQAGDGj9hXq/MQtXi.yHDQrOLe', // hashed 'password123'
    fullName: 'Alex Wilson',
    bio: 'Travel Blogger | Adventure Seeker',
    profilePic: 'https://res.cloudinary.com/demo/image/upload/v1580125392/samples/people/jazz.jpg',
  }
];

// Sample post data (will be populated with user IDs after users are created)
const samplePosts = [
  {
    caption: 'Beautiful sunset at the beach! 🌅 #nature #sunset',
    image: 'https://res.cloudinary.com/demo/image/upload/v1580125392/samples/landscapes/beach-boat.jpg',
  },
  {
    caption: 'Exploring the mountains this weekend ⛰️ #adventure #hiking',
    image: 'https://res.cloudinary.com/demo/image/upload/v1580125392/samples/landscapes/nature-mountains.jpg',
  },
  {
    caption: 'Coffee and code - perfect morning! ☕💻 #coding #developer',
    image: 'https://res.cloudinary.com/demo/image/upload/v1580125392/samples/food/dessert.jpg',
  },
  {
    caption: 'City lights at night 🌃 #cityscape #nightphotography',
    image: 'https://res.cloudinary.com/demo/image/upload/v1580125392/samples/landscapes/architecture-signs.jpg',
  },
];

// Function to seed the database
const seedDatabase = async () => {
  if (!(await connectDB())) {
    console.error('Failed to connect to the database. Exiting...');
    process.exit(1);
  }

  try {
    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`Created ${createdUsers.length} users`);

    // Create posts with user references
    const postsWithUsers = samplePosts.map((post, index) => {
      // Assign posts to users in a round-robin fashion
      const userIndex = index % createdUsers.length;
      return {
        ...post,
        user: createdUsers[userIndex]._id,
      };
    });

    const createdPosts = await Post.insertMany(postsWithUsers);
    console.log(`Created ${createdPosts.length} posts`);

    // Update users with posts
    for (let i = 0; i < createdPosts.length; i++) {
      const post = createdPosts[i];
      await User.findByIdAndUpdate(post.user, {
        $push: { posts: post._id },
      });
    }

    // Create some follow relationships
    if (createdUsers.length >= 2) {
      // Make user 0 follow user 1
      await User.findByIdAndUpdate(createdUsers[0]._id, {
        $push: { following: createdUsers[1]._id },
      });
      await User.findByIdAndUpdate(createdUsers[1]._id, {
        $push: { followers: createdUsers[0]._id },
      });

      // If there's a third user, make them follow user 0
      if (createdUsers.length >= 3) {
        await User.findByIdAndUpdate(createdUsers[2]._id, {
          $push: { following: createdUsers[0]._id },
        });
        await User.findByIdAndUpdate(createdUsers[0]._id, {
          $push: { followers: createdUsers[2]._id },
        });
      }
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the seeding function
seedDatabase();