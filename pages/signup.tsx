import { css } from "@linaria/core";
import { useState } from "react";

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

  .form-hint {
    color: var(--color-text-help);
    font-size: var(--font-small);
    margin-top: var(--spacing-s);
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
    padding-left: var(--spacing-s);
    padding-right: var(--spacing-s);

    &.invalid {
      border-color: var(--color-nag);
    }
  }
`;

const buttonCss = css`
  background-color: transparent;
  border: none;
  color: var(--color-link);
  cursor: pointer;
  font-weight: var(--font-weight-bold);
  line-height: 1;
  border-radius: var(--border-radius);
  height: var(--height-button);
  margin-right: var(--spacing-m);
  padding: var(--spacing-s) var(--spacing-m);

  &.button-primary {
    background-color: var(--color-button-primary-bg);
    color: var(--color-button-primary-text);
  }

  &:disabled {
    opacity: 0.3;
  }
`;

Button.defaultProps = {
  primary: false,
  disabled: false,
  onClick: null,
};

function Button({ children, primary, disabled, onClick }) {
  return (
    <button
      className={buttonCss + (primary ? " button-primary" : "")}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default function SignUp() {
  const [form, setForm] = useState({ email: "", user: "" });
  const [emailExists, setEmailExists] = useState(false);
  const [invalid, setInvalid] = useState("emailtext");

  const setEmail = (event) => {
    validate(event);
    setForm({ ...form, email: event.target.value });
  };

  const setUser = (event) => {
    validate(event);
    setForm({ ...form, user: event.target.value });
  };

  const reset = (event) => (event.currentTarget.classList = "");

  const applyValidity = (event) => {
    const input = event.currentTarget;
    input.classList = input.checkValidity() ? "" : "invalid";

    if (input.type === "email") {
      // TODO: check if email exists
      // If so, set email invalid and set emailExists
    } else {
      // TODO: check if username exists
    }
  };

  const validate = (event) => {
    const input = event.currentTarget;
    if (!input.checkValidity()) {
      setInvalid(invalid + (invalid.includes(input.type) ? "" : input.type));
    } else {
      setInvalid(invalid.replace(input.type, ""));
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
          value={form.email}
          onBlur={applyValidity}
          onChange={setEmail}
          onFocus={reset}
          required
        />
        <div className="form-hint">Your email stays private</div>

        <label>Username</label>
        <input
          type="text"
          value={form.user}
          onBlur={applyValidity}
          onChange={setUser}
          onFocus={reset}
          required
        />
        <div className="form-hint">Your public marketplace name</div>

        <div className="card-actions">
          <Button primary disabled={invalid}>
            Sign Up
          </Button>

          <Button disabled={!emailExists}>Retrieve Token</Button>
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
