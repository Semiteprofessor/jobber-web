import { FC, ReactElement, useContext } from 'react';
import { FaPencilAlt, FaPlaceOfWorship, FaRegClock, FaRegFile } from 'react-icons/fa';
import { OrderContext } from 'src/features/order/context/OrderContext';
import { TimeAgo } from 'src/shared/utils/timeago.utils';

const OrderPlaced: FC = (): ReactElement => {
  const { order, authUser } = useContext(OrderContext);

  return (
    <div className="flex rounded-[4px] bg-white px-4 py-3">
      <div className="w-full">
        <div className="flex gap-4">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cae4fc]">
              <FaRegFile size={18} color="#389af5" />
            </div>
          </div>
          <div className="w-full cursor-pointer">
            <div className="border-grey mt-2 flex items-center gap-2 border-b pb-6 text-gray-500">
              <span className="text-base font-bold">
                {order?.buyerUsername === authUser?.username ? 'You' : order?.buyerUsername} placed the order
              </span>
              <p className="text-sm font-normal italic">{TimeAgo.dayWithTime(`${order?.events.placeOrder}`)}</p>
            </div>
          </div>
        </div>
</div>
  )
}

export default OrderPlaced