<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Izveštaj</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
    </style>
</head>
<body>
    <h1>Izveštaj od {{ $range['from'] }} do {{ $range['to'] }}</h1>

    <h2>Po mesecima</h2>
    <table>
        <thead><tr><th>Mesec</th><th>Prihodi</th><th>Rashodi</th><th>Neto</th></tr></thead>
        <tbody>
        @foreach($by_month as $row)
            <tr>
                <td>{{ $row['month'] }}</td>
                <td>{{ $row['income'] }}</td>
                <td>{{ $row['expense'] }}</td>
                <td>{{ $row['net'] }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>

    <h2>Po kategorijama</h2>
    <table>
        <thead><tr><th>Kategorija</th><th>Iznos</th></tr></thead>
        <tbody>
        @foreach($by_category as $row)
            <tr>
                <td>{{ $row['category'] }}</td>
                <td>{{ $row['sum'] }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
</body>
</html>
