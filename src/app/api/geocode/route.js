// app/api/geocode/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  console.log("Geocoding request:", { lat, lon });

  if (!lat || !lon) {
    return new Response(JSON.stringify({ error: "Missing lat or lon" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1&accept-language=ru`,
      {
        headers: {
          "User-Agent": "TransportApp/1.0 (anton@example.com)",
          "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Nominatim response:", data);

    // Формируем читаемый адрес
    let address = data.display_name;

    // Если есть детали адреса, формируем более красивый адрес
    if (data.address) {
      const addr = data.address;
      address = [
        addr.road,
        addr.house_number,
        addr.neighbourhood,
        addr.suburb,
        addr.city || addr.town || addr.village || addr.city_district,
        addr.state,
        addr.country,
      ]
        .filter(Boolean)
        .join(", ");
    }

    return new Response(
      JSON.stringify({
        success: true,
        address: address || `Координаты: ${lat}, ${lon}`,
        raw: data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Geocoding error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        coordinates: `${lat}, ${lon}`,
      }),
      {
        status: 200, // Возвращаем 200 даже при ошибке, чтобы клиент мог обработать
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
