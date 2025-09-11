const categoryKeywords: Record<string, string[]> = {
  Produce: [
    'apple', 'banana', 'orange', 'lettuce', 'tomato', 'potato', 'onion', 'carrot',
    'strawberry', 'blueberry', 'grapes', 'broccoli', 'spinach', 'avocado'
  ],
  'Dairy & Eggs': ['milk', 'cheese', 'yogurt', 'butter', 'cream', 'egg'],
  Bakery: ['bread', 'bagel', 'croissant', 'muffin', 'cake', 'pastry'],
  'Meat & Seafood': ['chicken', 'beef', 'pork', 'fish', 'shrimp', 'salmon', 'turkey', 'bacon'],
  Pantry: [
    'pasta', 'rice', 'flour', 'sugar', 'oil', 'cereal', 'soup', 'bean', 'lentil',
    'sauce', 'spice', 'vinegar', 'honey'
  ],
  Snacks: ['chip', 'cookie', 'cracker', 'popcorn', 'nuts', 'chocolate', 'pretzel'],
  Beverages: ['water', 'juice', 'soda', 'coffee', 'tea', 'wine', 'beer'],
  Household: ['paper towel', 'toilet paper', 'soap', 'detergent', 'cleaner', 'trash bag'],
  'Health & Personal Care': ['shampoo', 'toothpaste', 'deodorant', 'medicine', 'vitamins'],
};

export function getCategory(itemName: string): string {
  const lowerItemName = itemName.toLowerCase();
  for (const category in categoryKeywords) {
    if (categoryKeywords[category].some(keyword => lowerItemName.includes(keyword))) {
      return category;
    }
  }
  return 'Miscellaneous';
}
