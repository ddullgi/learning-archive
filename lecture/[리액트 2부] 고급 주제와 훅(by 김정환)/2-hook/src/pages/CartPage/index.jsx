import { useEffect, useState } from "react";
import ProductApi from "shared/api/ProductApi";
import OrderApi from "shared/api/OrderApi";

import Page from "../../components/Page";
import Title from "../../components/Title";
import ProductItem from "../../components/ProductItem";
import OrderForm from "./OrderForm";
import PaymentButton from "./PaymentButton";
import * as MyRouter from "../../lib/MyRouter";

const CartPage = () => {
  const [product, setProduct] = useState();
  const { productId } = MyRouter.useParams();

  const fetch = async (productId) => {
    try {
      const product = await ProductApi.fetchProduct(productId);
      setProduct(product);
    } catch (e) {
      // openDialog(<ErrorDialog />);
      return;
    }
  };

  const handleSubmit = async (values) => {
    try {
      await OrderApi.createOrder(values);
    } catch (e) {
      // openDialog(<ErrorDialog />);
      return;
    }
  };

  useEffect(() => {
    if (productId) fetch(productId);
    console.log(MyRouter.useParams());
  }, [productId]);

  return (
    <div className="CartPage">
      <Page
        header={<Title backUrl="/">장바구니</Title>}
        footer={<PaymentButton />}
      >
        {product && <ProductItem product={product} />}
        <OrderForm onSubmit={handleSubmit} />
      </Page>
    </div>
  );
};

export default CartPage;
