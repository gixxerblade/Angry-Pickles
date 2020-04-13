import React, { useState } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import styled from "styled-components";
import { navigate } from "gatsby";
const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const Contact = () => {
  const [state, setState] = useState({});

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };
  return (
    <Layout>
      <SEO
        title="Contact"
        keywords={[
          `Angry Pickles`,
          `Pickles`,
          `gourmet pickles`,
          `handmade`,
          `spicy`,
          `dill`,
          `kosher`,
          `gluten free`,
          `comfort food`,
          `power food`,
          `homemade`,
          `artisanal`,
        ]}
      />
      <StyledContainerDiv>
        <StyledContactH1>Contact Angry Pickles</StyledContactH1>
        <StyledFormContainer
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          action="/thanks"
          onSubmit={handleSubmit}
        >
          <p style={{ display: "none" }}>
            <label>
              Don’t fill this out if you're human:{" "}
              <input type="hidden" name="bot-field" onChange={handleChange} />
            </label>
          </p>
          <input
            type="hidden"
            name="form-name"
            value="contact"
            onChange={handleChange}
          />
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
            />
          </StyledLabel>
          <StyledLabel>
            Message:
            <StyledTextArea
              placeholder="Your message here..."
              name="message"
            ></StyledTextArea>
          </StyledLabel>
          <StyledFormButton type="submit">Send</StyledFormButton>
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
