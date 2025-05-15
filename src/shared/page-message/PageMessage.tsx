import { FC, ReactElement } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import Button from '../button/Button';
import { IPageMessageProps } from '../shared.interface';

const PageMessage: FC<IPageMessageProps> = ({ header, body }): ReactElement => {
  return <div>PqgeMessage</div>;
};

export default PageMessage;
