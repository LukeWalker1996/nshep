import React from "react";
import Layout from "../../components/Layout";
import theme from "../../templates/theme";
import AssociateMembersRoll from '../../components/AssociateMembersRoll';

const AssociateMembers = () => {
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div className="content">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <h1 className="title">Members</h1>
                <AssociateMembersRoll type={3} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AssociateMembers;
