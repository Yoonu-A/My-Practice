export interface DistrictInfo {
  name: string;
  province: string;
  postalCodeExample: string;
  deliveryFee: number; // in LKR
  estimatedDelivery: string;
}

export const SRI_LANKA_PROVINCES = [
  'Western Province',
  'Central Province',
  'Southern Province',
  'North Western Province',
  'Sabaragamuwa Province',
  'Northern Province',
  'Eastern Province',
  'North Central Province',
  'Uva Province',
];

export const SRI_LANKA_DISTRICTS: DistrictInfo[] = [
  // Western
  { name: 'Colombo', province: 'Western Province', postalCodeExample: '00100', deliveryFee: 350, estimatedDelivery: '1-2 Business Days' },
  { name: 'Gampaha', province: 'Western Province', postalCodeExample: '11000', deliveryFee: 450, estimatedDelivery: '1-3 Business Days' },
  { name: 'Kalutara', province: 'Western Province', postalCodeExample: '12000', deliveryFee: 450, estimatedDelivery: '2-3 Business Days' },
  
  // Central
  { name: 'Kandy', province: 'Central Province', postalCodeExample: '20000', deliveryFee: 550, estimatedDelivery: '2-4 Business Days' },
  { name: 'Matale', province: 'Central Province', postalCodeExample: '21000', deliveryFee: 550, estimatedDelivery: '2-4 Business Days' },
  { name: 'Nuwara Eliya', province: 'Central Province', postalCodeExample: '22200', deliveryFee: 600, estimatedDelivery: '3-5 Business Days' },
  
  // Southern
  { name: 'Galle', province: 'Southern Province', postalCodeExample: '80000', deliveryFee: 500, estimatedDelivery: '2-3 Business Days' },
  { name: 'Matara', province: 'Southern Province', postalCodeExample: '81000', deliveryFee: 550, estimatedDelivery: '2-4 Business Days' },
  { name: 'Hambantota', province: 'Southern Province', postalCodeExample: '82000', deliveryFee: 600, estimatedDelivery: '3-5 Business Days' },

  // North Western
  { name: 'Kurunegala', province: 'North Western Province', postalCodeExample: '60000', deliveryFee: 550, estimatedDelivery: '2-4 Business Days' },
  { name: 'Puttalam', province: 'North Western Province', postalCodeExample: '61300', deliveryFee: 600, estimatedDelivery: '3-5 Business Days' },

  // Sabaragamuwa
  { name: 'Ratnapura', province: 'Sabaragamuwa Province', postalCodeExample: '70000', deliveryFee: 550, estimatedDelivery: '2-4 Business Days' },
  { name: 'Kegalle', province: 'Sabaragamuwa Province', postalCodeExample: '71000', deliveryFee: 550, estimatedDelivery: '2-4 Business Days' },

  // Northern
  { name: 'Jaffna', province: 'Northern Province', postalCodeExample: '40000', deliveryFee: 750, estimatedDelivery: '3-6 Business Days' },
  { name: 'Kilinochchi', province: 'Northern Province', postalCodeExample: '44000', deliveryFee: 750, estimatedDelivery: '3-6 Business Days' },
  { name: 'Mannar', province: 'Northern Province', postalCodeExample: '41000', deliveryFee: 750, estimatedDelivery: '3-6 Business Days' },
  { name: 'Vavuniya', province: 'Northern Province', postalCodeExample: '43000', deliveryFee: 700, estimatedDelivery: '3-5 Business Days' },
  { name: 'Mullaitivu', province: 'Northern Province', postalCodeExample: '42000', deliveryFee: 750, estimatedDelivery: '4-6 Business Days' },

  // Eastern
  { name: 'Batticaloa', province: 'Eastern Province', postalCodeExample: '30000', deliveryFee: 700, estimatedDelivery: '3-5 Business Days' },
  { name: 'Ampara', province: 'Eastern Province', postalCodeExample: '32000', deliveryFee: 700, estimatedDelivery: '3-5 Business Days' },
  { name: 'Trincomalee', province: 'Eastern Province', postalCodeExample: '31000', deliveryFee: 700, estimatedDelivery: '3-5 Business Days' },

  // North Central
  { name: 'Anuradhapura', province: 'North Central Province', postalCodeExample: '50000', deliveryFee: 650, estimatedDelivery: '3-5 Business Days' },
  { name: 'Polonnaruwa', province: 'North Central Province', postalCodeExample: '51000', deliveryFee: 650, estimatedDelivery: '3-5 Business Days' },

  // Uva
  { name: 'Badulla', province: 'Uva Province', postalCodeExample: '90000', deliveryFee: 650, estimatedDelivery: '3-5 Business Days' },
  { name: 'Monaragala', province: 'Uva Province', postalCodeExample: '91200', deliveryFee: 700, estimatedDelivery: '3-5 Business Days' },
];

export const FREE_DELIVERY_THRESHOLD = 25000; // Free island-wide delivery over LKR 25,000

export function getDeliveryFeeForDistrict(districtName: string, subtotal: number): number {
  if (subtotal >= FREE_DELIVERY_THRESHOLD) {
    return 0; // Free delivery
  }
  const district = SRI_LANKA_DISTRICTS.find(
    (d) => d.name.toLowerCase() === districtName.toLowerCase()
  );
  return district ? district.deliveryFee : 550; // default fee
}
