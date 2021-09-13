import Head from "aleph/framework/react/components/Head.ts";
import React from "react";

// import { useDeno } from 'framework/react'
// import Logo from '~/components/logo.tsx'
// import useCounter from '~/lib/useCounter.ts'

export default function Home() {
  // const [count, isSyncing, increase, decrease] = useCounter()
  // const version = useDeno(() => Deno.version.deno)

  return (
    <section className="section">
      <Head>
        <title>Honor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Welcome to Honor!</h1>

        <h2 className="subtitle">A community marketplace</h2>

        <div className="columns">
          <div className="column">
            <article className="message is-info">
              <div className="message-header">
                <p>About</p>
              </div>
              <div className="message-body">
                <a href="/about">
                  Learn how
                </a>{" "}
                the Honor marketplace works and why
              </div>
            </article>
          </div>

          <div className="column">
            <article className="message is-link">
              <div className="message-header">
                <p>Sign In</p>
              </div>
              <div className="message-body">
                <a href="/signup">
                  Sign in
                </a>{" "}
                or create an account to start buying and selling
              </div>
            </article>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <article className="message is-primary">
              <div className="message-header">
                <p>Explore</p>
              </div>
              <div className="message-body">
                Take a{" "}
                <a href="/listings">
                  look
                </a>{" "}
                at what's currently being offered
              </div>
            </article>
          </div>

          <div className="column">
            <article className="message is-dark">
              <div className="message-header">
                <p>Source</p>
              </div>
              <div className="message-body">
                Get the{" "}
                <a href="https://github.com/TheNando/honor">
                  source code
                </a>{" "}
                and contribute to Honor!
              </div>
            </article>
          </div>
        </div>
      </main>
    </section>
  );
}
