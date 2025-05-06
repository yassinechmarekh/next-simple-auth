import WebsiteWrapper from "@/components/layouts/website-wrapper";

export default function Home() {
  return (
    <WebsiteWrapper>
      <section className={"container"}>
        <div className="flex items-center justify-center gap-4 min-h-screen-header">
          <h1>Home page</h1>
        </div>
      </section>
    </WebsiteWrapper>
  );
}
