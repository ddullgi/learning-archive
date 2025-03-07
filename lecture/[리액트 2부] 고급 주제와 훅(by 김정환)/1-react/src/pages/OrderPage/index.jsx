import React from "react";
import OrderApi from "shared/api/OrderApi";
import * as MyLayout from "../../lib/MyLayout";

import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Title from "../../components/Title";
import OrderDeliveryCard from "./OrderDeliveryCard";
import OrderPaymentCard from "./OrderPaymentCard";
import OrderStatusCard from "./OrderStatusCard ";
import ErrorDialog from "../../components/ErrorDialog";

class OrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
    };
  }

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    const { startLoading, finishLoading, openDialog } = this.props;
    startLoading("주문 내역 로딩중...");
    try {
      const order = await OrderApi.fetchMyOrder();
      this.setState({ order });
    } catch (e) {
      openDialog(<ErrorDialog />);
      return;
    }
    finishLoading();
  }

  render() {
    const { order } = this.state;
    return (
      <div className="OrderPage">
        <Page header={<Title>주문내역</Title>} footer={<Navbar />}>
          {order && (
            <>
              <OrderStatusCard order={order} />
              <OrderPaymentCard order={order} />
              <OrderDeliveryCard order={order} />
            </>
          )}
        </Page>
      </div>
    );
  }
}

export default MyLayout.withLayout(OrderPage);
