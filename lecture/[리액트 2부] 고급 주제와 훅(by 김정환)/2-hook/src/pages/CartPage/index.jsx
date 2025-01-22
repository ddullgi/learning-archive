import Page from "../../components/Page";
import ProductItem from "../../components/ProductItem";
import Title from "../../components/Title";
import PaymentButton from "./PaymentButton";

const CartPage = () => {
  return (
    <div className="CartPage">
      <Page
        header={<Title backUrl="/">장바구니</Title>}
        footer={<PaymentButton />}
      >
        {product && <ProductItem product={product} />}
        <OrderForm onSubmit={this.handleSubmit} />
      </Page>
    </div>
  );
};

export default CartPage;
