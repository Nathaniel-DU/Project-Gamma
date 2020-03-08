import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import "./style.css"
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

const FormPage = () => {
return (
<MDBContainer>
  <MDBRow>
    <MDBCol md="6">
      <form>
        <p className="h4 text-center mb-4">Sign Up!</p>
        <label htmlFor="defaultFormContactNameEx" className="grey-text">
          First Name
        </label>
        <input type="text" id="defaultFormContactNameEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormContactEmailEx" className="grey-text">
          Last Name
        </label>
        <input type="email" id="defaultFormContactEmailEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormContactSubjectEx" className="grey-text">
          Email
        </label>
        <input type="text" id="defaultFormContactSubjectEx" className="form-control" />
        <br />
        
        <label htmlFor="defaultFormContactNameEx" className="grey-text">
          Phone Number
        </label>
        <input type="text" id="defaultFormContactNameEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormContactNameEx" className="grey-text">
          Address (line one)
        </label>
        <input type="text" id="defaultFormContactNameEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormContactNameEx" className="grey-text">
          Address(line two)
        </label>
        <input type="text" id="defaultFormContactNameEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormContactNameEx" className="grey-text">
          Zip Code
        </label>
        <input type="text" id="defaultFormContactNameEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormContactNameEx" className="grey-text">
          Country
        </label>
        <input type="text" id="defaultFormContactNameEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormContactNameEx" className="grey-text">
          City
        </label>
        <input type="text" id="defaultFormContactNameEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormContactNameEx" className="grey-text">
          State
        </label>
        <input type="text" id="defaultFormContactNameEx" className="form-control" />
        <br />
        <div className="text-center mt-4">
          
          
                  <MDBBtn className="signUpbttn"outline type="submit">
                    SignUp
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      );
    };

    export default FormPage;