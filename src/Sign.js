import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {CREATE} from './Urls';
import {RE} from './Urls';

function Sign() {

  const [employee, setEmployee] = useState({});
  const [error, setError] = useState(null);
  const [justifyActive, setJustifyActive] = useState('tab1');

  const navigate = useNavigate();

    const handleChange = field => {
      let email = '';
      if (field.target.name === 'email' && RE.test(field.target.value)) {
        email = field.target.value;
        axios.get('http://localhost:8080/api/v1/employee/checkEmail?email=' + email)
        .then(res => {
          if(res.data){
            setError('That email is taken')
          }else{
            setEmployee({...employee,[field.target.name]: field.target.value , "roles": []});
          }
        });
        setError(null);
      } else if (field.target.name !== 'email'){
        setEmployee({...employee,[field.target.name]: field.target.value , "roles": []});
      }
      else {
        setError('Email is invalid')
      }
      console.log(employee);
      
    };

  const handleSubmit = (f) => {
  f.preventDefault();
     axios.post(CREATE, employee);
     navigate('/');
  }

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      
      return;
    }

    setJustifyActive(value);
  };



  return <>
    <form onSubmit={handleSubmit} class="mx-1 mx-md-4" method='post'>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50" style={{backgroundColor: '#ccffcc'}}>

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>

          <div className="text-center mb-3">
            <p>Sign in</p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email address' id="Email address" name="email" onChange={handleChange} type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password' id="Password" name="password" minLength={8} onChange={handleChange} type='password'/>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name="flexCheck" value='remember' id='flexCheckDefault' label='Remember me' />
            <a href="/resetPassword">Forgot password?</a>
          </div>
          <div class="d-grid gap-2">
          <button type='submit' className="btn btn-primary">Sign in</button>
          </div>

        </MDBTabsPane>
        
        <MDBTabsPane show={justifyActive === 'tab2'}>

          <div className="text-center mb-3">
            <p>Sign up</p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Firstname' onChange={handleChange} name="firstname" id="Firstname" type='text' />
          <MDBInput wrapperClass='mb-4' label='Lastname' onChange={handleChange} id="Lastname" name="lastname" type='text' />
          {error && <h2 style={{color: 'red' , fontSize: '20px'}}>{error}</h2>}
          <MDBInput wrapperClass='mb-4' label='Email' onChange={handleChange} id="Email" name="email" type='email' />
          <MDBInput wrapperClass='mb-4' label='Password' onChange={handleChange} id="Password" minLength={8} name="password" type='password' />
          <div className="d-flex justify-content-between mx-4 mb-4">
          <div class="form-check form-check-inline">
           <input class="form-check-input" type="radio" onChange={handleChange} name="gender" id="inlineRadio1" value="MALE"/>
            <label class="form-check-label" for="inlineRadio1">Male</label>
             </div>
          </div>
          <div className="d-flex justify-content-between mx-4 mb-4">
          <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" onChange={handleChange} name="gender" id="inlineRadio12" value="FEMALE"/>
            <label class="form-check-label" for="inlineRadio12">Female</label>
          </div>
          </div>
          <div class="d-grid gap-2">
          <button type="submit" className="btn btn-primary">Sign up</button>
          </div>

        </MDBTabsPane>
        
      </MDBTabsContent>
      
    </MDBContainer>
    </form>
  </>
}

export default Sign;