import { RestaurantInfo } from './types';

export const RESTAURANT_INFO: RestaurantInfo = {
  name: 'The Fusion',
  address: '221 Lee High Rd, Blackheath, London SE13 5PQ',
  phone: '02045684224',
  email: 'info@fusionfood.co.uk',
  coordinates: {
    lat: 51.45880878334991,
    lng: 0.005527840859441247
  },
  openingHours: {
    monday: { open: '17:00', close: '23:00' },
    tuesday: { open: '17:00', close: '23:00' },
    wednesday: { open: '17:00', close: '23:00' },
    thursday: { open: '17:00', close: '23:00' },
    friday: { open: '17:00', close: '23:30' },
    saturday: { open: '12:00', close: '23:30' },
    sunday: { open: '12:00', close: '22:30' }
  }
};

// Complete menu data from menu.md
export const SAMPLE_MENU = {
  categories: [
    {
      id: 'appetizers',
      name: 'Appetizers',
      description: 'Traditional appetizers to begin your culinary journey',
      items: [
        {
          id: 'onion-bhaji',
          name: 'Onion Bhaji',
          description: 'Crispy fried onion fritters',
          price: 5.00,
          category: 'appetizers',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'samosa-veg',
          name: 'Vegetable Samosa',
          description: 'Crispy pastry with vegetable filling',
          price: 5.00,
          category: 'appetizers',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'samosa-lamb',
          name: 'Lamb Samosa',
          description: 'Crispy pastry with minced lamb',
          price: 5.00,
          category: 'appetizers',
          spiceLevel: 'medium' as const
        },
        {
          id: 'samosa-chaat',
          name: 'Samosa Chaat',
          description: 'Potato cakes with peas, yogurt, mint, and tamarind chutney',
          price: 5.00,
          category: 'appetizers',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'pani-puri',
          name: 'Pani Puri',
          description: 'Crispy puri filled with potatoes, onion, and tangy spiced water',
          price: 5.00,
          category: 'appetizers',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'achari-paneer-tikka',
          name: 'Achari Paneer Tikka',
          description: 'Char-grilled paneer slices marinated in spices',
          price: 6.00,
          category: 'appetizers',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'chilli-paneer',
          name: 'Chilli Paneer',
          description: 'Stir-fried paneer with peppers, fresh chilli, and aromatic spices',
          price: 6.00,
          category: 'appetizers',
          isVegetarian: true,
          spiceLevel: 'hot' as const
        },
        {
          id: 'chilli-mushroom',
          name: 'Chilli Mushroom',
          description: 'Stir-fried mushrooms with peppers, fresh chilli, and aromatic spices',
          price: 6.00,
          category: 'appetizers',
          isVegetarian: true,
          spiceLevel: 'hot' as const
        },
        {
          id: 'chilli-chicken',
          name: 'Chilli Chicken',
          description: 'Stir-fried chicken with peppers, fresh chilli, and aromatic spices',
          price: 6.00,
          category: 'appetizers',
          spiceLevel: 'hot' as const
        },
        {
          id: 'chicken-tikka-starter',
          name: 'Chicken Tikka',
          description: 'Chargrilled chicken breast cubes marinated in yogurt and herbs',
          price: 5.00,
          category: 'appetizers',
          spiceLevel: 'medium' as const
        },
        {
          id: 'lamb-shish-kebab',
          name: 'Lamb Shish Kebab',
          description: 'Minced lamb kebab cooked in the tandoor',
          price: 5.00,
          category: 'appetizers',
          spiceLevel: 'medium' as const
        },
        {
          id: 'lamb-chops-starter',
          name: 'Lamb Chops',
          description: 'Juicy lamb chops marinated with traditional spices, grilled to perfection',
          price: 9.00,
          category: 'appetizers',
          spiceLevel: 'medium' as const
        },
        {
          id: 'ajwani-salmon',
          name: 'Ajwani Salmon',
          description: 'Salmon fillet marinated with carom seeds and fenugreek, grilled in clay oven',
          price: 9.00,
          category: 'appetizers',
          spiceLevel: 'medium' as const
        },
        {
          id: 'prawn-puri',
          name: 'Prawn Puri',
          description: 'Spiced prawns served on deep-fried bread',
          price: 7.00,
          category: 'appetizers',
          spiceLevel: 'medium' as const
        },
        {
          id: 'steamed-momo-lamb',
          name: 'Steamed MOMO (Lamb)',
          description: 'Steamed dumplings filled with lamb, served with tomato chutney',
          price: 6.00,
          category: 'appetizers',
          spiceLevel: 'medium' as const
        },
        {
          id: 'steamed-momo-chicken',
          name: 'Steamed MOMO (Chicken)',
          description: 'Steamed dumplings filled with chicken, served with tomato chutney',
          price: 6.00,
          category: 'appetizers',
          spiceLevel: 'medium' as const
        },
        {
          id: 'steamed-momo-veg',
          name: 'Steamed MOMO (Vegetable)',
          description: 'Steamed dumplings filled with vegetables, served with tomato chutney',
          price: 6.00,
          category: 'appetizers',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'tandoori-lamb-momo',
          name: 'Tandoori Lamb MOMO',
          description: 'Grilled dumplings filled with spiced minced lamb, served with tomato chutney',
          price: 7.00,
          category: 'appetizers',
          spiceLevel: 'medium' as const
        },
        {
          id: 'sukuti',
          name: 'Sukuti',
          description: 'Smoked and dried strips of lamb, sautéed with onion, garlic, ginger, and Nepali spices',
          price: 7.00,
          category: 'appetizers',
          spiceLevel: 'hot' as const
        },
        {
          id: 'bhutan',
          name: 'Bhutan',
          description: 'A traditional Nepali delicacy of goat tripe, stir-fried with onion, tomato, chilli, and spices',
          price: 7.00,
          category: 'appetizers',
          spiceLevel: 'hot' as const
        }
      ]
    },
    {
      id: 'tandoori-grills',
      name: 'Tandoori & Grills',
      description: 'Authentic tandoori dishes and grilled specialties',
      items: [
        {
          id: 'chicken-tikka-shaslik',
          name: 'Chicken Tikka Shaslik',
          description: 'Tender chicken skewers with peppers, tomato and onions',
          price: 10.00,
          category: 'tandoori-grills',
          spiceLevel: 'medium' as const
        },
        {
          id: 'paneer-shaslik',
          name: 'Paneer Shaslik',
          description: 'Paneer skewers with peppers, onions, and mild spices',
          price: 10.00,
          category: 'tandoori-grills',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'tandoori-chicken',
          name: 'Tandoori Chicken',
          description: 'Half chicken marinated with yogurt and authentic spices, grilled in the tandoor',
          price: 10.00,
          category: 'tandoori-grills',
          spiceLevel: 'medium' as const
        },
        {
          id: 'mixed-grill-platter',
          name: 'Mixed Grill Platter',
          description: 'A mix of lamb kebab, chicken tikka, tandoori chicken, and lamb chop',
          price: 12.00,
          category: 'tandoori-grills',
          spiceLevel: 'medium' as const
        },
        {
          id: 'lamb-chops-main',
          name: 'Lamb Chops Main',
          description: 'Tender lamb chops marinated in Indian spices, served with chutney and salads',
          price: 14.00,
          category: 'tandoori-grills',
          spiceLevel: 'medium' as const
        },
        {
          id: 'salmon-tikka-main',
          name: 'Salmon Tikka Main',
          description: 'Chargrilled salmon with fenugreek and carom seeds',
          price: 14.00,
          category: 'tandoori-grills',
          spiceLevel: 'medium' as const
        }
      ]
    },
    {
      id: 'chef-recommendations',
      name: "Chef's Recommendations",
      description: 'Signature dishes crafted by our head chef',
      items: [
        {
          id: 'himalayan-chicken',
          name: 'Himalayan Chicken',
          description: 'Chicken cooked with a rare Himalayan herb "Zimbu"',
          price: 11.00,
          category: 'chef-recommendations',
          spiceLevel: 'medium' as const
        },
        {
          id: 'chicken-chilly-dry-fry',
          name: 'Chicken Chilly Dry Fry',
          description: 'Crisp chicken stir-fried with peppers, chilli, and soy sauce',
          price: 11.00,
          category: 'chef-recommendations',
          spiceLevel: 'hot' as const
        },
        {
          id: 'lamb-bhutuwa',
          name: 'Lamb Bhutuwa',
          description: 'Tender lamb in tomato-onion gravy with fenugreek, garlic and spices',
          price: 11.00,
          category: 'chef-recommendations',
          spiceLevel: 'medium' as const
        },
        {
          id: 'goan-prawn',
          name: 'Goan Prawn',
          description: 'Tiger prawns in coconut-based Goan sauce',
          price: 12.00,
          category: 'chef-recommendations',
          spiceLevel: 'medium' as const
        },
        {
          id: 'goan-tilapia',
          name: 'Goan Tilapia',
          description: 'Tilapia in coconut-based Goan sauce',
          price: 12.00,
          category: 'chef-recommendations',
          spiceLevel: 'medium' as const
        },
        {
          id: 'mix-seafood-curry',
          name: 'Mix Seafood Curry',
          description: 'Tiger prawns, salmon, and tilapia in Goan sauce',
          price: 12.00,
          category: 'chef-recommendations',
          spiceLevel: 'medium' as const
        },
        {
          id: 'tawa-prawn',
          name: 'Tawa Prawn',
          description: 'Tiger prawns sautéed with tomato, peppers, and spices',
          price: 12.00,
          category: 'chef-recommendations',
          spiceLevel: 'medium' as const
        },
        {
          id: 'karahi-paneer',
          name: 'Karahi Paneer',
          description: 'Cottage cheese cooked with onion, tomato, and green peppers in a medium-spiced sauce',
          price: 9.00,
          category: 'chef-recommendations',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'saag-chana-main',
          name: 'Saag Chana Main',
          description: 'Spinach & chickpeas cooked with garlic and spices',
          price: 9.00,
          category: 'chef-recommendations',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        }
      ]
    },
    {
      id: 'classic-curries',
      name: 'Classic Curries',
      description: 'Traditional curries available with your choice of protein',
      items: [
        {
          id: 'tikka-masala-veg',
          name: 'Tikka Masala (Vegetable)',
          description: 'Mild creamy tomato masala with ground almonds',
          price: 8.50,
          category: 'classic-curries',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'tikka-masala-chicken',
          name: 'Tikka Masala (Chicken)',
          description: 'Mild creamy tomato masala with ground almonds',
          price: 10.50,
          category: 'classic-curries',
          spiceLevel: 'mild' as const
        },
        {
          id: 'tikka-masala-lamb',
          name: 'Tikka Masala (Lamb)',
          description: 'Mild creamy tomato masala with ground almonds',
          price: 11.00,
          category: 'classic-curries',
          spiceLevel: 'mild' as const
        },
        {
          id: 'tikka-masala-prawn',
          name: 'Tikka Masala (Prawn)',
          description: 'Mild creamy tomato masala with ground almonds',
          price: 12.50,
          category: 'classic-curries',
          spiceLevel: 'mild' as const
        },
        {
          id: 'korma-veg',
          name: 'Korma (Vegetable)',
          description: 'Mild curry with coconut and almonds',
          price: 8.50,
          category: 'classic-curries',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'korma-chicken',
          name: 'Korma (Chicken)',
          description: 'Mild curry with coconut and almonds',
          price: 10.50,
          category: 'classic-curries',
          spiceLevel: 'mild' as const
        },
        {
          id: 'korma-lamb',
          name: 'Korma (Lamb)',
          description: 'Mild curry with coconut and almonds',
          price: 11.00,
          category: 'classic-curries',
          spiceLevel: 'mild' as const
        },
        {
          id: 'korma-prawn',
          name: 'Korma (Prawn)',
          description: 'Mild curry with coconut and almonds',
          price: 12.50,
          category: 'classic-curries',
          spiceLevel: 'mild' as const
        },
        {
          id: 'dhansak-veg',
          name: 'Dhansak (Vegetable)',
          description: 'Lentil-based curry with sweet & sour balance',
          price: 8.50,
          category: 'classic-curries',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'dhansak-chicken',
          name: 'Dhansak (Chicken)',
          description: 'Lentil-based curry with sweet & sour balance',
          price: 10.50,
          category: 'classic-curries',
          spiceLevel: 'medium' as const
        },
        {
          id: 'dhansak-lamb',
          name: 'Dhansak (Lamb)',
          description: 'Lentil-based curry with sweet & sour balance',
          price: 11.00,
          category: 'classic-curries',
          spiceLevel: 'medium' as const
        },
        {
          id: 'dhansak-prawn',
          name: 'Dhansak (Prawn)',
          description: 'Lentil-based curry with sweet & sour balance',
          price: 12.50,
          category: 'classic-curries',
          spiceLevel: 'medium' as const
        },
        {
          id: 'makhani-veg',
          name: 'Makhani (Vegetable)',
          description: 'Butter sauce curry with cream and mild spices',
          price: 8.50,
          category: 'classic-curries',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'makhani-chicken',
          name: 'Makhani (Chicken)',
          description: 'Butter sauce curry with cream and mild spices',
          price: 10.50,
          category: 'classic-curries',
          spiceLevel: 'mild' as const
        },
        {
          id: 'makhani-lamb',
          name: 'Makhani (Lamb)',
          description: 'Butter sauce curry with cream and mild spices',
          price: 11.00,
          category: 'classic-curries',
          spiceLevel: 'mild' as const
        },
        {
          id: 'makhani-prawn',
          name: 'Makhani (Prawn)',
          description: 'Butter sauce curry with cream and mild spices',
          price: 12.50,
          category: 'classic-curries',
          spiceLevel: 'mild' as const
        },
        {
          id: 'bhuna-veg',
          name: 'Bhuna (Vegetable)',
          description: 'Cooked in onion and tomato sauce with garlic, chilli, fresh herbs and spices',
          price: 8.50,
          category: 'classic-curries',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'bhuna-chicken',
          name: 'Bhuna (Chicken)',
          description: 'Cooked in onion and tomato sauce with garlic, chilli, fresh herbs and spices',
          price: 10.50,
          category: 'classic-curries',
          spiceLevel: 'medium' as const
        },
        {
          id: 'bhuna-lamb',
          name: 'Bhuna (Lamb)',
          description: 'Cooked in onion and tomato sauce with garlic, chilli, fresh herbs and spices',
          price: 11.00,
          category: 'classic-curries',
          spiceLevel: 'medium' as const
        },
        {
          id: 'bhuna-prawn',
          name: 'Bhuna (Prawn)',
          description: 'Cooked in onion and tomato sauce with garlic, chilli, fresh herbs and spices',
          price: 12.50,
          category: 'classic-curries',
          spiceLevel: 'medium' as const
        },
        {
          id: 'karahi-veg',
          name: 'Karahi (Vegetable)',
          description: 'Onion and tomato-based curry with roasted spices',
          price: 8.50,
          category: 'classic-curries',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'karahi-chicken',
          name: 'Karahi (Chicken)',
          description: 'Onion and tomato-based curry with roasted spices',
          price: 10.50,
          category: 'classic-curries',
          spiceLevel: 'medium' as const
        },
        {
          id: 'karahi-lamb',
          name: 'Karahi (Lamb)',
          description: 'Onion and tomato-based curry with roasted spices',
          price: 11.00,
          category: 'classic-curries',
          spiceLevel: 'medium' as const
        },
        {
          id: 'karahi-prawn',
          name: 'Karahi (Prawn)',
          description: 'Onion and tomato-based curry with roasted spices',
          price: 12.50,
          category: 'classic-curries',
          spiceLevel: 'medium' as const
        },
        {
          id: 'jalfrezi-veg',
          name: 'Jalfrezi (Vegetable)',
          description: 'Spicy curry with peppers and green chillies',
          price: 8.50,
          category: 'classic-curries',
          isVegetarian: true,
          spiceLevel: 'hot' as const
        },
        {
          id: 'jalfrezi-chicken',
          name: 'Jalfrezi (Chicken)',
          description: 'Spicy curry with peppers and green chillies',
          price: 10.50,
          category: 'classic-curries',
          spiceLevel: 'hot' as const
        },
        {
          id: 'jalfrezi-lamb',
          name: 'Jalfrezi (Lamb)',
          description: 'Spicy curry with peppers and green chillies',
          price: 11.00,
          category: 'classic-curries',
          spiceLevel: 'hot' as const
        },
        {
          id: 'jalfrezi-prawn',
          name: 'Jalfrezi (Prawn)',
          description: 'Spicy curry with peppers and green chillies',
          price: 12.50,
          category: 'classic-curries',
          spiceLevel: 'hot' as const
        },
        {
          id: 'madras-veg',
          name: 'Madras (Vegetable)',
          description: 'A hot, tangy curry with tomato, chilli, and spices',
          price: 8.50,
          category: 'classic-curries',
          isVegetarian: true,
          spiceLevel: 'hot' as const
        },
        {
          id: 'madras-chicken',
          name: 'Madras (Chicken)',
          description: 'A hot, tangy curry with tomato, chilli, and spices',
          price: 10.50,
          category: 'classic-curries',
          spiceLevel: 'hot' as const
        },
        {
          id: 'madras-lamb',
          name: 'Madras (Lamb)',
          description: 'A hot, tangy curry with tomato, chilli, and spices',
          price: 11.00,
          category: 'classic-curries',
          spiceLevel: 'hot' as const
        },
        {
          id: 'madras-prawn',
          name: 'Madras (Prawn)',
          description: 'A hot, tangy curry with tomato, chilli, and spices',
          price: 12.50,
          category: 'classic-curries',
          spiceLevel: 'hot' as const
        },
        {
          id: 'xacuti-veg',
          name: 'Xacuti (Vegetable)',
          description: 'Goan curry with complex roasted spices',
          price: 8.50,
          category: 'classic-curries',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'xacuti-chicken',
          name: 'Xacuti (Chicken)',
          description: 'Goan curry with complex roasted spices',
          price: 10.50,
          category: 'classic-curries',
          spiceLevel: 'medium' as const
        },
        {
          id: 'xacuti-lamb',
          name: 'Xacuti (Lamb)',
          description: 'Goan curry with complex roasted spices',
          price: 11.00,
          category: 'classic-curries',
          spiceLevel: 'medium' as const
        },
        {
          id: 'xacuti-prawn',
          name: 'Xacuti (Prawn)',
          description: 'Goan curry with complex roasted spices',
          price: 12.50,
          category: 'classic-curries',
          spiceLevel: 'medium' as const
        }
      ]
    },
    {
      id: 'biryani',
      name: 'Biryani',
      description: 'Slow cooked with aromatic rice, spices, and caramelised onions, served with raita',
      items: [
        {
          id: 'veg-biryani',
          name: 'Veg Biryani',
          description: 'Aromatic basmati rice with mixed vegetables and spices',
          price: 10.00,
          category: 'biryani',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'chicken-biryani',
          name: 'Chicken Biryani',
          description: 'Aromatic basmati rice with tender chicken and spices',
          price: 11.00,
          category: 'biryani',
          spiceLevel: 'medium' as const
        },
        {
          id: 'lamb-biryani',
          name: 'Lamb Biryani',
          description: 'Aromatic basmati rice with succulent lamb and spices',
          price: 12.00,
          category: 'biryani',
          spiceLevel: 'medium' as const
        },
        {
          id: 'prawn-biryani',
          name: 'Prawn Biryani',
          description: 'Aromatic basmati rice with fresh prawns and spices',
          price: 13.00,
          category: 'biryani',
          spiceLevel: 'medium' as const
        }
      ]
    },
    {
      id: 'vegetarian',
      name: 'Vegetarian Dishes',
      description: 'Traditional vegetarian mains and sides (most can be made vegan on request)',
      items: [
        {
          id: 'daal-makhani',
          name: 'Daal Makhani (Main)',
          description: 'Slow-cooked black lentils in creamy sauce',
          price: 8.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'daal-makhani-side',
          name: 'Daal Makhani (Side)',
          description: 'Slow-cooked black lentils in creamy sauce',
          price: 5.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'paneer-makhani',
          name: 'Paneer Makhani (Main)',
          description: 'Paneer in rich tomato-fenugreek gravy',
          price: 8.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'paneer-makhani-side',
          name: 'Paneer Makhani (Side)',
          description: 'Paneer in rich tomato-fenugreek gravy',
          price: 5.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'saag-paneer',
          name: 'Saag Paneer (Main)',
          description: 'Spinach with paneer',
          price: 8.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'saag-paneer-side',
          name: 'Saag Paneer (Side)',
          description: 'Spinach with paneer',
          price: 5.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'saag-aloo',
          name: 'Saag Aloo (Main)',
          description: 'Spinach with potatoes',
          price: 8.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'saag-aloo-side',
          name: 'Saag Aloo (Side)',
          description: 'Spinach with potatoes',
          price: 5.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'chana-masala',
          name: 'Chana Masala (Main)',
          description: 'Chickpeas in tomato-onion masala',
          price: 8.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'chana-masala-side',
          name: 'Chana Masala (Side)',
          description: 'Chickpeas in tomato-onion masala',
          price: 5.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'mushroom-masala',
          name: 'Mushroom Masala (Main)',
          description: 'Mushrooms with tomatoes, onions, and spices',
          price: 8.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'mushroom-masala-side',
          name: 'Mushroom Masala (Side)',
          description: 'Mushrooms with tomatoes, onions, and spices',
          price: 5.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'bombay-aloo',
          name: 'Bombay Aloo (Main)',
          description: 'Potatoes with herbs',
          price: 8.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'bombay-aloo-side',
          name: 'Bombay Aloo (Side)',
          description: 'Potatoes with herbs',
          price: 5.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'aloo-gobi',
          name: 'Aloo Gobi (Main)',
          description: 'Cauliflower and potatoes in spices',
          price: 8.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'aloo-gobi-side',
          name: 'Aloo Gobi (Side)',
          description: 'Cauliflower and potatoes in spices',
          price: 5.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'achari-aubergine',
          name: 'Achari Aubergine (Main)',
          description: 'Aubergine with tangy pickle spices',
          price: 8.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'achari-aubergine-side',
          name: 'Achari Aubergine (Side)',
          description: 'Aubergine with tangy pickle spices',
          price: 5.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'tadka-daal',
          name: 'Tadka Daal (Main)',
          description: 'Lentils tempered with garlic and cumin',
          price: 8.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'tadka-daal-side',
          name: 'Tadka Daal (Side)',
          description: 'Lentils tempered with garlic and cumin',
          price: 5.50,
          category: 'vegetarian',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        }
      ]
    },
    {
      id: 'rice-chowmein',
      name: 'Rice & Chowmein',
      description: 'Aromatic rice dishes and noodle specialties',
      items: [
        {
          id: 'basmati-rice',
          name: 'Basmati Rice',
          description: 'Steamed aromatic basmati rice',
          price: 2.00,
          category: 'rice-chowmein',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'pilau-rice',
          name: 'Pilau Rice',
          description: 'Fragrant basmati rice with spices',
          price: 3.00,
          category: 'rice-chowmein',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'hot-chilli-lemon-rice',
          name: 'Hot Chilli Lemon Rice',
          description: 'Spiced rice with chilli and lemon',
          price: 3.00,
          category: 'rice-chowmein',
          isVegetarian: true,
          spiceLevel: 'hot' as const
        },
        {
          id: 'mushroom-rice',
          name: 'Mushroom Rice',
          description: 'Basmati rice with mushrooms',
          price: 3.00,
          category: 'rice-chowmein',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'egg-rice',
          name: 'Egg Rice',
          description: 'Fried rice with scrambled eggs',
          price: 3.00,
          category: 'rice-chowmein',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'special-fried-rice',
          name: 'Special Fried Rice',
          description: 'Mixed fried rice with vegetables and spices',
          price: 3.00,
          category: 'rice-chowmein',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'chicken-chowmein',
          name: 'Chicken Chowmein',
          description: 'Stir-fried noodles with chicken',
          price: 7.00,
          category: 'rice-chowmein',
          spiceLevel: 'medium' as const
        },
        {
          id: 'mutton-chowmein',
          name: 'Mutton Chowmein',
          description: 'Stir-fried noodles with mutton',
          price: 7.00,
          category: 'rice-chowmein',
          spiceLevel: 'medium' as const
        },
        {
          id: 'fusion-special-chowmein',
          name: 'Fusion Special Chowmein',
          description: 'House special stir-fried noodles with mixed ingredients',
          price: 9.00,
          category: 'rice-chowmein',
          spiceLevel: 'medium' as const
        }
      ]
    },
    {
      id: 'breads',
      name: 'Breads',
      description: 'Freshly baked traditional breads',
      items: [
        {
          id: 'plain-naan',
          name: 'Plain Naan',
          description: 'Traditional leavened bread',
          price: 2.00,
          category: 'breads',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'peshawari-naan',
          name: 'Peshawari Naan',
          description: 'Sweet naan with coconut, almond & raisin',
          price: 3.00,
          category: 'breads',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'garlic-naan',
          name: 'Garlic Naan',
          description: 'Naan bread with fresh garlic',
          price: 3.00,
          category: 'breads',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'keema-naan',
          name: 'Keema Naan',
          description: 'Naan stuffed with spiced minced lamb',
          price: 3.00,
          category: 'breads',
          spiceLevel: 'medium' as const
        },
        {
          id: 'chapati',
          name: 'Chapati',
          description: 'Unleavened whole wheat bread',
          price: 2.00,
          category: 'breads',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'tandoori-roti',
          name: 'Tandoori Roti',
          description: 'Whole wheat bread cooked in tandoor',
          price: 2.00,
          category: 'breads',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'aloo-paratha',
          name: 'Aloo Paratha',
          description: 'Bread stuffed with spiced potatoes',
          price: 3.00,
          category: 'breads',
          isVegetarian: true,
          spiceLevel: 'medium' as const
        },
        {
          id: 'lachha-paratha',
          name: 'Lachha Paratha',
          description: 'Layered flaky bread',
          price: 3.00,
          category: 'breads',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        }
      ]
    },
    {
      id: 'desserts',
      name: 'Desserts',
      description: 'Sweet endings to your meal',
      items: [
        {
          id: 'kulfi-mango',
          name: 'Kulfi (Mango)',
          description: 'Traditional Indian ice cream with mango',
          price: 3.00,
          category: 'desserts',
          isVegetarian: true
        },
        {
          id: 'kulfi-pistachio',
          name: 'Kulfi (Pistachio)',
          description: 'Traditional Indian ice cream with pistachio',
          price: 3.00,
          category: 'desserts',
          isVegetarian: true
        },
        {
          id: 'ice-cream-vanilla',
          name: 'Ice Cream (Vanilla)',
          description: 'Classic vanilla ice cream',
          price: 3.00,
          category: 'desserts',
          isVegetarian: true
        },
        {
          id: 'ice-cream-chocolate',
          name: 'Ice Cream (Chocolate)',
          description: 'Rich chocolate ice cream',
          price: 3.00,
          category: 'desserts',
          isVegetarian: true
        },
        {
          id: 'gulab-jamun',
          name: 'Gulab Jamun',
          description: 'Sweet milk dumplings in rose syrup',
          price: 3.00,
          category: 'desserts',
          isVegetarian: true
        }
      ]
    },
    {
      id: 'accompaniments',
      name: 'Accompaniments',
      description: 'Perfect sides to complement your meal',
      items: [
        {
          id: 'kachumber-salad',
          name: 'Kachumber Salad',
          description: 'Fresh cucumber, tomato, and onion salad',
          price: 3.00,
          category: 'accompaniments',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'mix-green-salad',
          name: 'Mix Green Salad',
          description: 'Fresh mixed green salad',
          price: 3.00,
          category: 'accompaniments',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        },
        {
          id: 'raita',
          name: 'Raita',
          description: 'Cooling yogurt with cucumber and spices',
          price: 3.00,
          category: 'accompaniments',
          isVegetarian: true,
          spiceLevel: 'mild' as const
        }
      ]
    }
  ]
};

export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'Reservations', href: '/reservations' },
  { name: 'Order Online', href: '/order' },
  { name: 'Contact', href: '/contact' }
];