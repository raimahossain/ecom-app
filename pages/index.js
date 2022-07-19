import React from "react";

import { client } from "../lib/client";
import { Product, Footer, FooterBanner, HeroBanner } from "../components";

const HomePage = ({ products, bannerData }) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[1]} />
      <div className="products-heading">
        <h2>Best Selling Watches</h2>
        <p>Different styles of Watches</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'; //fetch pull - grab all the product from sanity dashboard
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};
export default HomePage;
