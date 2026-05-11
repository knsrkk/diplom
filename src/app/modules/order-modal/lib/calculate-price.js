export const calculatePrice = (hours, vehicleId, vehicles, vehicle) => {
  const selectedVehicle = vehicles.find((v) => v.id === vehicleId) || vehicle;

  if (selectedVehicle.type === "TANKER") return selectedVehicle.basePrice;

  if (hours === 1) return selectedVehicle.basePrice;
  if (hours === 2) return Math.round(selectedVehicle.basePrice * 1.8);
  if (hours === 3) return Math.round(selectedVehicle.basePrice * 2.5);

  return Math.round(
    selectedVehicle.basePrice * selectedVehicle.priceCoefficient * hours
  );
};
