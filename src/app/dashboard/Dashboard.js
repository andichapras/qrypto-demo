"use client";

import { useEffect, useState } from "react";
import DataTable from "../../components/dashboard/DataTable";

export default function Dashboard() {
  const [aggregate, setAggregate] = useState(null);

  const [history, setHistory] = useState([]);

  const [health, setHealth] = useState({});

  const [tableData, setTableData] = useState([]);

  const loadData = async () => {
    const [aggregateRes, historyRes, healthRes] = await Promise.all([
      fetch("/api/aggregate?symbol=BTC"),
      fetch("/api/history?symbol=BTC"),
      fetch("/api/health"),
    ]);

    const aggregateJson = await aggregateRes.json();

    const historyJson = await historyRes.json();

    const healthJson = await healthRes.json();

    setAggregate(aggregateJson.data);

    setHistory(historyJson.data || []);

    setHealth(healthJson.data || {});

    setTableData(historyJson.data || []);
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8">
      <DataTable data={tableData} />
    </div>
    // <main className="p-8">
    //   <h1 className="text-3xl font-bold mb-6">Qrypto Dashboard</h1>

    //   <SummaryCards aggregate={aggregate} />

    //   <div className="mt-8">
    //     <PriceChart history={history} />
    //   </div>

    //   <div className="mt-8">
    //     <HealthTable health={health} />
    //   </div>
    // </main>
  );
}
