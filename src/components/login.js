import React, { Component } from 'react';
import axios from 'axios';
import {notify} from 'react-notify-toast';

class Login extends Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
              this.state = {
                items:'',
                number1:'',
                number2:'',
                operation:'',
                Response:'',
                Expected:'',
                passed:''
              };
              
       }
       
 //handle submit for login with axios post
handleSubmit = (event) => {
    event.preventDefault();
    const number1 = event.target.number1.value
    const number2 = event.target.number2.value
    const random = Math.round(Math.random())
    const operation = event.target.operation.value

    var items = [...this.state.items]
    
    axios.get(`http://api.mathjs.org/v4/?expr=${number1}${operation}(${number2})`, {
        // axios.post(`http://api.mathjs.org/v4/`,{
        
        })
        .then( (response) =>{
            // result = response.data;
            if (random === 1) {
                  var x = Math.ceil(Math.random() * 4000)
            }
            else{ x = response.data}

            if(x===response.data)
                {var passed = "yes";
                //  passed = passed.fontcolor("green")
                }
                else{ passed = "no"}
            //    else{document.write(passed.fontcolor( "red" ));}
 
            this.setState({
                number1:"",
                number2:"",
                Response:x,
                Expected:response.data,
                passed:passed,
                items:items
                // items: [...this.state.items]
            })
             
            
            var Response = this.state.Response
            var Expected = this.state.Expected

            items.push({number1, number2, random, Response, Expected, passed});
            // items.push({result});
        })
        .catch(function (error) {
            if(error.response){
            //   const { data:{message} } = error.response;
              notify.show("Error reading the API", 'error', 5000)
          }
          }); 
        // items.push(result);
        
}
componentDidMount(){
    this.setState({      
        operation: this.props.operation
    })
}

handleRemoveSpecificRow (id) {
            const items = [...this.state.items]
            items.splice(id, 1)
            this.setState({ items })
          }

handleChange = (event) =>{
    const { value,name} = event.target;
    // const items = [...this.state.items];
    this.setState({
       [name]: value,
    })
}


render(){
        
return(
    <div>
    <div className="login">
        <div className="login-screen">
            <div className="app-title">
                <h1>Numbers</h1>
            </div>
            
            <div className="login-form">
                <form method="POST" id="login_form" name="login_form" className="register-form" 
                onSubmit={event => this.handleSubmit(event)}>
                <div className="control-group">
                    Enter Number One
                    <input type="text" className="login-field"  placeholder="number1" id="number1" 
                    name="number1" value={this.state.number1} onChange={this.handleChange} required/>
                    <label className="login-field-icon fui-user" htmlFor="login-name"></label>
                </div>

                <div className="control-group">
                    Enter Number Two
                    <input type="text" className="login-field"  placeholder="number2" id="number2" name="number2" 
                    value={this.state.number2} onChange={this.handleChange}required/>
                    <label className="login-field-icon fui-lock" htmlFor="login-pass"></label>
                </div>

                <div className="dropdown">
                     Chose Operation
                    <p>
                        <select id = "operation" placeholder="select option"  value={this.state.operation} 
                         onChange={this.handleChange}required>
                        <option value = "+">Add</option>
                        <option value = "-">Subtract</option>
                        <option value = "*">Multiply</option>
                        <option value = "/">Divide</option>
                        </select>
                        <label className="login-field-icon fui-lock" htmlFor="login-pass"></label></p>

                </div>
        
                    <button type='submit' className="btn btn-primary">Post</button>
                </form>
          
            </div>
                        
         </div>   
    </div>
    {/* <Table items={ this.state.items }/> */}
    <div className='container'>
        
        <h2>Results</h2>
        <table className="table table-hover table-striped">
        
        <thead>
        <tr>
            <th colSpan="2">Number 1</th>
            <th colSpan="2">Number 2</th>
            <th colSpan="2">Response</th>
            <th colSpan="2">Expected</th>
            <th colSpan="2">Passed</th>
            <th colSpan="2">Remove</th>
        </tr>
        </thead> 
        {/* to be added here */}
         
        <tbody>
            
           {  
            this.state.items?
            (this.state.items.map((item, id) => {
        return(
            
        <tr key={id}> 
               <td colSpan="2">{item.number1}</td>
               <td colSpan="2">{item.number2}</td>
               <td colSpan="2">{item.Response}</td>
               <td colSpan="2">{item.Expected}</td>
               <td colSpan="2">{item.passed}</td>
               <td colSpan="2"><i className="fa fa-trash" onClick={id => this.handleRemoveSpecificRow(id)}></i></td>
        </tr>
        );
        }))
        : null
        }
        
        </tbody> 
        </table>
        </div>
    </div>
    );
    }
}

export default Login;