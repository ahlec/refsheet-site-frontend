import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "@apollo/client/react/hoc";
//graphql.macro
import Error from "../../Shared/Error";
import View from "./View";
import compose from "../../../utils/compose";
import { withRouter } from "utils/withRouter";

import Loading from "v1/shared/Loading";

const getDiscussion = require("./getDiscussion.graphql");

class Discussion extends Component {
  render() {
    const { data = {} } = this.props;

    console.log({ data });

    if (data.loading) {
      return <Loading />;
    } else if (data.error) {
      const message = data.error.graphQLErrors.map((e) => e.message).join(", ");
      return <Error message={message} />;
    } else {
      return (
        <View
          discussion={data.getDiscussion}
          forum={this.props.forum}
          refetch={data.refetch}
          {...this.state}
        />
      );
    }
  }
}

Discussion.propTypes = {
  forum: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  graphql(getDiscussion, {
    options: (props) => ({
      variables: props.match.params,
    }),
  }),
)(Discussion);
