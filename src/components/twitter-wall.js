import React from "react";

const TwitterWall = () => {
  return (
    <div style={{ height: 200, overflow: "scroll" }}>
      <a
        className="twitter-timeline"
        href="https://twitter.com/NSHEP10?ref_src=twsrc%5Etfw"
      >
        Tweets by NSHEP10
      </a>{" "}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      ></script>
    </div>
  );
};

export default TwitterWall;
