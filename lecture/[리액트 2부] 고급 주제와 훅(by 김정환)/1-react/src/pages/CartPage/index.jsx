import React from "react";
import ProductApi from "shared/api/ProductApi";
import OrderApi from "shared/api/OrderApi";
import * as MyRouter from "../../lib/MyRouter";
import * as MyLayout from "../../lib/MyLayout";
import Page from "../../components/Page";
import ProductItem from "../../components/ProductItem";
import Title from "../../components/Title";
import OrderForm from "./OrderFrom";
import PaymentButton from "./PaymentButton";
import ErrorDialog from "../../components/ErrorDialog";
import PaymentSuccessDialog from "../../components/PaymentSuccessDialog";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.fetch();
  }

  async fetch() {
    const { params, startLoading, finishLoading, openDialog } = this.props;
    const { productId } = params();
    if (!productId) return;

    startLoading("장바구니에 담는 중...");
    try {
      const product = await ProductApi.fetchProduct(productId);
      this.setState({ product });
    } catch (e) {
      openDialog(<ErrorDialog />);
      return;
    }
    finishLoading();
  }

  async handleSubmit(values) {
    console.log(values);
    const { startLoading, finishLoading, openDialog } = this.props;
    startLoading("결제 중...");
    try {
      await OrderApi.createOrder(values);
    } catch (e) {
      openDialog(<ErrorDialog />);
      return;
    }
    finishLoading();
    openDialog(<PaymentSuccessDialog />);

    // this.props.navigate("/");
  }

  render() {
    const { product } = this.state;
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
  }
}

export default MyLayout.withLayout(MyRouter.withRouter(CartPage));
