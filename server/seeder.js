const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/MenuItem');
const readline = require('readline');

dotenv.config();

const menuItems = [
  // Starters
  {
    name: 'Vegetable Samosa (2 pcs)',
    description: 'Crispy pastry filled with spiced potatoes and peas.',
    price: 120,
    category: 'Starters',
    imageUrl: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=2571&auto=format&fit=crop',
    isVegetarian: true,
    spiceLevel: 'Mild',
  },
  {
    name: 'Paneer Tikka',
    description: 'Cubes of cottage cheese marinated in yogurt and spices, grilled.',
    price: 350,
    category: 'Starters',
    imageUrl: 'https://images.unsplash.com/photo-1701579231320-cc2f7acad3cd?q=80&w=2670&auto=format&fit=crop',
    isVegetarian: true,
    spiceLevel: 'Medium',
  },
  // Main Course - Non-Veg
  {
    name: 'Butter Chicken',
    description: 'Grilled chicken simmered in a smooth, buttery, and creamy tomato gravy.',
    price: 450,
    category: 'Main Course - Non-Veg',
    imageUrl: 'https://images.unsplash.com/photo-1728910107534-e04e261768ae?q=80&w=2680&auto=format&fit=crop',
    isVegetarian: false,
    spiceLevel: 'Mild',
  },
  {
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice cooked with tender chicken and aromatic spices.',
    price: 380,
    category: 'Main Course - Non-Veg',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2680&auto=format&fit=crop',
    isVegetarian: false,
    spiceLevel: 'Medium',
  },
  // Main Course - Veg
  {
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese cubes in a rich, creamy tomato gravy.',
    price: 380,
    category: 'Main Course - Veg',
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2680&auto=format&fit=crop',
    isVegetarian: true,
    spiceLevel: 'Medium',
  },
  {
    name: 'Dal Makhani',
    description: 'Creamy black lentils slow-cooked with butter and spices.',
    price: 320,
    category: 'Main Course - Veg',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2680&auto=format&fit=crop',
    isVegetarian: true,
    spiceLevel: 'Mild',
  },
  // Breads
  {
    name: 'Butter Naan (2 pcs)',
    description: 'Soft, buttered Indian bread from the tandoor.',
    price: 100,
    category: 'Breads',
    imageUrl: 'https://images.unsplash.com/photo-1626197031507-c17099753214?q=80&w=2680&auto=format&fit=crop',
    isVegetarian: true,
    spiceLevel: null,
  },
  {
    name: 'Garlic Roti (2 pcs)',
    description: 'Whole wheat bread with garlic and butter.',
    price: 80,
    category: 'Breads',
    imageUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e3?q=80&w=2680&auto=format&fit=crop',
    isVegetarian: true,
    spiceLevel: null,
  },
  // Desserts
  {
    name: 'Gulab Jamun (2 pcs)',
    description: 'Deep-fried milk solids soaked in sugar syrup.',
    price: 120,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1601303516361-f2fb801acb90?q=80&w=2680&auto=format&fit=crop',
    isVegetarian: true,
    spiceLevel: null,
  },
  {
    name: 'Rasmalai (2 pcs)',
    description: 'Soft cottage cheese dumplings in sweetened, cardamom-flavored milk.',
    price: 150,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1605287977617-ddd865d5f696?q=80&w=2680&auto=format&fit=crop',
    isVegetarian: true,
    spiceLevel: null,
  }
];

// --- Database Connection and Seeding Logic ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await MenuItem.deleteMany();
    console.log('Existing menu items cleared.');

    // Insert new data
    const result = await MenuItem.insertMany(menuItems);
    console.log(`Menu items seeded successfully! Inserted: ${result.length}`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  } finally {
    // Close the connection whether seeding succeeded or failed
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

// Confirmation prompt for production safety
const confirmAndSeed = () => {
  const env = process.env.NODE_ENV || 'development';
  console.log(`\nSeeding database in '${env}' environment.`);
  if (env === 'production') {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('You are about to reseed the PRODUCTION database. Are you sure? (yes/no): ', (answer) => {
      rl.close();
      if (answer.trim().toLowerCase() === 'yes') {
        seedDatabase();
      } else {
        console.log('Seeding aborted.');
        process.exit(0);
      }
    });
  } else {
    seedDatabase();
  }
};

// Run the seeder
connectDB().then(() => {
  confirmAndSeed();
});
