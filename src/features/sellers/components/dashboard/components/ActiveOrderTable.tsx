import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { IActiveOrderProps, IOrderDocument } from 'src/features/order/interfaces/order.interface';
import { updateHeader } from 'src/shared/header/reducers/header.reducer';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { useAppDispatch } from 'src/store/store';
import { v4 as uuidv4 } from 'uuid';

const ActiveOrderTable: FC<IActiveOrderProps> = ({ activeOrders }): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-center">
      <table className="border-grey flex-no-wrap flex w-full flex-row overflow-hidden border text-sm text-gray-500 sm:inline-table">
        {activeOrders.length > 0 ? (
          <>
            <thead className="border-grey border-b text-xs uppercase text-gray-700 sm:[&>*:not(:first-child)]:hidden">
              {activeOrders.map(() => (
                <tr
                  key={uuidv4()}
                  className="mb-1 flex flex-col flex-nowrap bg-sky-500 text-white sm:mb-0 sm:table-row md:table-row lg:bg-transparent lg:text-black"
                >
                  <th className="p-3 text-center">
                    <span className="block lg:hidden">Item</span>
                  </th>
                  <th className="p-3 text-center">Price</th>
                  <th className="p-3 text-center">Due In</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">
                    <span className="block lg:hidden">View</span>
                  </th>
                </tr>
              ))}
            </thead></div>
  )
}

export default ActiveOrderTable