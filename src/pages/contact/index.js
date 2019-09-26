import React from "react";
import { navigate } from "gatsby-link";
import Layout from "../../components/Layout";
import theme from "../../templates/theme";
import { TwitterTimelineEmbed, TwitterFollowButton } from "react-twitter-embed";
import logo from '../../img/nshep-logo-icon.png';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              
              <div className="columns">
                <div className="column is-10 is-offset-1">
                  <div className="columns contact-form">
                    <div className="column">
                      <form
                        name="contact"
                        method="post"
                        action="/contact/thanks/"
                        data-netlify="true"
                        data-netlify-honeypot="bot-field"
                        onSubmit={this.handleSubmit}
                      >
                        <h2>Send us a message</h2>
                        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                        <input type="hidden" name="form-name" value="contact" />
                        <div hidden>
                          <label>
                            Don’t fill this out:{" "}
                            <input
                              name="bot-field"
                              onChange={this.handleChange}
                            />
                          </label>
                        </div>
                        <div className="field">
                          <label className="label" htmlFor={"name"}>
                            Your name
                          </label>
                          <div className="control">
                            <input
                              className="input"
                              type={"text"}
                              name={"name"}
                              onChange={this.handleChange}
                              id={"name"}
                              required={true}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label className="label" htmlFor={"email"}>
                            Email
                          </label>
                          <div className="control">
                            <input
                              className="input"
                              type={"email"}
                              name={"email"}
                              onChange={this.handleChange}
                              id={"email"}
                              required={true}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label className="label" htmlFor={"message"}>
                            Message
                          </label>
                          <div className="control">
                            <textarea
                              className="textarea"
                              name={"message"}
                              onChange={this.handleChange}
                              id={"message"}
                              required={true}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <button
                            style={{
                              background: theme.secondary,
                              colour: theme.secondaryColour
                            }}
                            className="button button-rounded is-link"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="column right-col">
                      {/* <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="NSHEP10"
                    options={{ height: 400 }}
                  /> */}
                      <img src={logo} alt="nshep" />
             

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
