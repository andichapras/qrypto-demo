export default function HealthTable({ health }) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Provider</th>
          <th>Status</th>
          <th>Response Time</th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(health).map(([provider, value]) => (
          <tr key={provider}>
            <td>{provider}</td>

            <td>{value.status}</td>

            <td>{value.responseTime} ms</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
