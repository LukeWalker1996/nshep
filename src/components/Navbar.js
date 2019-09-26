import React from "react";
import { Link } from "gatsby";
import github from "../img/github-icon.svg";
import logo from "../img/nshep-logo-icon.png";
import theme from "../templates/theme";
import { FaSearch } from "react-icons/fa";

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: ""
    };
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active"
            })
          : this.setState({
              navBarActiveClass: ""
            });
      }
    );
  };

  render() {
    return (
      <div>
        <section
          className="hero is-small"
          style={{
            background: theme.primary,
            color: theme.primaryColour,
            paddingTop: 6,
            paddingBottom: 6
          }}
        >
          <div className="">
            <div className="container">
              <h1 style={{ textAlign: "center" }}>
                NATIONAL STUDENT HOUSING EXCELLENCE PARTNERSHIP
              </h1>
            </div>
          </div>
        </section>
        <nav
          className="navbar is-transparent"
          role="navigation"
          aria-label="main-navigation"
        >
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item" title="Logo">
                <img src={logo} alt="Kaldi" style={{ height: "88px" }} />
              </Link>
              {/* Hamburger menu */}
              <div
                className={`navbar-burger burger ${this.state.navBarActiveClass}`}
                data-target="navMenu"
                onClick={() => this.toggleHamburger()}
              >
                <span />
                <span />
                <span />
              </div>
            </div>
            <div
              id="navMenu"
              className={`navbar-menu ${this.state.navBarActiveClass}`}
            >
              <div className="navbar-start has-text-centered">
                {/* <Link className="navbar-item" to="/about">
                  About
                </Link>
                <Link className="navbar-item" to="/products">
                  Products
                </Link>
                <Link className="navbar-item" to="/blog">
                  Blog
                </Link>
                <Link className="navbar-item" to="/contact">
                  Contact
                </Link>
                <Link className="navbar-item" to="/contact/examples">
                  Form Examples
                </Link> */}
                <Link to="search">
                  <div className="navbar-item">
                    <div className="site-search-btn">
                      <FaSearch />
                    </div>
                    <div className="site-search-box">
                      <input id="search-input" type="text" />
                    </div>
                  </div>
                </Link>
              </div>
              <div className="navbar-end has-text-centered">
                <Link className="navbar-item" to="/">
                  HOME
                </Link>
                <Link className="navbar-item" to="/about">
                  ABOUT NSHEP
                </Link>
                <Link className="navbar-item" to="/blog">
                  ARTICLES
                </Link>
                <Link className="navbar-item" to="/contact">
                  CONTACT
                </Link>
                {/* <Link className="navbar-item" to="/contact/examples">
                  Form Examples
                </Link> */}
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
};

export default Navbar;
