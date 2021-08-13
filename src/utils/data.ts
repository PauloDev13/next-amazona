export interface Product {
  name: string;
  slug: string;
  category: string;
  image: string;
  // isFeatured: boolean;
  // featuredImage: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
}

interface IData {
  products: Product[];
}

const data: IData = {
  products: [
    {
      name: 'Free Shirt',
      slug: 'free-shirt',
      category: 'Shirts',
      //image: '/images/img_01.jpg',
      image: '/images/shirt1.jpg',
      // isFeatured: true,
      // featuredImage: '/images/banner1.jpg',
      price: 70,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Fit Shirt',
      slug: 'fit-shirt',
      category: 'Shirts',
      //image: '/images/img_02.jpg',
      image: '/images/shirt2.jpg',
      // isFeatured: true,
      // featuredImage: '/images/banner2.jpg',
      price: 80,
      brand: 'Adidas',
      rating: 4.2,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Slim Shirt',
      slug: 'slim-shirt',
      category: 'Shirts',
      image: '/images/shirt3.jpg',
      // image: '/images/img_03.jpg',
      price: 90,
      brand: 'Raymond',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Golf Pants',
      slug: 'golf-pants',
      category: 'Pants',
      image: '/images/pants1.jpg',
      //image: '/images/img_04.jpg',
      price: 90,
      brand: 'Oliver',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'Smart looking pants',
    },
    {
      name: 'Fit Pants',
      slug: 'fit-pants',
      category: 'Pants',
      image: '/images/pants2.jpg',
      // image: '/images/img_05.jpg',
      price: 95,
      brand: 'Zara',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular pants',
    },
    {
      name: 'Classic Pants',
      slug: 'classic-pants',
      category: 'Pants',
      image: '/images/pants3.jpg',
      // image: '/images/img_06.jpg',
      price: 75,
      brand: 'Casely',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular pants',
    },
  ],
};
export default data;