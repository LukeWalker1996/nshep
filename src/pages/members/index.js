import React from "react";
import Layout from "../../components/Layout";
import theme from "../../templates/theme";
import MembersRoll from '../../components/MembersRoll';

const Members = () => {
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div className="content">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <h1 className="title">Members</h1>
                <MembersRoll />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Members;
