import { css } from "@linaria/core";
import { useState } from "react";

import Button from "components/Button";
import { findUser } from "util/user";

const cardCss = css`
  background-color: var(--color-card-background);
  border-radius: var(--card-radius);
  border: 1px solid var(--color-border);
  margin: 0 auto 0;
  transform: translateY(8rem);
  width: 380px;

  h1.card-title {
    font-size: var(--font-title);
    font-weight: var(--font-weight-light);
    margin: var(--spacing-m) var(--spacing-l);
  }

  .card-body {
    border-top: 1px solid var(--color-border);
    margin-bottom: var(--spacing-l);
    padding: var(--spacing-l);
    padding-bottom: 0;
  }

  .card-actions {
    margin-top: var(--spacing-l);
  }
`;

const formCss = css`
  display: flex;
  flex-direction: column;

  .form-error,
  .form-hint {
    color: var(--color-text-help);
    font-size: var(--font-small);
    margin-top: var(--spacing-s);
  }

  .form-error {
    color: var(--color-danger);
  }

  label {
    color: var(--color-input-label);
    display: inline-block;
    font-size: var(--font-small);
  }

  label:not(:first-child) {
    margin-top: var(--spacing-l);
  }

  input {
    background-color: var(--color-input-bg);
    border: 1px solid;
    border-color: var(--color-input-border);
    border-radius: var(--border-radius);
    color: var(--color-input);
    height: var(--height-input);
    outline: none;
    padding-left: var(--spacing-s);
    padding-right: var(--spacing-s);

    &.invalid {
      border-color: var(--color-notification);
    }
  }
`;

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
    (item) => !item.isValid || !item.value
  );

  const updateInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
    validateInput(event, false);
  };

  const validateInput = async (
    event: React.SyntheticEvent<HTMLInputElement>,
    fullValidation: boolean = true
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

    input.classList.value = isValid ? "" : "invalid";

    // Don't check if user exists until all other validations addressed
    if (!isValid) {
      setter({ error, isValid, value });
      return;
    }

    const key = input.type === "email" ? "email" : "name";
    const exists = await findUser({ [key]: value });

    if (!exists) {
      setter({ error: "", isValid, value });
      return;
    }

    input.classList.value = "invalid";

    error =
      input.type === "email"
        ? EMAIL_EXISTS_MSG
        : "Sorry. That name is unavailable";

    setter({ error, isValid: false, value });
  };

  const reset = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    input.classList.value = "";

    if (input.type === "email") {
      email.error && setEmail({ ...email, error: "" });
    } else {
      name.error && setName({ ...name, error: "" });
    }
  };

  return (
    <section className={cardCss}>
      <h1 className="card-title">Create an account</h1>

      <div className={"card-body " + formCss}>
        <label>Email</label>
        <input
          type="email"
          placeholder="user@email.com"
          value={email.value}
          onBlur={validateInput}
          onChange={updateInput}
          onFocus={reset}
          required
        />

        {email.error ? (
          <div className="form-error">{email.error}</div>
        ) : (
          <div className="form-hint">Your email stays private</div>
        )}

        {email.error !== EMAIL_EXISTS_MSG && (
          <>
            <label>Username</label>
            <input
              type="text"
              value={name.value}
              minLength={3}
              onBlur={validateInput}
              onChange={updateInput}
              onFocus={reset}
              required
            />

            {name.error ? (
              <div className="form-error">{name.error}</div>
            ) : (
              <div className="form-hint">Your public marketplace name</div>
            )}
          </>
        )}

        <div className="card-actions">
          {email.error === EMAIL_EXISTS_MSG ? (
            <Button primary onClick={() => console.log("clicked Retrieve")}>
              Retrieve Token
            </Button>
          ) : (
            <Button
              primary
              disabled={preventSubmit}
              onClick={() => console.log("clicked Sign up")}
            >
              Sign up
            </Button>
          )}
        </div>
        <div className="form-hint">
          Honor caches a token for authentication.
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps() {
  /* TODO: Get number of items listed */
  // const { client } = await connectToDatabase();
  // const isConnected = await client.isConnected();
  // const { db } = await connectToDatabase();
  // const users = await db.collection("listings").toArray();
  return {
    props: {},
  };
}
