import React from "react";

// TODO: CSS Lib
//    https://cdn.esm.sh/@picocss/pico@1.2.1/css/pico.classless.min.css
//    https://bulma.io/
//    https://picturepan2.github.io/spectre/index.html
//    https://milligram.io/
//    https://minicss.org/

import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";

export default function App(
  { Page, pageProps }: {
    Page: React.FunctionComponent<unknown>;
    pageProps: Record<string, unknown>;
  },
) {
  return (
    <main>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <Page {...pageProps} />
    </main>
  );
}
