import React from "react";
import Header from "../header";

function WebsiteWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default WebsiteWrapper;
