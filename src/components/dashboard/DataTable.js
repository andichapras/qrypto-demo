"use client";

import { useMemo, useState } from "react";
import Papa from "papaparse";

export default function DataTable({ data = [] }) {
  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState("fetched_at");

  const [sortOrder, setSortOrder] = useState("desc");

  const [pageSize, setPageSize] = useState(20);

  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.source.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (sortOrder === "asc") {
        return valA > valB ? 1 : -1;
      }

      return valA < valB ? 1 : -1;
    });
  }, [filteredData, sortField, sortOrder]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const paginatedData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const exportCsv = () => {
    const csv = Papa.unparse(sortedData);

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "crypto-history.csv";

    a.click();
  };

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <input
          className="border p-2"
          placeholder="Search source..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="price">Price</option>

          <option value="source">Source</option>

          <option value="fetched_at">Timestamp</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">ASC</option>

          <option value="desc">DESC</option>
        </select>

        <select
          value={pageSize}
          onChange={(e) => setPage(1, setPageSize(Number(e.target.value)))}
        >
          <option value={20}>20</option>

          <option value={50}>50</option>

          <option value={100}>100</option>

          <option value={200}>200</option>
        </select>

        <button onClick={exportCsv} className="border px-4">
          Export CSV
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Source</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Fetched At</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>

              <td>{item.source}</td>

              <td>{item.symbol}</td>

              <td>{item.price}</td>

              <td>{new Date(item.fetched_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-2 mt-4">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
