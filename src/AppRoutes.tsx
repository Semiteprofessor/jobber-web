import { FC, ReactNode, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const Layout = ({ backgroundColor = '#fff', children }: { backgroundColor: string; children: ReactNode }): JSX.Element => (
  <div style={{ backgroundColor }} className="flex flex-grow">
    {children}
  </div>
);

const AppRouter: FC = () => {
    const routes: RouteObject[] = [
        {
            path: '/',
            element: (
                <Suspense>
                    <ResetPassword />
                </Suspense>
            )
        }
    ]
  return <div>AppRouter</div>;
};

export default AppRouter;
