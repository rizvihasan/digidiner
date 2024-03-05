export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: "app-1",
    name: "Crispy Calamari",
    description: "Lightly breaded calamari rings served with marinara sauce.",
    price: 750, // Adjusted to INR
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400&h=300&fit=crop",
    category: "Appetizers",
  },
  {
    id: "app-2",
    name: "Spinach & Artichoke Dip",
    description: "Creamy spinach and artichoke dip served with tortilla chips.",
    price: 650, // Adjusted to INR
    image: "https://images.unsplash.com/photo-1576506913249-5b5e911a6801?q=80&w=400&h=300&fit=crop",
    category: "Appetizers",
  },
  {
    id: "app-3",
    name: "Loaded Potato Skins",
    description: "Crispy potato skins loaded with cheese, bacon, and green onions. Served with sour cream.",
    price: 800, // Adjusted to INR
    image: "https://images.unsplash.com/photo-1581628780948-d6079f4fc3f1?q=80&w=400&h=300&fit=crop",
    category: "Appetizers",
  },
  
  // Main Courses
  {
    id: "main-1",
    name: "Classic Burger",
    description: "8oz Angus beef patty with lettuce, tomato, onion, and pickles on a brioche bun.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&h=300&fit=crop",
    category: "Main Courses",
  },
  {
    id: "main-2",
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon fillet grilled to perfection, served with seasonal vegetables.",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400&h=300&fit=crop",
    category: "Main Courses",
  },
  {
    id: "main-3",
    name: "Fettuccine Alfredo",
    description: "Fettuccine pasta tossed in our creamy homemade Alfredo sauce with parmesan cheese.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1662116765243-e9db4b4cda2b?q=80&w=400&h=300&fit=crop",
    category: "Main Courses",
  },
  {
    id: "main-4",
    name: "BBQ Ribs",
    description: "Slow-cooked baby back ribs smothered in our house BBQ sauce, served with fries and coleslaw.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&h=300&fit=crop",
    category: "Main Courses",
  },
  
  // Desserts
  {
    id: "des-1",
    name: "New York Cheesecake",
    description: "Creamy New York style cheesecake with a graham cracker crust, topped with strawberry sauce.",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=400&h=300&fit=crop",
    category: "Desserts",
  },
  {
    id: "des-2",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream.",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=400&h=300&fit=crop",
    category: "Desserts",
  },
  
  // Drinks
  {
    id: "drink-1",
    name: "Fresh Lemonade",
    description: "Freshly squeezed lemonade with a hint of mint.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=400&h=300&fit=crop",
    category: "Drinks",
  },
  {
    id: "drink-2",
    name: "Iced Tea",
    description: "Southern-style sweet iced tea with lemon.",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1556679343-c1c1ed9f7a39?q=80&w=400&h=300&fit=crop",
    category: "Drinks",
  },
  {
    id: "drink-3",
    name: "Craft Root Beer",
    description: "Locally made craft root beer, served in a frosted mug.",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?q=80&w=400&h=300&fit=crop",
    category: "Drinks",
  },
];
