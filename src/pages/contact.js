import React, { useState, createRef } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import styled from "styled-components";
import { navigate } from "gatsby";
import Recaptcha from "react-google-recaptcha";

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY;
/* 
if (typeof RECAPTCHA_KEY === "undefined") {
  throw new Error(`Env var APP_SITE_RECAPTCHA_KEY is undefined! 
  You probably forget to set it in your Netlify build environment variables. 
  Make sure to get a Recaptcha key at https://www.netlify.com/docs/form-handling/#custom-recaptcha-2-with-your-own-settings`);
} 
*/
const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const Contact = () => {
  const initialFormState = { name: "", email: "", message: "" };
  const [state, setState] = useState(initialFormState);
  const recaptchaRef = createRef();
  const onSubmit = async e => {
    e.preventDefault();
    const recaptchaValue = recaptchaRef.current.getValue();
    const form = e.target;
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        "g-recaptcha-response": recaptchaValue,
        ...state
      })
    })
      .then(() => console.log(state))
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  const handleChange = e => setState({ [e.target.name]: e.target.value });

  return (
    <Layout>
      <StyledContainerDiv>
        <StyledContactH1>Contact</StyledContactH1>
        <StyledFormContainer
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          data-netlify-recaptcha="true"
          action="/thanks"
          onSubmit={onSubmit}
        >
          <p style={{ display: "none" }}>
            <label>
              Don’t fill this out if you're human:{" "}
              <input type="hidden" name="bot-field" />
            </label>
          </p>
          <noscript>
            <p>
              Unfortunately, this contact form will not work with JavaScript
              disabled in your browser.
            </p>
          </noscript>
          <input type="hidden" name="form-name" value="contact" />
          <StyledLabel>
            Your Name:
            <StyledFormInput
              placeholder="John Smith"
              type="text"
              name="name"
              onChange={handleChange}
            />
          </StyledLabel>
          <StyledLabel>
            Your Email:
            <StyledFormInput
              placeholder="jsmith@somemail.com"
              type="email"
              name="email"
              onChange={handleChange}
            />
          </StyledLabel>
          <StyledLabel>
            Message:
            <StyledTextArea
              placeholder="Your message here..."
              name="message"
              onChange={handleChange}
            ></StyledTextArea>
          </StyledLabel>
          <StyledFormButton type="submit">Send</StyledFormButton>
          <Recaptcha ref={recaptchaRef} sitekey={RECAPTCHA_KEY} />
        </StyledFormContainer>
      </StyledContainerDiv>
    </Layout>
  );
};
export default Contact;

const StyledContainerDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;
const StyledFormContainer = styled.form`
  width: 90%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  font-family: "Poppins", sans-serif;
`;
const StyledLabel = styled.label`
  width: 90%;
`;
const StyledFormInput = styled.input`
  width: 90%;
`;
const StyledTextArea = styled.textarea`
  width: 90%;
`;
const StyledContactH1 = styled.h1`
  margin: 1rem;
  text-align: center;
`;
const StyledFormButton = styled.button`
  width: 50%;
`;
