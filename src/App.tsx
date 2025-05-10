import './index.css';

import { BrowserRouter } from 'react-router-dom';
import Header from './shared/header/components/Header';
import { FC, ReactElement } from 'react';
import LoginModal from './features/auth/components/Login';
import RegisterModal from './features/auth/components/Register';
import HeaderSearchInput from './shared/header/components/HeaderSearchInput';
import Home from './features/home/components/Home';

const App: FC = (): ReactElement => {
  return (
    <>
      <BrowserRouter>
        <div className="w-screen min-h-screen flex flex-col relative">
          {/* <Header navClass="hdlfsflsddls" /> */}
          <Home />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
