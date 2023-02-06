import React from "react";

const Main = (props) => {
  return (
    <main className="md:ml-56 bg-white">
      <div className="px-4 mx-auto w-full">{props.children}</div>
    </main>
  );
};

export default Main;
