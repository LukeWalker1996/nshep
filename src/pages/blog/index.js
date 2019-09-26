import React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import theme from "../../templates/theme";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/person-smartphone-office-table.jpeg')`
          }}
        >
          <div
            style={{
              // boxShadow: "0.5rem 0 0 #f40, -0.5rem 0 0 #f40",
              backgroundColor: theme.primary,
              color: "white",
              padding: "1rem"
            }}
          >
            <h1 className="has-text-weight-bold is-size-1">Latest Stories</h1>
          </div>
        </div>
        <section style={{background:'#f3f3f3'}} className="section">
          <div className="container">
            <div className="content">
              <BlogRoll limit={null}/>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
