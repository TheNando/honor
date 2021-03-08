import { css } from "@linaria/core";

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

type ButtonProps = {
  children: string;
  primary: boolean;
  disabled: boolean;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

Button.defaultProps = {
  primary: false,
  disabled: false,
  onClick: null,
};

export default function Button({
  children,
  primary,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={buttonCss + (primary ? " button-primary" : "")}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
