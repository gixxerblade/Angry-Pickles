import React, { useState } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import styled from "styled-components";
import { navigate } from "gatsby";
import Typed from "react-typed";
import "../styles/contact.css";
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
          <StyledLabel className="name-label">
            Your Name
            <StyledFormInput
              className="name"
              tabIndex="0"
              placeholder="Johnny Pickles"
              type="text"
              name="name"
              onChange={handleChange}
              required
            />
          </StyledLabel>
          <StyledLabel className="email-label">
            Your Email
            <StyledFormInput
              className="email"
              placeholder="name@somemail.com"
              type="email"
              name="email"
              onChange={handleChange}
              required
            />
          </StyledLabel>
          <StyledLabel className="textarea-label">
            Message
            <Typed
              strings={[
                "I love your pickles!!!",
                "Do you offer wholesale?",
                "Are your pickles homemade?",
                "How long are pickles good for?",
                "Do you offer local pickup?",
                "What do your customers say about your pickles?",
                "What ingredients do you use in your pickles?",
                "I have a problem with my order.",
              ]}
              typeSpeed={30}
              attr="placeholder"
              loop
              cursorChar=""
              fadeOut={true}
            >
              <StyledTextArea
                name="message"
                onChange={handleChange}
                required
              ></StyledTextArea>
            </Typed>
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
  position: relative;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
`;
const StyledLabel = styled.label`
  position: static;
  display: flex;
  line-height: 2rem;
  flex-flow: column nowrap;
  justify-content: flex-end;
  width: 90%;
  margin-bottom: 1rem;
`;
const StyledFormInput = styled.input`
  width: 90%;
`;
const StyledTextArea = styled.textarea`
  width: 90%;
  height: 8em;
  line-height: 2.2rem;
  text-align: top;
  resize: none;
`;
const StyledContactH1 = styled.h1`
  margin: 1rem;
  text-align: center;
`;
const StyledFormButton = styled.button`
  -webkit-border-radius: 1rem;
  -moz-border-radius: 1rem;
  border-radius: 1rem;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 2rem;
  background-color: #679436;
  border: solid #ffffff 0.3rem;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #679436;
    border: solid #99c624 0.5rem;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    border-radius: 1rem;
    text-decoration: none;
  }
`;
