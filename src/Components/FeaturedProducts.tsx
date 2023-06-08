import "./Styles/FeaturedProducts.css";
import { Product } from "../Type";
import NewFeaturedCard from "./NewFeaturedCard";
import smartphone1 from "../assets/Others/smartphone-1.jpg";
import smartphone2 from "../assets/Others/smartphone-2.jpg";
import laptop1 from "../assets/Others/laptop-1.jpg";
import laptop2 from "../assets/Others/laptop-2.jpg";
import watches1 from "../assets/Others/watch-1.jpg";
import watches2 from "../assets/Others/watch-2.jpg";
import chair1 from "../assets/Others/chair-1.jpg";
import chair2 from "../assets/Others/chair-2.jpg";
import shirt1 from "../assets/Others/men-shirt-white-1.jpg";
import shirt2 from "../assets/Others/men-shirt-white-2.jpg";
import dress1 from "../assets/Others/women-dress-black-1.jpg";
import dress2 from "../assets/Others/women-dress-black-2.jpg";
import bag1 from "../assets/Others/bag-1.jpg";
import bag2 from "../assets/Others/bag-2.jpg";
import shoe1 from "../assets/Others/shoe-1.jpg";
import shoe2 from "../assets/Others/shoe-2.jpg";

type Props = {
  type: string;
};

const FeaturedProducts = ({ type }: Props) => {
  const dataFeatured: Product[] = [
    {
      id: 101,
      title: "Iphone 14 pro",
      description: "string",
      price: 1099,
      discountPercentage: 5,
      rating: 5,
      stock: 1,
      brand: "Apple",
      category: "smartphone",
      thumbnail: "string",
      images: [smartphone1, smartphone2],
    },
    {
      id: 102,
      title: "Macbook Air",
      description: "string",
      price: 899,
      discountPercentage: 5,
      rating: 1,
      stock: 1,
      brand: "string",
      category: "string",
      thumbnail: "string",
      images: [laptop1, laptop2],
    },
    {
      id: 103,
      title: "Dan Henry Men's Watch",
      description: "string",
      price: 200,
      discountPercentage: 5,
      rating: 5,
      stock: 1,
      brand: "string",
      category: "string",
      thumbnail: "string",
      images: [watches1, watches2],
    },
    {
      id: 104,
      title: "Wooden Chair",
      description: "string",
      price: 159,
      discountPercentage: 5,
      rating: 1,
      stock: 1,
      brand: "string",
      category: "string",
      thumbnail: "string",
      images: [chair1, chair2],
    },
  ];
  const dataNew: Product[] = [
    {
      id: 105,
      title: "White Shirt Men",
      description: "string",
      price: 15,
      discountPercentage: 10,
      rating: 1,
      stock: 1,
      brand: "string",
      category: "string",
      thumbnail: "string",
      images: [shirt1, shirt2],
    },
    {
      id: 106,
      title: "Black Dress",
      description: "string",
      price: 59,
      discountPercentage: 8,
      rating: 1,
      stock: 1,
      brand: "string",
      category: "string",
      thumbnail: "string",
      images: [dress1, dress2],
    },
    {
      id: 107,
      title: "Men Sneakers",
      description: "string",
      price: 119,
      discountPercentage: 11,
      rating: 1,
      stock: 1,
      brand: "string",
      category: "string",
      thumbnail: "string",
      images: [shoe1, shoe2],
    },
    {
      id: 108,
      title: "Women Bag",
      description: "string",
      price: 149,
      discountPercentage: 3,
      rating: 1,
      stock: 1,
      brand: "string",
      category: "string",
      thumbnail: "string",
      images: [bag1, bag2],
    },
  ];
  return (
    <div className="featured-products">
      <div className="top">
        <h1>{type.toLocaleUpperCase()}</h1>
        {type == "featured" ? (
          <p>
            Introducing our handpicked collection of featured products,
            specially curated to elevate your online shopping experience. We
            take pride in presenting a range of innovative, high-quality items
            that cater to diverse interests and needs. Whether you're searching
            for the latest tech gadgets, fashion-forward accessories, or home
            essentials, our featured products showcase the best the market has
            to offer.
          </p>
        ) : (
          <p>
            Discover our latest arrivals, where innovation meets convenience and
            style. We're excited to present a range of new products that are
            sure to captivate your interest and enhance your everyday life. Stay
            at the forefront of trends and embrace the cutting-edge with our
            curated selection of fresh releases.
          </p>
        )}
      </div>
      <div className="bottom">
        {type == "featured"
          ? dataFeatured.map((item) => (
              <NewFeaturedCard key={item.id} item={item} isFeatured={true} />
            ))
          : dataNew.map((item) => (
              <NewFeaturedCard key={item.id} item={item} isNew={true} />
            ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
