import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { graphql, StaticQuery } from "gatsby";
import { FaSearch } from "react-icons/fa";
import { Link } from "gatsby";
//import withLocation from "../components/withLocation";

const SearchTemplate = ({ data }) => {
  const [siteData, updateSiteData] = useState(data.allSitePage.edges);
  const [filterData, updateFilterData] = useState(siteData);
  const [searchValue, updateSearchValue] = useState("");

  useEffect(() => {
    try {
      document.getElementById("search-input2").focus();
    } catch (err) {
      console.log(err);
    }
  });

  if (!String.prototype.contains) {
    String.prototype.contains = function(s) {
      return this.indexOf(s) > -1;
    };
  }

  const handleChange = value => {
    updateSearchValue(value);
    try {
      document.getElementById("search-input").value = value;
    } catch (err) {
      console.log(err);
    }

    setTimeout(() => {
      const nd = siteData.filter(d => {
        return d.node.path.contains(value.toLowerCase());
      });
      updateFilterData(nd);
    }, 500);
  };

  return (
    <Layout>
      <section style={{ background: "#f3f3f3" }} className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h1 className="title">Search</h1>

              <div
                style={{ padding: 0, marginBottom: 30, display: 'flex' }}
                className="navbar-item"
              >
                <div className="site-search-btn-large">
                  <FaSearch size={25} />
                </div>
                <div className="site-search-box-large">
                  <input
                    placeholder="Search something..."
                    value={searchValue}
                    onChange={e => handleChange(e.target.value)}
                    id="search-input2"
                    type="text"
                  />
                </div>
              </div>
              <hr
                style={{
                  color: "#e3e3e3",
                  borderColor: "#e3e3e3",
                  background: "#e3e3e3"
                }}
              />
              <div style={{ marginBottom: 30 }} />

              {searchValue != "" && searchValue != null ? (
                filterData.length > 0 ? (
                  <div>
                    <h5 className="subtitle">{filterData.length} results found</h5>
                    {filterData.map(d => {
                      return (
                        <div className="search-card blog-post-card">
                          <div className="card-content">
                            <Link to={d.node.path}>
                              {d.node.path.replace(/\/|-/g, " ")}
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <h2 className="title">
                      Sorry, we didnt find anything for "{searchValue}"
                    </h2>
                    <button onClick={() => updateSearchValue("")} className="button is-primary">
                        Clear Search
                    </button>
                  </div>
                )
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const Search = () => (
  <StaticQuery
    query={graphql`
      query searchPages {
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
    render={(data, count) => <SearchTemplate data={data} count={count} />}
  />
);

export default Search;
