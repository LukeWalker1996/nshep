import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout";
import { Link } from 'gatsby';

const SiteMapTemplate = ({ data = null, count }) => {
  
  return data != null ? (
    <Layout>
      <section style={{ background: "#f3f3f3" }} className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h1 className="title">Sitemap</h1>
              <div className="blog-card card">
                <div className="card-content">
                  {data.allSitePage.edges.map(d => {
                    return (
                      <li>
                        <Link to={d.node.path}>{d.node.path}</Link>
                      </li>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  ) : null;
};

const SiteMap = () => (
  <StaticQuery
    query={graphql`
      query searchAllPages {
        allSitePage {
          edges {
            node {
              id
              path
            }
          }
        }
      }
    `}
    render={(data, count) => <SiteMapTemplate data={data} count={count} />}
  />
);

export default SiteMap;
