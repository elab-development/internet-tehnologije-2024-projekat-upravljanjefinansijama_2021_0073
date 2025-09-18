<!doctype html>
<html>
<head><meta charset="utf-8"><style>
body { font-family: DejaVu Sans, sans-serif; font-size: 12px; }
h2 { margin-bottom: 0 }
small { color: #777 }
table { width:100%; border-collapse: collapse; margin-top: 12px }
th, td { border:1px solid #ddd; padding:6px; text-align:left }
</style></head>
<body>
  <h2>Mesečni izveštaj</h2>
  <small>Opseg: {{ $range['from'] }} – {{ $range['to'] }}</small>

  <h3>Sumarni pregled po mesecu</h3>
  <table>
    <thead><tr><th>Mesec</th><th>Prihod</th><th>Rashod</th><th>Neto</th></tr></thead>
    <tbody>
      @foreach($by_month as $m)
      <tr>
        <td>{{ $m['month'] }}</td>
        <td>{{ number_format($m['income'],2) }}</td>
        <td>{{ number_format($m['expense'],2) }}</td>
        <td>{{ number_format($m['net'],2) }}</td>
      </tr>
      @endforeach
    </tbody>
  </table>

  <h3>Top kategorije</h3>
  <table>
    <thead><tr><th>Kategorija</th><th>Ukupno</th></tr></thead>
    <tbody>
      @foreach($by_category as $c)
      <tr><td>{{ $c['category'] }}</td><td>{{ number_format($c['sum'],2) }}</td></tr>
      @endforeach
    </tbody>
  </table>
</body>
</html>
