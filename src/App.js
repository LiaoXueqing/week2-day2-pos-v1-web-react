import React, { Component } from 'react';
// import {} from 'bootstrap-react'
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
  // 从后台获取数据并重设state
  // getItems=()=>{
    // fetch
    // this.setState
  // }
  paymentForMyCart=()=>{
    let result=[];
    this.state.myCart.map(item=>{
      result.push(item.number===1?item.barcode:item.barcode+'-'+item.number);
    });
    console.log('payment for my cart',result);
    //向后台发送数据
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
  render() {
    return (
      <div className="App text-center">
        <button  className='btn btn-primary' style={{margin: '10px auto'}} onClick={this.showPage}>{this.state.showItems?'我的购物车':'返回商品列表'}</button>
        {this.state.showItems?
        <ShowItems items={this.state.items} promotions={this.state.promotions} addItemToCart={this.addItemToCart}/>
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
        <table className='table table-bordered table-striped' style={{margin: '10px auto',width:'600px'}} border="1"><tbody>
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
        <button className='btn btn-primary' onClick={this.props.paymentForMyCart}>确认购买</button>
      </div>
    );
  }
}
class ShowItems extends Component {
  constructor(props){
    super(props);
  }
  addItemToCart=(item)=>{
    let number = document.getElementById(item.barcode).value;
    document.getElementById(item.barcode).value = 0;
    this.props.addItemToCart(item,parseInt(number))
  }
  render(){
    return (
      <div className="text-center col-md">
        <table className='table table-bordered table-striped' style={{margin: '10px auto',width:'800px'}} border="1"><tbody>
        <tr>
          <td>barcode</td>
          <td>name</td>
          <td>unit</td>
          <td>price</td>
          <td>promotions</td>
          <td>action</td>
        </tr>
        {
          this.props.items.map(item=>{
            return (
              <tr>
                <td>{item.barcode}</td>
                <td>{item.name}</td>
                <td>{item.unit}</td>
                <td>{item.price}</td>
                <td>
                  {this.props.promotions[0].barcodes.indexOf(item.barcode)!==-1?this.props.promotions[0].type:'NULL'}
                </td>
                <td>
                  <input type="number" id={item.barcode} min='1' style={{width:'48px'}}/>
                  <button onClick={this.addItemToCart.bind(this,item)}>+</button>
                </td>
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
