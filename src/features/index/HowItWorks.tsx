import { FC, ReactElement } from 'react';
import browseImage from 'src/assets/browse.png';
import collaborate from 'src/assets/collaborate.png';
import contact from 'src/assets/contact.png';
import create from 'src/assets/create.png';

const HowItWorks: FC = (): ReactElement => {
  return (
    <section className="container mx-auto items-center bg-white">
      <div className="px-4 py-8 sm:py-16 lg:px-6">
        <div className="mb-8 lg:mb-16">
          <h2 className="mb-4 text-xl lg:text-2xl font-normal text-center tracking-tight text-sky-400">
            How <strong className="font-extrabold">Jobber</strong> works?
          </h2>
          <p className="text-gray-500 text-center sm:text-xl dark:text-gray-400">
            Find quality scholars, experts and freelancers for your next academic or business project.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
