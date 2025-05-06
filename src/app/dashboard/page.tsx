import WebsiteWrapper from "@/components/layouts/website-wrapper";
import React from "react";

function DashboardPage() {
  return (
    <WebsiteWrapper>
      <section className={"container"}>
        <div className="flex items-center justify-center gap-4 min-h-screen-header">
          <h1>Welcome to dashboard</h1>
        </div>
      </section>
    </WebsiteWrapper>
  );
}

export default DashboardPage;
