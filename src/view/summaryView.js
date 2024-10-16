import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTooltip, VictoryZoomContainer } from 'victory';
import { fetchInvoices } from '../reducers/getInvoice';
import './styles/summaryView.css';

const RevenueChart = () => {
  const dispatch = useDispatch();
  const invoices = useSelector(state => state.getInvoices.invoices);
  const invoiceStatus = useSelector(state => state.getInvoices.status);
  const error = useSelector(state => state.getInvoices.error);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    if (invoiceStatus === 'idle') {
      dispatch(fetchInvoices());
    }
  }, [invoiceStatus, dispatch]);

  useEffect(() => {
    if (invoiceStatus === 'succeeded') {
      const revenueMap = invoices.reduce((acc, invoice) => {
        const date = new Date(invoice.invoice_date).toISOString().split('T')[0];
        
        //Counting Total Revenue
        const totalRevenue = invoice.products.reduce((sum, product) => sum + product.product_price, 0);
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += totalRevenue;
        return acc;
      }, {});

      const revenueArray = Object.keys(revenueMap).map(date => ({
        date: new Date(date),
        revenue: revenueMap[date],
      }));

      setRevenueData(revenueArray);
    }
  }, [invoices, invoiceStatus]);

  if (invoiceStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (invoiceStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="card-container">
      <div className="chart-card">
        <div className="title-div"><h2 className="title-h1">Revenue Summary</h2></div>

        {/* Chart */}
        <VictoryChart
          height={600}
          width={1000}
          containerComponent={<VictoryZoomContainer />}
          scale={{ x: "time" }}
          padding={{ bottom: 150, left: 150, right: 150 }}
        >
          {/* X Axis which is Date Legend */}
          <VictoryAxis tickFormat={(x) => new Date(x).toLocaleDateString()} />

          {/* Y Axis Total Revenue */}
          <VictoryAxis dependentAxis tickFormat={(y) => `Rp.${y / 1000}k`} />

          {/* Chart Data */}
          <VictoryLine
            data={revenueData}
            x="date"
            y="revenue"
            labels={({ datum }) => `Rp.${datum.revenue}`}
            labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
            style={{
                data: { stroke: "#8884d8", strokeWidth: 3 },
                labels: { fill: "#8884d8" }
            }}
            initial={{ strokeDashoffset: 0 }}
            />
        </VictoryChart>
      </div>
    </div>
  );
};

export default RevenueChart;
