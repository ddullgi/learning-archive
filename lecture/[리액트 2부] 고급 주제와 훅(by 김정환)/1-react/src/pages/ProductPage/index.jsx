import React from "react";
import ProductApi from "shared/api/ProductApi";
import * as MyLayout from "../../lib/MyLayout";

import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Title from "../../components/Title";
import OrderableProductItem from "./OrderableProductItem";
import Dialog from "../../components/Dialog";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
    };
  }

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    const { openDialog, closeDialog } = this.props;
    openDialog(<Dialog />);
    try {
      const productList = await ProductApi.fetchProductList();
      this.setState({ productList });
      closeDialog();
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div className="ProductPage">
        <Page header={<Title>메뉴목록</Title>} footer={<Navbar />}>
          <ul>
            {this.state.productList.map((product) => (
              <li key={product.id}>
                <OrderableProductItem product={product} />
              </li>
            ))}
          </ul>
        </Page>
      </div>
    );
  }
}

export default MyLayout.withLayout(ProductPage);
