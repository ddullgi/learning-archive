import { useEffect, useState } from "react";
import OrderApi from "shared/api/OrderApi";
import Title from "../../components/Title";
import Page from "../../components/Page";
import Navbar from "../../components/Navbar";
import OrderStatusCard from "./OrderDeliveryCard";
import OrderPaymentCard from "./OrderPaymentCard";
import OrderDeliveryCard from "./OrderDeliveryCard";

const OrderPage = () => {
  const [order, setOrder] = useState();

  const fetch = async () => {
    try {
      const order = await OrderApi.fetchMyOrder();
      setOrder(order);
    } catch (e) {
      // openDialog(<ErrorDialog />);
      return;
    }
  };

  useEffect(() => {
    fetch();
  }, []);

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
};

export default OrderPage;
