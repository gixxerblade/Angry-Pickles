import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import styled from "styled-components";
const Contact = () => {
  return (
    <Layout>
<StyledContainerDiv>
      <StyledContactH1>Contact</StyledContactH1>
      <StyledFormContainer 
      name="contact" 
      method="post" 
      data-netlify="true" 
      data-netlify-honeypot="bot-field"
      >
          <StyledLabel>
            Your Name: <StyledFormInput 
            placeholder="John Smith" 
            type="text" 
            name="name" />
          </StyledLabel>
          <StyledLabel>
            Your Email: <StyledFormInput 
            placeholder="jsmith@somemail.com" 
            type="email" 
            name="email" />
          </StyledLabel>
          <StyledLabel>
            Message: <StyledTextArea 
            placeholder="Your message here..." 
            name="message"></StyledTextArea>
          </StyledLabel>
          <StyledFormButton 
          type="submit">Send</StyledFormButton>
      </StyledFormContainer>
      </StyledContainerDiv>
    </Layout>
  );
};
export default Contact;

const StyledContainerDiv = styled.div `
display: flex;
flex-flow: column nowrap;
justify-content: center;
align-items: center;
`
const StyledFormContainer = styled.form `
width: 90%;
display: flex;
flex-flow: column nowrap;
justify-content: center;
align-items: center;
margin: 1rem;
font-family: "Poppins", sans-serif;
`
const StyledLabel = styled.label `
width: 90%;
`
const StyledFormInput = styled.input `
width: 90%;
`
const StyledTextArea = styled.textarea `
width: 90%;
`
const StyledContactH1 = styled.h1`
  margin: 1rem;
  text-align: center;
`;
const StyledFormButton = styled.button `
width: 50%;
`