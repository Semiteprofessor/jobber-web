import { BrowserRouter } from "react-router-dom";
import Header from "./shared/header/components/Header";
import { FC, ReactElement } from "react";

const App: FC = (): ReactElement => {
  return (
    <>
      <BrowserRouter>
        <div className="w-screen min-h-screen flex flex-col relative">
          <Header navClass="hdlfsflsddls" />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
