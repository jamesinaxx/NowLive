import type { FunctionComponent } from 'react';
import { css } from '@emotion/react';
import { smolText } from '../styleMixins';

const NoAuth: FunctionComponent = () => (
  <small
    css={css`
      text-align: center;
      a {
        transition: color 100ms ease-in-out;
        color: #05d1d1;
        text-decoration: none;
        &:hover {
          color: #048585;
        }
      }
      form {
        margin-top: 15px;
        button {
          margin-top: 15px;
        }
      }
      ${smolText}
    `}
  >
    You are not logged in to Twitch! Please go to{' '}
    <a
      href="https://nowlive.jamesinaxx.me/auth/"
      target="_blank"
      rel="noreferrer"
    >
      this page
    </a>
    , log in with Twitch, and then come back here.
  </small>
);

export default NoAuth;
