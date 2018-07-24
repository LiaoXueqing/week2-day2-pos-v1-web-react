import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      showItems:true,
      items:[
        {
          barcode: 'ITEM000001',
          name: '可口可乐',
          unit: '瓶',
          price: 3.00
        },
        {
          barcode: 'ITEM000002',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
      },
      {
          barcode: 'ITEM000003',
          name: '苹果',
          unit: '斤',
          price: 5.50
      }
      ],
      promotions:[
          {
              type: 'BUY_TWO_GET_ONE_FREE',
              barcodes: [
                  'ITEM000000',
                  'ITEM000001',
                  'ITEM000003'
              ]
          }
      ],
      myCart:[
        {
          barcode: 'ITEM000002',
          number:3
        }
      ]
    }
  }
  showPage=()=>{
    this.setState({
      showItems:!this.state.showItems
    });
    console.log("show page");
  }
  addItemToCart=(item,number)=>{
    this.state.myCart.push({barcode:item.barcode,number:number});
    console.log(this.state.myCart);

  }
  paymentForMyCart=()=>{
    let result=[];
    this.state.myCart.map(item=>{
      result.push(item.number===1?item.barcode:item.barcode+'-'+item.number);
    });
    console.log('payment for my cart',result);
  }
  render() {
    return (
      <div className="App text-center">
        <button  style={{margin: '10px auto'}} onClick={this.showPage}>{this.state.showItems?'我的购物车':'返回商品列表'}</button>
        {this.state.showItems?
        <ShowItems items={this.state.items} addItemToCart={this.addItemToCart}/>
        :
        <MyCart myCart={this.state.myCart} paymentForMyCart={this.paymentForMyCart}/>
        }
      </div>
    )
  }
}
class MyCart extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="text-center">
        <table style={{margin: '10px auto'}} border="1"><tbody>
        <tr>
          <td>barcode</td>
          <td>number</td>
        </tr>
        {
          this.props.myCart.map(item=>{
            return (
              <tr>
                <td>{item.barcode}</td>
                <td>{item.number}</td>
              </tr>
            )
          })
        }
        </tbody></table>
        <button onClick={this.props.paymentForMyCart}>确认购买</button>
      </div>
    );
  }
}
class ShowItems extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="text-center">
        <table style={{margin: '10px auto'}} border="1"><tbody>
        <tr>
          <td>barcode</td>
          <td>name</td>
          <td>unit</td>
          <td>price</td>
        </tr>
        {
          this.props.items.map(item=>{
            return (
              <tr>
                <td>{item.barcode}</td>
                <td>{item.name}</td>
                <td>{item.unit}</td>
                <td>{item.price}</td>
                <td><button onClick={()=>this.props.addItemToCart(item,1)}>+</button></td>
              </tr>
            )
          })
        }
        </tbody></table>
      </div>
    );
  }
}
export default App;
