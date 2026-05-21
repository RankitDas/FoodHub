export interface Food {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
}

export const FOODS: Food[] = [
  // PIZZA
  { id: '1', name: 'Margherita Pizza', price: 12.99, category: 'Pizza', image: '🍕', description: 'Classic pizza with fresh mozzarella and basil', rating: 4.8 },
  { id: '2', name: 'Pepperoni Pizza', price: 13.99, category: 'Pizza', image: '🍕', description: 'Loaded with pepperoni and mozzarella', rating: 4.9 },
  { id: '3', name: 'Veggie Supreme', price: 11.99, category: 'Pizza', image: '🍕', description: 'Mixed fresh vegetables on thin crust', rating: 4.6 },
  { id: '4', name: 'BBQ Chicken Pizza', price: 14.99, category: 'Pizza', image: '🍕', description: 'Smoky BBQ chicken with cheese', rating: 4.7 },
  
  // BURGERS
  { id: '5', name: 'Burger Deluxe', price: 10.99, category: 'Burgers', image: '🍔', description: 'Grilled beef patty with fresh vegetables', rating: 4.8 },
  { id: '6', name: 'Bacon Burger', price: 11.99, category: 'Burgers', image: '🍔', description: 'Crispy bacon with cheddar and lettuce', rating: 4.9 },
  { id: '7', name: 'Mushroom Swiss', price: 12.49, category: 'Burgers', image: '🍔', description: 'Sautéed mushrooms with Swiss cheese', rating: 4.7 },
  { id: '8', name: 'Spicy Jalapeño', price: 11.49, category: 'Burgers', image: '🍔', description: 'Hot jalapeños with pepper jack cheese', rating: 4.6 },
  
  // SALADS
  { id: '9', name: 'Caesar Salad', price: 8.99, category: 'Salads', image: '🥗', description: 'Fresh greens with parmesan and croutons', rating: 4.5 },
  { id: '10', name: 'Greek Salad', price: 9.49, category: 'Salads', image: '🥗', description: 'Feta, olives, tomatoes and cucumber', rating: 4.7 },
  { id: '11', name: 'Caprese Salad', price: 8.99, category: 'Salads', image: '🥗', description: 'Mozzarella, tomato, and basil', rating: 4.6 },
  { id: '12', name: 'Garden Fresh', price: 7.99, category: 'Salads', image: '🥗', description: 'Seasonal mixed vegetables', rating: 4.4 },
  
  // ASIAN
  { id: '13', name: 'Pad Thai', price: 9.99, category: 'Asian', image: '🍜', description: 'Stir-fried noodles with shrimp and vegetables', rating: 4.8 },
  { id: '14', name: 'Sushi Roll', price: 11.99, category: 'Asian', image: '🍣', description: 'Fresh salmon and avocado roll', rating: 4.9 },
  { id: '15', name: 'Ramen Deluxe', price: 10.99, category: 'Asian', image: '🍜', description: 'Rich broth with noodles and toppings', rating: 4.7 },
  { id: '16', name: 'Fried Rice', price: 8.99, category: 'Asian', image: '🍚', description: 'Jasmine rice with vegetables and egg', rating: 4.6 },
  
  // DRINKS
  { id: '17', name: 'Fresh Orange Juice', price: 4.99, category: 'Drinks', image: '🧃', description: 'Freshly squeezed orange juice', rating: 4.7 },
  { id: '18', name: 'Iced Coffee', price: 5.49, category: 'Drinks', image: '☕', description: 'Cold brew with ice and milk', rating: 4.8 },
  { id: '19', name: 'Smoothie Bowl', price: 6.99, category: 'Drinks', image: '🥤', description: 'Berry smoothie with granola topping', rating: 4.6 },
  { id: '20', name: 'Mango Lassi', price: 5.99, category: 'Drinks', image: '🧃', description: 'Traditional yogurt-based drink', rating: 4.7 },
  
  // DESSERTS
  { id: '21', name: 'Chocolate Cake', price: 5.99, category: 'Desserts', image: '🍰', description: 'Rich chocolate cake with frosting', rating: 4.9 },
  { id: '22', name: 'Cheesecake', price: 6.99, category: 'Desserts', image: '🍪', description: 'New York style cheesecake', rating: 4.8 },
  { id: '23', name: 'Brownie Delight', price: 4.99, category: 'Desserts', image: '🍫', description: 'Fudgy chocolate brownie', rating: 4.7 },
  { id: '24', name: 'Vanilla Tiramisu', price: 6.49, category: 'Desserts', image: '🍰', description: 'Classic Italian tiramisu', rating: 4.8 },
];

export const CATEGORIES = ['All', 'Pizza', 'Burgers', 'Salads', 'Asian', 'Drinks', 'Desserts'];

export const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    rating: 5,
    text: 'Best food delivery experience! Fast and delicious.',
  },
  {
    name: 'Mike Chen',
    rating: 5,
    text: 'Amazing variety of cuisines and great quality.',
  },
  {
    name: 'Emma Davis',
    rating: 5,
    text: 'Love the smooth ordering process and beautiful UI!',
  },
];
