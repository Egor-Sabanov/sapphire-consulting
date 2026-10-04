export default function Loading() {
  return (
    <main className="routeLoading" aria-busy="true" aria-live="polite">
      <div className="container routeLoadingInner">
        <div className="routeLoadingEyebrow" />
        <div className="routeLoadingTitle" />
        <div className="routeLoadingLine" />
        <div className="routeLoadingCards">
          <span /><span /><span />
        </div>
      </div>
    </main>
  );
}
