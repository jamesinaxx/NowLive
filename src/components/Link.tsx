import { FunctionComponent, ReactNode, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Anchor } from '../styleMixins';

interface LinkProps {
  href: string;
  children: ReactNode;
}

const Link: FunctionComponent = ({ href, children }: LinkProps) => {
  const mode = useContext(ThemeContext).type;

  return (
    <Anchor
      href={href}
      target="_blank"
      rel="noreferrer"
      color={mode === 'light' ? '#000' : '#fff'}
      hoverColor={mode === 'light' ? '#504e4e' : '#cacaca'}
    >
      {children}
    </Anchor>
  );
};

export default Link;
