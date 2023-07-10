import React, { Component } from "react";
// import axios from "axios";
export const createHiddenInput = (form, name, value) => {
  const hiddenField = document.createElement("input");
  hiddenField.type = "hidden";
  hiddenField.name = name;
  hiddenField.value = value;
  form.appendChild(hiddenField);
};
const handleGetStore = () => {
  const form = document.createElement("form");
  form.setAttribute("id", "getmap");
  form.setAttribute("target", "_blank");
  form.method = "POST";
  form.action = "https://logistics-stage.ecpay.com.tw/Express/map"; // 這是測試的網址，文件上會寫正式的是哪個網址
  createHiddenInput(form, "MerchantID", "2000933");
  createHiddenInput(form, "LogisticsType", "CVS");
  createHiddenInput(form, "LogisticsSubType", "UNIMARTC2C");
  createHiddenInput(form, "IsCollection", "N");
  createHiddenInput(form, "ServerReplyURL", "http://localhost:8000/cart");
  document.body.appendChild(form);
};

class Test extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {handleGetStore()}
        <div
          className="btn btn-info ms-3 me-3 p-1 cartFontSize"
          onClick={() => {
            this.props.data.send();
          }}
        >
          取得地址
        </div>
      </React.Fragment>
    );
  }
  componentDidMount() {}
}

export default Test;
