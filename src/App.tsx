import './index.css';

import { BrowserRouter } from 'react-router-dom';
import Header from './shared/header/components/Header';
import { FC, ReactElement } from 'react';
import LoginModal from './features/auth/components/Login';
import RegisterModal from './features/auth/components/Register';

const App: FC = (): ReactElement => {
  return (
    <>
      <BrowserRouter>
        <div className="w-screen min-h-screen flex flex-col relative">
          <Header navClass="hdlfsflsddls" />
          {/* <RegisterModal /> */}
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
