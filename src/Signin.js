import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import './Signin.css';

import { connect } from 'react-redux';

class Signin extends React.Component{
    state = {
        email: '',
        password: '',
        isRegistering: false
    };


    apiurl = 'https://71ob5e7fj1.execute-api.us-east-1.amazonaws.com/beta'

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    
    handleCPasswordChange = (e) => {
        if (e.target.value !== this.state.password) {
            e.target.setCustomValidity("Passwords don't match");
        } else {
            this.setState({ password: e.target.value });
            e.target.setCustomValidity("");
        }
    };

  handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const { email, password } = this.state;
    try {
      await axios.post(this.apiurl + '/register', { email, password });
      console.log('User registered successfully');
      
      alert("Account created successfully! Please login to continue.");
        this.setState({ isRegistering: false });
    } catch (error) {
      console.log('Error registering user:', error);
      alert("Account creation failed");
    }
  };

  handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const { email, password } = this.state;
    if (email == 'admin@admin.com' && password == 'admin1') {
        this.props.dispatch({ type: 'ADMINLOGIN' });
        console.log('Admin login successful!');
    }else{
        try {
            await axios.post(this.apiurl + '/login', { email, password });
            console.log('Login successful');

            this.props.dispatch({ type: 'LOGIN' });
        } catch (error) {
            console.log('Error logging in:', error);
            alert("Login failed");
        }
    }
  };

  handleLogout = (e) => {
    // Add your logout logic here
    
    this.props.dispatch({ type: 'LOGOUT' });
  }
    

  handleToggleMode = () => {
    this.setState((prevState) => ({ isRegistering: !prevState.isRegistering }));
  };

  render() {
  const isLoggedIn = this.props;
    const { isRegistering } = this.state;

  return (
    <>
        <NavBar currentPage={Signin}/>
           <section className="signin-container">
                {!isLoggedIn.isLoggedIn ? (
                isRegistering ? (
                    <div>
                      <h1>Register</h1>
                      <form ref={this.form} onSubmit={this.handleRegister}>
                      <div className="row">
                            <div className="col-15">
                                <label for="email">Email</label>
                            </div>
                            <div className="col-17">
                                <input type="text" id="email" name="email" placeholder="someone@example.com" onChange={this.handleEmailChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-15">
                                <label for="password">Password</label>
                            </div>
                            <div className="col-17">
                                <input type="password" id="pwd" name="pwd" placeholder="" onChange={this.handlePasswordChange}/>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-15">
                                <label for="cpassword">Confirm Password</label>
                            </div>
                            <div className="col-17">
                                <input type="password" id="cpwd" name="cpwd" placeholder="" onChange={this.handleCPasswordChange}/>
                            </div>
                        </div>
                        <input type="submit" value="Register"/>
                      </form>
                      <p>
                        Already have an account?{' '}
                        <button type="button" onClick={this.handleToggleMode}>
                          Login
                        </button>
                      </p>
                    </div>
                  ) : (
                    <div>
                    <h1>Sign In</h1>
                    <form ref={this.form} onSubmit={this.handleLogin}>
                        <div className="row">
                            <div className="col-15">
                                <label for="email">Email</label>
                            </div>
                            <div className="col-17">
                                <input type="text" id="email" name="email" placeholder="someone@example.com" onChange={this.handleEmailChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-15">
                                <label for="password">Password</label>
                            </div>
                            <div className="col-17">
                                <input type="password" id="pwd" name="pwd" placeholder="" onChange={this.handlePasswordChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <input type="submit" value="Sign In"/>
                            <p>
                            Don't have an account?{' '}
                            <button type="button" onClick={this.handleToggleMode}>
                                Register
                            </button>
                            </p>
                        </div>
                    </form>
                    </div>
                  )

            ) : (
                <button onClick={this.handleLogout}>Logout</button>
                
            )}
        </section>
        
        </>
  );
}
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
  });
  
  export default connect(mapStateToProps)(Signin);