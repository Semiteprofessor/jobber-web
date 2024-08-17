import { Link, StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC, ReactElement, useContext } from 'react';
import { OrderContext } from 'src/features/order/context/OrderContext';
import { TimeAgo } from 'src/shared/utils/timeago.utils';

const CLIENT_ENDPOINT = import.meta.env.VITE_CLIENT_ENDPOINT;

const styles = StyleSheet.create({
  spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: '#3E3E3E' },
  titleContainer: { flexDirection: 'row', marginTop: 20 },
  title: { fontSize: 11, fontFamily: 'Lato Bold', fontWeight: 'bold' },
  subTitle: { fontSize: 10 },
  link: { fontSize: 10, color: '#4aa1f3' }
});

const InvoiceUserInfo: FC = (): ReactElement => {
  const { orderInvoice } = useContext(OrderContext);

  return <div>InvoiceUserInfo</div>;
};

export default InvoiceUserInfo;
