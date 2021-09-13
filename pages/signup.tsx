import Head from "aleph/framework/react/components/Head.ts";
import React, { useState } from "react";

import { userExists } from "~/lib/users.ts";

const defaultInput = { error: "", isValid: false, value: "" };

const EMAIL_EXISTS_MSG =
  "This email is already in use. Would you like to retrieve your token?";

interface InputState {
  error: string;
  isValid: boolean;
  value: string;
}

export default function SignUp() {
  const [email, setEmail] = useState<InputState>(defaultInput);
  const [name, setName] = useState<InputState>(defaultInput);
  const preventSubmit = [email, name].some(
    (item) => !item.isValid || !item.value,
  );

  const updateInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
    validateInput(event, false);
  };

  const validateInput = async (
    event: React.SyntheticEvent<HTMLInputElement>,
    fullValidation = true,
  ) => {
    const input = event.currentTarget;
    const value = input.value;
    const isValid = input.checkValidity();
    const setter = input.type === "email" ? setEmail : setName;

    let error = input.validationMessage;

    if (!fullValidation) {
      setter({ error: "", isValid, value });
      return;
    }

    // Don't check if user exists until all other validations addressed
    if (!isValid) {
      setter({ error, isValid, value });
      return;
    }

    const key = input.type === "email" ? "email" : "name";
    const exists = await userExists({ [key]: value });

    if (!exists) {
      setter({ error: "", isValid, value });
      return;
    }

    error = input.type === "email"
      ? EMAIL_EXISTS_MSG
      : "Sorry. That name is unavailable";

    setter({ error, isValid: false, value });
  };

  const reset = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const input = event.currentTarget;

    if (input.type === "email") {
      email.error && setEmail({ ...email, error: "" });
    } else {
      name.error && setName({ ...name, error: "" });
    }
  };

  const emailDanger = email.error ? " is-danger" : "";
  const nameDanger = name.error ? " is-danger" : "";

  return (
    <section
      className="section hero is-primary is-fullheight"
    >
      <Head>
        <title>Honor - Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="hero-body container columns is-centered">
        <div className="column is-5">
          <h1 className="title">Create an account</h1>

          <form action="" className="box">
            <div className="field">
              <label className="label">Email</label>

              <div className="control">
                <input
                  type="email"
                  className={"input" + emailDanger}
                  placeholder="user@email.com"
                  value={email.value}
                  onBlur={validateInput}
                  onChange={updateInput}
                  onFocus={reset}
                  required
                />
              </div>

              <p className={"help" + emailDanger}>
                {email.error || "Your email stays private"}
              </p>
            </div>

            {email.error !== EMAIL_EXISTS_MSG && (
              <div className="field">
                <label className="label">Username</label>

                <div className="control">
                  <input
                    type="text"
                    className={"input" + nameDanger}
                    value={name.value}
                    minLength={3}
                    onBlur={validateInput}
                    onChange={updateInput}
                    onFocus={reset}
                    required
                  />
                </div>

                <p className={"help" + nameDanger}>
                  {name.error || "Your public marketplace name"}
                </p>
              </div>
            )}

            <div className="field is-expanded">
              {email.error === EMAIL_EXISTS_MSG
                ? (
                  <button
                    className="button is-success is-fullwidth"
                    onClick={() => console.log("clicked Retrieve")}
                  >
                    Retrieve Token
                  </button>
                )
                : (
                  <button
                    className="button is-success is-fullwidth"
                    disabled={preventSubmit}
                    onClick={() => console.log("clicked Sign up")}
                  >
                    Sign up
                  </button>
                )}
            </div>
            <div className="form-hint">
              Honor caches a token for authentication.
            </div>
          </form>
        </div>
      </main>
    </section>
  );
}
